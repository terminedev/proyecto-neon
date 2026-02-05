import { useState } from "react";
import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from "react-router-dom";
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginDB } = useAuth();
    const navigate = useNavigate();

    const [asynObject, setAsynObject] = useState({
        data: null,
        isLoading: false,
        error: null
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setAsynObject({ data: null, isLoading: true, error: null });

            const data = await loginDB(email, password);
            setAsynObject(prevState => ({ ...prevState, data: data }));

            if (data.success) navigate('/');

        } catch (error) {
            setAsynObject(prevState => ({ ...prevState, error: error }));
        } finally {
            setAsynObject(prevState => ({ ...prevState, isLoading: false }));
        };
    };

    if (asynObject.isLoading) return (<p>Logueándose...</p>)

    return (
        <section>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Correo Eléctonico: </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@ejemplo.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <hr />

                <label htmlFor="password">Contraseña: </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {asynObject.error && <p>*{getFirebaseErrorMessage(asynObject.error.code)}</p>}

                <button type="submit">Entrar</button>
            </form>
        </section>
    );
}