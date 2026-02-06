import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePlaylist from "components/private-content/playlist/DeletePlaylist";

export default function PlaylistCard({ playlistData }) {

    const {
        playlist_id,
        name,
        cover,
    } = playlistData;

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
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
                    <Link to={`/playlist/${playlist_id}`}>
                        Play
                    </Link>

                    <Link to={`/editar-playlist/${playlist_id}`}>
                        Editar
                    </Link>

                    <button onClick={() => setShowDeleteModal(true)}>
                        Borrar
                    </button>
                </footer>
            </article>

            {showDeleteModal && (
                <DeletePlaylist
                    id={playlist_id}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
};