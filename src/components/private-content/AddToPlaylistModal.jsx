import { useAuth } from "contexts/AuthProvider";
import { useState } from "react";

export default function AddToPlaylistModal({ songData, closeModal }) {

    const [error, setError] = useState();
    const { user, addSongToPlaylist } = useAuth();

    const handleAddToPlaylist = (playlistId) => {
        try {
            addSongToPlaylist(playlistId, songData);
            closeModal();
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <>
            <h3>Agregar a Playlist</h3>
            <p>Selecciona una playlist para agregar: <strong>{songData.title}</strong></p>

            {error && <p>{error}</p>}
            {user.playlist.length > 0 ? (
                <ul>
                    {user.playlist.map(list => (
                        <li key={list.id}>
                            <span>{list.recordTitlePlayList}</span>
                            <button onClick={() => handleAddToPlaylist(list.id)}>
                                Agregar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes playlists creadas.</p>
            )}

            <button onClick={closeModal}>
                Cancelar
            </button>
        </>
    );
}
