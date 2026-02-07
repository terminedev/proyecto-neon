import { useState } from 'react';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
import { useAuth } from 'contexts/AuthProvider'
import { useNavigate, useParams } from 'react-router-dom';

export default function DeleteVideo() {

    const { video_id } = useParams();
    const { deleteVideoDB } = useAuth();
    const navigate = useNavigate();

    const [asyncDeleteState, setAsyncDeleteState] = useState({
        isLoading: false,
        error: null
    });

    const handleDelete = async () => {
        try {
            setAsyncDeleteState({ isLoading: true, error: null });

            await deleteVideoDB(video_id);

            navigate(-1, { replace: true });

        } catch (error) {
            setAsyncDeleteState({
                isLoading: false,
                error: error
            });
        }
    };

    return (
        <section>

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
                            onClick={() => navigate(-1, { replace: true })}
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
        </section>
    );
};