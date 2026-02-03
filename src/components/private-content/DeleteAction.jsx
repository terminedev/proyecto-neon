import { useAuth } from 'contexts/AuthProvider';

export default function DeleteAction({ item, type, closeModal }) {

    const { deleteSong, deletePlaylist } = useAuth();

    const handleDelete = () => {
        if (type === 'canción') deleteSong(item);
        if (type === 'playlist') deletePlaylist(item);
        closeModal();
    };

    if (!item) return null;

    return (
        <div>
            <h3>¿Estás seguro de eliminar esta {type}?</h3>
            <p>
                Vas a borrar: <strong>{item.title || item.recordTitlePlayList}</strong>
            </p>

            {item.thumbnail_url && (
                <img
                    src={item.thumbnail_url}
                    alt="preview"
                />
            )}

            <div>
                <button type="button" onClick={closeModal}>
                    No, mantener
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                >
                    Sí, eliminar definitivamente
                </button>
            </div>
            <p>
                * Esta acción no se puede deshacer.
            </p>
        </div>
    );
}