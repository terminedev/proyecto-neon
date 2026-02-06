import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
import { useAuth } from 'contexts/AuthProvider';

export default function EditPlaylist() {

    document.title = "Editar Playlist | Proyecto Neón | Gastøn ♱érmine";

    const { playlist_id } = useParams();
    const { getPlaylistDB, updatePlaylistDB } = useAuth();

    const [asynObjectFetchPlaylist, setAsynObjectFetchPlaylist] = useState({
        isLoading: false,
        error: null,
        data: null
    });

    const [asynObjectUpdatePlaylist, setAsynObjectUpdatePlaylist] = useState({
        isLoading: false,
        error: null
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            cover: '',
            description: '',
            color: '#00ffff',
        },
    });

    const watchedCover = watch('cover');

    useEffect(() => {
        const getPlaylistDatabase = async () => {

            setAsynObjectFetchPlaylist({ isLoading: true, error: null, data: null });

            try {
                const data = await getPlaylistDB(playlist_id);

                if (!data) throw { code: 'custom/not-found', message: 'Playlist no encontrada' };

                setAsynObjectFetchPlaylist({
                    isLoading: false,
                    error: null,
                    data: data
                });

                reset({
                    name: data.name,
                    cover: data.cover,
                    description: data.description,
                    color: data.color,
                });

            } catch (error) {
                setAsynObjectFetchPlaylist({ isLoading: false, error: error, data: null });
            }
        };

        if (playlist_id && playlist_id.trim() !== '') getPlaylistDatabase();
    }, [playlist_id, reset]);


    const handleChange = async (newData) => {
        setAsynObjectUpdatePlaylist({ isLoading: true, error: null });

        try {
            await updatePlaylistDB(playlist_id, newData);

            setAsynObjectUpdatePlaylist({ isLoading: false, error: null });

            navigate(-1, { replace: true });
        } catch (error) {
            setAsynObjectUpdatePlaylist({ isLoading: false, error: error });
        }
    };

    const handleRestore = () => {
        if (asynObjectFetchPlaylist.data) {
            reset(asynObjectFetchPlaylist.data);
        } else {
            reset();
        }
    };

    return (
        <section>
            <h2>Editar Información de la Playlist:</h2>

            {asynObjectFetchPlaylist.isLoading && <p>Cargando información de la playlist...</p>}

            {asynObjectFetchPlaylist.error &&
                <p>Error: {getFirebaseErrorMessage(asynObjectFetchPlaylist.error.code)}</p>
            }

            {!asynObjectFetchPlaylist.isLoading && !asynObjectFetchPlaylist.error && (
                <form onSubmit={handleSubmit(handleChange)}>

                    <label htmlFor='name'>Nombre:</label>
                    <input
                        type='text'
                        id="name"
                        {...register('name', { required: 'El nombre es requerido' })}
                    />
                    {errors.name && <small>*{errors.name.message}</small>}

                    <label htmlFor='cover'>URL Portada:</label>
                    <input
                        type='text'
                        id='cover'
                        {...register('cover')}
                    />

                    {watchedCover && (
                        <img
                            src={watchedCover}
                            alt="Thumb"
                        />
                    )}

                    <label htmlFor='color'>Color:</label>
                    <input
                        type='color'
                        id="color"
                        {...register('color')}
                    />

                    <label>Notas Personales (Descripción):</label>
                    <textarea
                        {...register('description')}
                        rows="4"
                        placeholder="Escribe tus notas aquí..."
                    />


                    {asynObjectUpdatePlaylist.error &&
                        <p>
                            *{getFirebaseErrorMessage(asynObjectUpdatePlaylist.error.code)}
                        </p>
                    }


                    {asynObjectUpdatePlaylist.isLoading
                        ? <button type="button" disabled>Guardando...</button>
                        :
                        <>
                            <button
                                type="button"
                                onClick={handleRestore}
                            >
                                Restaurar Datos
                            </button>
                            <button type="submit">Guardar Cambios</button>
                        </>
                    }
                </form>
            )}
        </section>
    );
}