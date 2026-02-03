import { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import EditPlaylist from './EditPlaylist';
import DeleteAction from 'components/private-content/DeleteAction';

export default function PlayList() {
    const { user } = useAuth();
    const [sortingType, setSortingType] = useState('date-asc');

    const [modalConfig, setModalConfig] = useState({
        playlistData: null,
        isOpen: false
    });

    const [showModalBorrable, setShowModalBorrable] = useState({
        playlistData: null,
        isOpen: false
    });

    const sortedPlaylist = useMemo(() => {
        if (!user?.playlist) return [];
        return [...user.playlist].sort((a, b) => {
            switch (sortingType) {
                case 'title-asc':
                    return a.recordTitlePlayList.localeCompare(b.recordTitlePlayList);
                case 'title-desc':
                    return b.recordTitlePlayList.localeCompare(a.recordTitlePlayList);
                case 'date-asc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'date-desc':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });
    }, [user.playlist, sortingType]);

    return (
        <section>
            <h2>Mi Playlist</h2>

            {sortedPlaylist.length > 0 && (
                <section>
                    <label htmlFor="sort-select">Ordenamiento:</label>
                    <select
                        id="sort-select"
                        value={sortingType}
                        onChange={(e) => setSortingType(e.target.value)}
                    >
                        <option value="title-asc">Alfábeticamente (A-Z)</option>
                        <option value="title-desc">Alfábeticamente Reverso (Z-A)</option>
                        <option value="date-asc">Fecha antigua</option>
                        <option value="date-desc">Fecha actual</option>
                    </select>
                </section>
            )}

            {sortedPlaylist.length > 0 ? (
                <ul>
                    {sortedPlaylist.map((playlist) => (
                        <li key={playlist.id}>
                            <strong>{playlist.recordTitlePlayList}</strong> — <small>{playlist.recordColorPlayList}</small>
                            <img src={playlist.recordCoverPlayList} alt={playlist.recordTitlePlayList} style={{ width: '50px' }} />

                            <button
                                type="button"
                                onClick={() => setModalConfig({ playlistData: playlist, isOpen: true })}
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowModalBorrable({ playlistData: playlist, isOpen: true })}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay playlist registradas.</p>
            )}

            {modalConfig.isOpen && (
                <EditPlaylist
                    playlistData={modalConfig.playlistData}
                    closeModal={() => setModalConfig({ playlistData: null, isOpen: false })}
                />
            )}

            {showModalBorrable.isOpen && (
                <DeleteAction
                    item={showModalBorrable.playlistData}
                    type="playlist"
                    closeModal={() => setShowModalBorrable({ playlistData: null, isOpen: false })}
                />
            )}
        </section>
    );
}