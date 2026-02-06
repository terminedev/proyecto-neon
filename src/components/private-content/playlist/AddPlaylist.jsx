import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthProvider';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

import styles from 'styles/Form.module.css';

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
        <section className={styles.formWrapper}>
            <h2>Crear nueva Playlist:</h2>
            <form onSubmit={handleSubmit(handleAggregate)}>

                <div className={styles.formGroup}>
                    <label htmlFor='name'>Nombre:</label>
                    <input
                        className={styles.input}
                        type='text'
                        id="name"
                        {...register('name', { required: 'El nombre es requerido' })}
                    />
                    {errors.name && <p>*{errors.name.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='cover'>URL Portada:</label>
                    <input
                        className={styles.input}
                        type='text'
                        id='cover'
                        {...register('cover')}
                    />
                    {/* Previsualización */}
                    {watchedCover && (
                        <img src={watchedCover} alt="Thumb" />
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='color'>Color:</label>
                    <input
                        className={styles.input}
                        type='color'
                        id="color"
                        {...register('color')}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Notas Personales (Descripción):</label>
                    <textarea
                        {...register('description')}
                        rows="4"
                        placeholder="Escribe tus notas aquí..."
                    />
                </div>

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
                                className={styles.button}
                                type="button"
                                onClick={() => reset()}
                            >
                                Limpiar Datos
                            </button>

                            <button
                                className={styles.button}
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