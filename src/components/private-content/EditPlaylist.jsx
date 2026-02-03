import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthProvider';

export default function EditPlaylist({ playlistData, closeModal }) {
    const [error, setError] = useState(null);
    const { editPlaylist } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: playlistData
    });

    useEffect(() => {
        if (playlistData) reset(playlistData);
    }, [playlistData, reset]);

    const handleUpdate = (updatedData) => {
        try {
            setError(null);
            editPlaylist({
                ...updatedData,
                id: playlistData.id
            });
            closeModal();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <h2>Editar Playlist</h2>

            {error && <p>{error}</p>}

            <label htmlFor='recordTitlePlayList'>Nombre de la PlayList:</label>
            <input
                type="text"
                id='recordTitlePlayList'
                {...register("recordTitlePlayList", { required: "El título es obligatorio" })}
            />

            <label htmlFor='recordColorPlayList'>Color de la PlayList:</label>
            <input type="color" id='recordColorPlayList' {...register("recordColorPlayList")} />

            <label htmlFor='recordCoverPlayList'>URL de la Portada:</label>
            <input
                type="text"
                id='recordCoverPlayList'
                {...register("recordCoverPlayList", { required: "La portada es obligatoria" })}
            />

            <div>
                <button type="button" onClick={() => reset()}>
                    Restablecer
                </button>
                <button type="submit">
                    Guardar Cambios
                </button>
                <button type="button" onClick={closeModal}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}