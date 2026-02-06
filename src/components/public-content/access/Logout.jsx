import { useState } from 'react';
import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

export default function Logout() {

    const [showMenu, setShowMenu] = useState(false);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const [asynObject, setAsynObject] = useState({
        isLoading: false,
        error: null
    });

    const handleLogout = async () => {

        try {
            setAsynObject({ isLoading: true, error: null });

            const data = await logout();
            if (data.success) navigate('/acceder', { replace: true });

        } catch (error) {
            setAsynObject({
                isLoading: false,
                error: error
            });
        }
    };


    return (
        <section>

            {/* Nombre del usuario (Clickable) */}
            <button
                onClick={() => setShowMenu(prevState => !prevState)}
            >
                Icóno log
            </button>

            {/* Menú desplegable (Renderizado condicional) */}
            {showMenu && (
                <dialog open
                >
                    {
                        asynObject.isLoading
                            ? <p>Saliendo...</p>
                            :
                            <button onClick={handleLogout}>
                                Cerrar Sesión x
                            </button>
                    }

                    {asynObject.error && <p>*{getFirebaseErrorMessage(asynObject.error.code)}</p>}
                </dialog>
            )}
        </section>
    );
}