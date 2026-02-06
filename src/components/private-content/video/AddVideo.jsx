import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getOEmbedDataYT, extractVideoID } from 'services/YTOEmbed';
import { useAuth } from 'contexts/AuthProvider';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

export default function AddVideo() {

    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const { addVideoDB } = useAuth();

    const [asynObjectFetchVideoData, setAsynObjectFetchVideoData] = useState({
        data: null,
        isLoading: false,
        error: null
    });

    const [asynObjectAddVideo, setAsynObjectAddVideo] = useState({
        data: null,
        isLoading: false,
        error: null
    });



    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            original_url: '',
            original_video_id_url: '',
            author_name: '',
            title: '',
            thumbnail_url: '',
            description: '',
        },
    });

    const watchedThumbnail = watch('thumbnail_url');

    const handleFetchVideoData = async (e) => {
        e.preventDefault();

        const url = getValues('original_url');

        if (!url) return console.warn('No hay url.');

        const videoId = extractVideoID(url);

        if (!videoId) return console.warn('URL de YouTube no válida')

        try {
            setAsynObjectFetchVideoData({ data: null, isLoading: true, error: null });

            const data = await getOEmbedDataYT(url);

            reset({
                original_url: url,
                original_video_id_url: videoId,
                author_name: data.author_name,
                title: data.title,
                thumbnail_url: data.thumbnail_url,
                description: '',
            });

            setShowForm(true);

            setAsynObjectFetchVideoData({ data: data, isLoading: false, error: null });

        } catch (error) {
            setAsynObjectFetchVideoData({ isLoading: false, error: error });
        }
    };

    const handleAggregate = async (dataToAdd) => {
        try {
            setAsynObjectAddVideo({ data: null, isLoading: true, error: null });

            const data = await addVideoDB(dataToAdd); // <-- Función Firebase
            if (data.success) navigate('/', { replace: true });

        } catch (error) {
            setAsynObjectAddVideo({
                data: null,
                isLoading: false,
                error: error
            });
        }
    };

    return (
        <section>

            {/* Sección de Búsqueda */}
            <form onSubmit={handleFetchVideoData}>
                <fieldset>
                    <legend>Sección de Búsqueda</legend>
                    <label htmlFor='original_url'>Añadir Video:</label>
                    <input
                        id='original_url'
                        type="text"
                        placeholder="Pega el link de YouTube aquí..."
                        {...register('original_url', {
                            required: 'La URL es requerida',
                        })}
                    />
                    {errors.original_url && <p>*{errors.original_url.message}</p>}
                    {
                        asynObjectFetchVideoData.isLoading ? <p>Logueándose...</p> : <button type="submit">Obtener vídeo</button>
                    }
                </fieldset>

                {asynObjectFetchVideoData.error && <p>*{getFirebaseErrorMessage(asynObjectFetchVideoData.error.code)}</p>}
            </form>

            {/* Mostrar formulario principal si hay resultado */}
            {
                showForm &&
                <>
                    <hr />
                    {/* Campos no editables (Sólo lectura) */}
                    <dl>
                        <dt>ID del Video:</dt>
                        <dd>{getValues('original_video_id_url')}</dd>

                        <dt>Autor:</dt>
                        <dd>{getValues('author_name')}</dd>
                    </dl>

                    {/* Formulario Principal */}
                    <form onSubmit={handleSubmit(handleAggregate)}>

                        <label htmlFor='title'>Título:</label>
                        <input
                            type='text'
                            id="title"
                            {...register('title', { required: true })}
                        />
                        {errors.title && <p>*{errors.title.message}</p>}

                        <label htmlFor='thumbnail_url'>URL Portada:</label>
                        <input
                            type='text'
                            id='thumbnail_url'
                            {...register('thumbnail_url')}
                        />
                        {errors.thumbnail_url && <p>*{errors.thumbnail_url.message}</p>}
                        {/* Pequeña previsualización si hay URL */}
                        {watchedThumbnail && (
                            <img src={watchedThumbnail} alt="Thumb" />
                        )}

                        <label >Notas Personales (Descripción):</label>
                        <textarea
                            {...register('description')}
                            rows="4"
                            placeholder="Escribe tus notas aquí..."
                        />

                        {asynObjectAddVideo.error && <p>*{getFirebaseErrorMessage(asynObjectAddVideo.error.code)}</p>}

                        {
                            asynObjectAddVideo.isLoading
                                ? <p>Agregando vídeo...</p>
                                :
                                <>
                                    <button type="button" onClick={() => reset({
                                        original_url: asynObjectFetchVideoData.data.url,
                                        original_video_id_url: asynObjectFetchVideoData.videoId,
                                        author_name: asynObjectFetchVideoData.data.author_name,
                                        title: asynObjectFetchVideoData.data.title,
                                        thumbnail_url: asynObjectFetchVideoData.data.thumbnail_url,
                                        description: '',
                                    })}>
                                        Restaurar Datos
                                    </button>
                                    <button type="submit">
                                        Guardar Video
                                    </button>
                                </>
                        }

                    </form>
                </>
            }
        </section >
    );
};
