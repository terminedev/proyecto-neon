import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getOEmbedDataYT, extractVideoID } from 'services/YTOEmbed';
import { useAuth } from 'contexts/AuthProvider';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

import styles from 'styles/Form.module.css';

export default function AddVideo() {
    document.title = "Añadir Vídeo | Proyecto Neón";

    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const { addVideoDB } = useAuth();

    const [asynObjectFetchVideoData, setAsynObjectFetchVideoData] = useState({
        data: null,
        videoId: null,
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

        if (!url) return;

        const videoId = extractVideoID(url);
        if (!videoId) return console.warn('URL no válida');

        try {
            setAsynObjectFetchVideoData({ data: null, videoId: null, isLoading: true, error: null });

            const data = await getOEmbedDataYT(url);


            reset({
                original_url: url,
                original_video_id_url: videoId,
                author_name: data.author_name || 'Anónimo',
                title: data.title || '',
                thumbnail_url: data.thumbnail_url || '',
                description: '',
            });

            setShowForm(true);
            setAsynObjectFetchVideoData({ data: data, videoId: videoId, isLoading: false, error: null });

        } catch (error) {
            setAsynObjectFetchVideoData({ isLoading: false, error: error, data: null, videoId: null });
        }
    };

    const handleAggregate = async (dataToAdd) => {
        try {
            setAsynObjectAddVideo({ data: null, isLoading: true, error: null });

            const cleanData = Object.fromEntries(
                Object.entries(dataToAdd).filter(([_, v]) => v !== undefined)
            );

            const data = await addVideoDB(cleanData);
            if (data.success) navigate('/', { replace: true });

        } catch (error) {
            setAsynObjectAddVideo({ data: null, isLoading: false, error: error });
        }
    };

    return (
        <section className={styles.formWrapper}>
            {/* Buscador */}
            <form onSubmit={handleFetchVideoData}>
                <fieldset className={styles.formGroup}>
                    <legend>Sección de Búsqueda</legend>
                    <input
                        className={styles.input}
                        {...register('original_url', { required: 'La URL es requerida' })}
                        placeholder="Pega el link de YouTube aquí..."
                    />
                    <button className={styles.button} type="submit" disabled={asynObjectFetchVideoData.isLoading}>
                        {asynObjectFetchVideoData.isLoading ? 'Cargando...' : 'Obtener vídeo'}
                    </button>
                </fieldset>
            </form>

            {showForm && (
                <>
                    <hr />
                    {/* Formulario Principal */}
                    <form onSubmit={handleSubmit(handleAggregate)}>

                        <input type="hidden" {...register('original_video_id_url')} />
                        <input type="hidden" {...register('author_name')} />
                        <input type="hidden" {...register('original_url')} />

                        <dl>
                            <dt>ID del Video:</dt>
                            <dd>{getValues('original_video_id_url')}</dd>
                            <dt>Autor:</dt>
                            <dd>{getValues('author_name')}</dd>
                        </dl>

                        <div className={styles.formGroup}>
                            <label>Título:</label>
                            <input className={styles.input} {...register('title', { required: true })} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>URL Portada:</label>
                            <input className={styles.input} {...register('thumbnail_url')} />
                            {watchedThumbnail && <img src={watchedThumbnail} alt="Preview" style={{ width: '200px' }} />}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Notas Personales:</label>
                            <textarea {...register('description')} rows="4" />
                        </div>

                        {asynObjectAddVideo.isLoading ? (
                            <p>Agregando vídeo...</p>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className={styles.button}
                                    onClick={() => reset({
                                        original_url: getValues('original_url'),
                                        original_video_id_url: asynObjectFetchVideoData.videoId, // Ahora sí tiene valor
                                        author_name: asynObjectFetchVideoData.data.author_name,
                                        title: asynObjectFetchVideoData.data.title,
                                        thumbnail_url: asynObjectFetchVideoData.data.thumbnail_url,
                                        description: '',
                                    })}
                                >
                                    Restaurar Datos
                                </button>
                                <button className={styles.button} type="submit">
                                    Guardar Video
                                </button>
                            </>
                        )}
                        {asynObjectAddVideo.error && <p className="error">*{getFirebaseErrorMessage(asynObjectAddVideo.error.code)}</p>}
                    </form>
                </>
            )}
        </section>
    );
}