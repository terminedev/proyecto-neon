import { Link } from "react-router-dom";

export default function About() {
    document.title = "Acerca del proyecto | Proyecto Neón | Gastøn ♱érmine";

    return (
        <section>
            <header>
                <h1>Acerca de Proyecto Neón</h1>
                <p>Tu Biblioteca Personal de YouTube</p>
            </header>

            <hr />

            <article>
                <h2>Descripción General</h2>
                <p>
                    <strong>Proyecto Neón</strong> nació con la ambición de ser un gestor integral de contenido multimedia.
                    Actualmente, es una aplicación web funcional que permite a los usuarios autenticados gestionar su propia
                    biblioteca de videos de YouTube. El sistema permite realizar un ciclo completo de CRUD:
                    vincular videos mediante su URL, visualizar la información, editar metadatos personalizados y eliminar
                    registros de su colección personal.
                </p>
            </article>

            <article>
                <h2>Tecnologías Utilizadas</h2>
                <ul>
                    <li><strong>React JS:</strong> Librería principal para la construcción de la interfaz basada en componentes.</li>
                    <li><strong>React Router DOM:</strong> Gestión de la navegación y protección de rutas privadas.</li>
                    <li><strong>Firebase Authentication:</strong> Sistema de registro e inicio de sesión seguro.</li>
                    <li><strong>Firebase Firestore:</strong> Base de datos NoSQL para el almacenamiento persistente de los videos.</li>
                    <li><strong>CSS Nativo:</strong> Estilización completa mediante archivos .css sin frameworks externos.</li>
                </ul>
            </article>

            <article>
                <h2>Estructura del Proyecto</h2>
                <p>La organización del código sigue una lógica de separación de responsabilidades para facilitar el mantenimiento:</p>
                <ul>
                    <li><code>/src/components</code>: Componentes reutilizables de la interfaz.</li>
                    <li><code>/src/contexts</code>: Implementación del <strong>AuthContext</strong> para el estado global.</li>
                    <li><code>/src/pages</code>: Vistas principales (Login, Registro, Dashboard, About).</li>
                    <li><code>/src/services</code>: Configuración y llamadas a Firebase.</li>
                    <li><code>/src/styles</code>: Archivos CSS específicos por componente.</li>
                    <li><code>/src/routes</code>: Organización de rutas e implementación de Ruta protejidas.</li>
                </ul>
            </article>

            <article>
                <h2>Manejo de Sesión y AuthContext</h2>
                <p>
                    Se implementó un <code>AuthContext</code> que envuelve a la aplicación, permitiendo que cualquier componente
                    conozca el estado del usuario en tiempo real. Gracias a esto:
                </p>
                <ul>
                    <li>El <strong>Dashboard</strong> es una ruta protegida que solo permite el acceso a usuarios logueados.</li>
                    <li>La navegación se adapta dinámicamente según si existe una sesión activa.</li>
                    <li>Se garantiza la persistencia de la sesión incluso al recargar el navegador.</li>
                </ul>
            </article>

            <article>
                <h2>Dificultades y Decisiones Técnicas</h2>
                <p>
                    Originalmente, el proyecto incluía un sistema complejo de playlists y límites extensos de almacenamiento.
                    Sin embargo, debido a restricciones de tiempo, se tomó la <strong>decisión técnica</strong> de priorizar
                    un Producto Mínimo Viable (MVP) sólido.
                </p>
                <p>
                    <strong>Desafío:</strong> La integración de la API de YouTube y el manejo de estados complejos en el CRUD. <br />
                    <strong>Solución:</strong> Se simplificó la entidad a un máximo de 20 videos por usuario para asegurar un rendimiento
                    óptimo y una experiencia de usuario fluida, centrando el esfuerzo en la correcta sincronización con Firestore.
                </p>
                <p>
                    De igual forma se mantuvo parte del código no utilizado para trabajarlo más adelante.
                </p>
            </article>

            <footer>
                <Link to={'/acceder'} className="btn-primary">Ir al Dashboard / Iniciar Sesión</Link>
            </footer>
        </section>
    );
}