import { useState } from 'react';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
import { useAuth } from 'contexts/AuthProvider'

export default function DeletePlaylist({ playlist_id, onClose }) {

    const { deletePlaylistDB } = useAuth();

    const [asyncDeleteState, setAsyncDeleteState] = useState({
        isLoading: false,
        error: null
    });

    const handleDelete = async () => {
        try {
            setAsyncDeleteState({ isLoading: true, error: null });

            await deletePlaylistDB(playlist_id);

            onClose();

        } catch (error) {
            setAsyncDeleteState({
                isLoading: false,
                error: error
            });
        }
    };

    return (
        <dialog open>

            <h3>¿Estás seguro?</h3>
            <p>Esta acción no se puede deshacer.</p>

            {asyncDeleteState.error &&
                <p>
                    *{getFirebaseErrorMessage(asyncDeleteState.error.code)}
                </p>
            }

            {
                asyncDeleteState.isLoading
                    ? <p>Borrando...</p>
                    : <>
                        <button
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                        >
                            Borrar
                        </button>
                    </>
            }
        </dialog>
    );
};