import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthProvider';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

export default function AddPlaylist() {

    const navigate = useNavigate();
    const { addPlaylistDB } = useAuth();

    const [asynObjectAddPlaylist, setAsynObjectAddPlaylist] = useState({
        isLoading: false,
        error: null
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            cover: '',
            description: '',
            color: '#00FFFF',
            video_ids: [],
        },
    });

    const watchedCover = watch('cover');

    const handleAggregate = async (data) => {
        try {
            setAsynObjectAddPlaylist({ isLoading: true, error: null });

            const response = await addPlaylistDB({
                video_ids: [],
                ...data
            });

            if (response.success) navigate('/', { replace: true });
        } catch (error) {
            setAsynObjectAddPlaylist({
                isLoading: false,
                error: error
            });
        }
    };

    return (
        <section>
            <h2>Crear nueva Playlist:</h2>
            <form onSubmit={handleSubmit(handleAggregate)}>

                <label htmlFor='name'>Nombre:</label>
                <input
                    type='text'
                    id="name"
                    {...register('name', { required: 'El nombre es requerido' })}
                />
                {errors.name && <p>*{errors.name.message}</p>}

                <label htmlFor='cover'>URL Portada:</label>
                <input
                    type='text'
                    id='cover'
                    {...register('cover')}
                />
                {/* Previsualización */}
                {watchedCover && (
                    <img src={watchedCover} alt="Thumb" />
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

                {/* Mostrar Error de Firebase si existe */}
                {asynObjectAddPlaylist.error && (
                    <p>
                        *{getFirebaseErrorMessage(asynObjectAddPlaylist.error.code)}
                    </p>
                )}

                <div>
                    {asynObjectAddPlaylist.isLoading
                        ? <p>Guardando Playlist...</p>
                        :
                        <>
                            <button
                                type="button"
                                onClick={() => reset()}
                            >
                                Limpiar Datos
                            </button>

                            <button
                                type="submit"
                            >
                                Guardar Playlist
                            </button>
                        </>
                    }
                </div>

            </form>
        </section>
    );
};