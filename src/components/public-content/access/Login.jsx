import { useState } from "react";
import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from "react-router-dom";
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

import styles from 'styles/Form.module.css';

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
            if (data.success) navigate('/', { replace: true });

        } catch (error) {
            setAsynObject({
                data: null,
                isLoading: false,
                error: error
            });
        }
    };

    return (
        <section className={styles.formWrapper}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Correo Eléctonico: </label>
                    <input
                        className={styles.input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@ejemplo.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <hr />
                <div className={styles.formGroup}>
                    <label htmlFor="password">Contraseña: </label>
                    <input
                        className={styles.input}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {asynObject.error && <p>*{getFirebaseErrorMessage(asynObject.error.code)}</p>}

                {
                    asynObject.isLoading ? <p>Logueándose...</p> : <button type="submit" className={styles.button}>Entrar</button>
                }
            </form>
        </section>
    );
}