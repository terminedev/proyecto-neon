import { Link } from "react-router-dom";

export default function About() {

    document.title = "Acerca del proyecto | Proyecto Neón | Gastøn ♱érmine";
    return (
        <section>
            Esto es el About
            <Link to={'/acceder'}>Loguearse/Registrarse</Link>
        </section>
    )
};