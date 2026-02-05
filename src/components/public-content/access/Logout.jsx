import { useState } from 'react';

export default function Logout() {
    const { logout, user } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logout(); // <-- Función Firebase
        } catch (error) {
        }
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <section>

            {/* Nombre del usuario (Clickable) */}
            <button
                onClick={toggleMenu}
            >
                <p>
                    Hola, nombre usuario▾
                </p>
            </button>

            {/* Menú desplegable (Renderizado condicional) */}
            {showMenu && (
                <dialog open
                >
                    <button onClick={handleLogout}>
                        Cerrar Sesión x
                    </button>
                </dialog>
            )}
        </section>
    );
}