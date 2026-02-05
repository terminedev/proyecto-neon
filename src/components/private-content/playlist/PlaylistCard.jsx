export default function PlaylistCard({ playlistData }) {

    const {
        name,
        cover
    } = playlistData;

    const handlePlay = () => { console.log("Reproducir video interno"); };
    const handleEdit = () => { console.log("Modificar datos (título/portada)"); };
    const handleDelete = () => { console.log("Eliminar tarjeta"); };

    return (
        <article>
            <header>
                <h3>{name}</h3>
            </header>
            <main>
                <img
                    src={cover}
                    alt={`Portada de ${name}`}
                />
            </main>
            <footer>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Borrar</button>
            </footer>
        </article>
    );
};

