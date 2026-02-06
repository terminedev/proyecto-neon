import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
import { useAuth } from 'contexts/AuthProvider';


export default function EditVideo() {
    const { video_id } = useParams();
    const navigate = useNavigate();

    const { getVideoDB, updateVideoDB } = useAuth();

    const [asynObjectFetch, setAsynObjectFetch] = useState({
        isLoading: true,
        error: null
    });

    const [asynObjectUpdate, setAsynObjectUpdate] = useState({
        isLoading: false,
        error: null,
        success: false
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            original_url: '',
            author_name: '',
            title: '',
            thumbnail_url: '',
            description: '',
        },
    });

    const watchedThumbnail = watch('thumbnail_url');

    useEffect(() => {
        const getVideoDatabase = async () => {

            setAsynObjectFetch({ isLoading: true, error: null });

            try {
                const data = await getVideoDB(video_id);

                if (!data) throw { code: 'not-found', message: 'No se encontró el video' };

                reset({
                    original_url: data.original_url,
                    author_name: data.author_name,
                    title: data.title,
                    thumbnail_url: data.thumbnail_url,
                    description: data.description,
                });

                setAsynObjectFetch({ isLoading: false, error: null });

            } catch (error) {
                console.error(error);
                setAsynObjectFetch({ isLoading: false, error: error });
            }
        };

        if (video_id && video_id.trim() !== '') getVideoDatabase();
    }, [video_id, reset]);


    const handleUpdate = async (newData) => {
        setAsynObjectUpdate({ isLoading: true, error: null, success: false });

        try {

            await updateVideoDB(video_id, newData);

            setAsynObjectUpdate({ isLoading: false, error: null, success: true });

            navigate(-1);

        } catch (error) {
            console.error(error);
            setAsynObjectUpdate({ isLoading: false, error: error, success: false });
        }
    };

    return (
        <section>
            <h2>Editar Información del Video:</h2>

            {asynObjectFetch.isLoading && <p>Cargando información del video...</p>}

            {asynObjectFetch.error && <p>{getFirebaseErrorMessage(asynObjectFetch.error.code)}</p>}

            {!asynObjectFetch.isLoading && !asynObjectFetch.error && (
                <>
                    {/* Campos no editables (Sólo lectura) */}
                    <dl>
                        <dt>Link:</dt>
                        <dd>{getValues('original_url')}</dd>

                        <dt>Autor:</dt>
                        <dd>{getValues('author_name')}</dd>
                    </dl>

                    {/* Formulario Principal */}
                    <form onSubmit={handleSubmit(handleUpdate)}>

                        <label htmlFor='video_title'>Título:</label>
                        <input
                            type='text'
                            id="video_title"
                            {...register('title', { required: 'El título es obligatorio' })}
                        />
                        {errors.title && <p>*{errors.title.message}</p>}

                        <label htmlFor='thumbnail_url'>URL Portada:</label>
                        <input
                            type='text'
                            id='thumbnail_url'
                            {...register('thumbnail_url')}
                        />

                        {/* Previsualización */}
                        {watchedThumbnail && (
                            <img src={watchedThumbnail} alt="Thumb" style={{ maxWidth: '200px', display: 'block', margin: '10px 0' }} />
                        )}

                        <label>Notas Personales (Descripción):</label>
                        <textarea
                            {...register('description')}
                            rows="4"
                            placeholder="Escribe tus notas aquí..."
                        />

                        {asynObjectUpdate.error && <p>*{getFirebaseErrorMessage(asynObjectUpdate.error.code)}</p>}

                        {
                            asynObjectUpdate.isLoading
                                ? <p>Guardando cambios...</p>
                                : (
                                    <>
                                        <button type="button" onClick={() => reset()} disabled={asynObjectUpdate.success}>
                                            Restaurar Datos Originales
                                        </button>
                                        &nbsp;
                                        <button type="submit">
                                            Guardar Cambios
                                        </button>
                                    </>
                                )
                        }
                    </form>
                </>
            )}
        </section>
    );
};