import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/AuthProvider";

export default function EditSong({ songData, closeModal }) {

    const [error, setError] = useState(null);
    const { editSong } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: songData
    });

    useEffect(() => {
        if (songData) reset(songData);
    }, [songData, reset]);

    const handleUpdate = (updatedData) => {

        const finalObj = {
            ...updatedData,
            idVideo: songData.idVideo,
            author_name: songData.author_name,
            author_url: songData.author_url
        };

        try {
            setError(null);
            editSong(finalObj);
            closeModal();
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <form onSubmit={handleSubmit(handleUpdate)} noValidate>

            {/* 1. Información de solo lectura (Bloqueada) */}
            <fieldset>
                <legend>Información de Origen (No editable)</legend>

                <p><strong>ID del Vídeo:</strong> {songData?.idVideo}</p>
                <p><strong>Autor Original:</strong> {songData?.author_name}</p>
            </fieldset>

            <hr />

            {/* 2. Datos Editables */}
            <fieldset>
                <legend>Datos Modificables:</legend>

                {/* Título editable */}
                <label htmlFor='title'>Título de la canción:</label>
                <input
                    type="text"
                    id='title'
                    {...register("title", {
                        required: "El título es necesario",
                        minLength: { value: 3, message: "Título demasiado corto" }
                    })}
                />
                {/* {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>} */}

                <br />

                {/* Miniatura editable */}
                <label htmlFor='thumbnail_url'>URL de la Miniatura:</label>
                <input
                    type="text"
                    id='thumbnail_url'
                    {...register("thumbnail_url", {
                        required: "La imagen es obligatoria"
                    })}
                />
                {/* {errors.thumbnail_url && <span style={{ color: 'red' }}>{errors.thumbnail_url.message}</span>} */}
            </fieldset>

            {/* Vista previa visual */}
            <section style={{ margin: '15px 0' }}>
                <p>Vista previa actual:</p>
                <img
                    src={songData?.thumbnail_url}
                    alt="Preview"
                    style={{ width: '120px', borderRadius: '8px' }}
                />
            </section>

            <div className="actions">
                {error && <p>{error}</p>}
                <button type="button" onClick={() => reset()}>
                    Deshacer Cambios
                </button>
                <button type="submit">Actualizar Canción</button>
                <button type="button" onClick={() => closeModal()}>Cancelar pedido</button>
            </div>
        </form>
    );
};