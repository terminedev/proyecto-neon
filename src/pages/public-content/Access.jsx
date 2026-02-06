import { useState } from "react";
import { Link } from "react-router-dom";
import Login from 'components/public-content/access/Login';
import Register from 'components/public-content/access/Register';


export default function Access() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <section>
            <h2>{isLogin ? 'Bienvenido de nuevo' : 'Crear Cuenta'}</h2>

            {isLogin ? <Login /> : <Register />}

            <button onClick={() => setIsLogin(prevState => !prevState)}>
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
            </button>
            <Link to="/acerca-de">Saber más acerca del proyecto Neón</Link>
        </section>

    );
};
