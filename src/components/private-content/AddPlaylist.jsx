import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthProvider';
import { useState } from 'react';

export default function AddPlaylist({
    closeModal
}) {

    const { user, addPlaylist } = useAuth();
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm();

    const handleRecord = (playlistData) => {
        try {
            setError(null);
            addPlaylist(user.uid, playlistData);
            closeModal();
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <form onSubmit={handleSubmit(handleRecord)} noValidate>
            <p>Registro</p>
            {error && <p>{error}</p>}
            <button onClick={() => closeModal()}>Cancelar pedido</button>

            {/* Título PlayList*/}
            <label htmlFor='recordTitlePlayList'>Nombre de la PlayList:</label>
            <input
                type="text"
                placeholder="Introduce aquí nombre playlist"
                id='recordTitlePlayList'
                {...register("recordTitlePlayList", {
                    required: "El titulo es obligatorio",

                    // INTRODUCIR UNA VALIDACIÓN
                    // validate: (value) => {
                    //     const esValido = value.includes('@'); // Tu lógica aquí
                    //     return esValido || "Formato de correo no válido";
                    // }

                })}
            />
            {/* {errors.emailLogin && <span>{errors.emailLogin.message}</span>} */}

            {/* Color PlayList*/}
            <label htmlFor='recordColorPlayList'>Color de la PlayList:</label>
            <input
                type="color"
                placeholder="Introduce aquí color playlist"
                id='recordColorPlayList'
                {...register("recordColorPlayList", {
                    // INTRODUCIR UNA VALIDACIÓN
                    // validate: (value) => {
                    //     const esValido = value.includes('@'); // Tu lógica aquí
                    //     return esValido || "Formato de correo no válido";
                    // }

                })}
            />
            {/* {errors.emailLogin && <span>{errors.emailLogin.message}</span>} */}


            {/* Portada PlayList*/}
            <label htmlFor='recordCoverPlayList'>Portada de la PlayList:</label>
            <input
                type="text"
                placeholder="Introduce aquí portada playlist"
                id='recordCoverPlayList'
                {...register("recordCoverPlayList", {
                    // INTRODUCIR UNA VALIDACIÓN
                    // validate: (value) => {
                    //     const esValido = value.includes('@'); // Tu lógica aquí
                    //     return esValido || "Formato de correo no válido";
                    // }

                })}
            />
            {/* {errors.emailLogin && <span>{errors.emailLogin.message}</span>} */}

            <button type="button" onClick={() => reset()}>Limpiar Campos</button>
            <button type="submit">Registrarse</button>
        </form>
    );
};

