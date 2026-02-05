export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRecord = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password); // <-- Función Firebase
        } catch (err) {
        }
    };

    return (
        <section>
            <h2>Registrarse:</h2>
            <form onSubmit={handleRecord}>
                <input
                    type="email"
                    placeholder="tuemail@ejemplo.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Registrarse</button>
            </form>
        </section>
    );
}