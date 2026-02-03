import { useState, useMemo } from 'react';
import { useAuth } from 'contexts/AuthProvider';
import EditSong from 'components/private-content/EditSong';
import DeleteAction from 'components/private-content/DeleteAction';

export default function SongList() {

    const { user } = useAuth();
    const [sortingType, setSortingType] = useState('date-asc');

    const [showModalEditable, setShowModalEditable] = useState({
        songData: null,
        showModalEditable: false
    });

    const [showModalBorrable, setShowModalBorrable] = useState({
        songData: null,
        showModalBorrable: false
    });

    const sortedSongs = useMemo(() => {
        if (!user?.songList) return [];

        return [...user.songList].sort((a, b) => {
            switch (sortingType) {
                case 'title-asc': return a.title.localeCompare(b.title);
                case 'title-desc': return b.title.localeCompare(a.title);
                case 'date-asc': return new Date(a.createdAt) - new Date(b.createdAt);
                case 'date-desc': return new Date(b.createdAt) - new Date(a.createdAt);
                default: return 0;
            }
        });
    }, [user?.songList, sortingType]);

    return (
        <section>
            <h2>Mis canciones</h2>

            {/* Controles de Ordenación */}
            {sortedSongs.length > 0 &&
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
            }

            {/* Renderizado de la lista */}
            {sortedSongs.length > 0 ? (
                <ul>
                    {sortedSongs.map((song) => (
                        <li key={song.idVideo}>
                            <strong>{song.title}</strong> — <small>{song.author_name}</small>
                            <br />
                            <img src={song.thumbnail_url} alt="Thumb" />

                            {/* Botonera de acciones */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setShowModalEditable({
                                        songData: song,
                                        showModalEditable: true
                                    })}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowModalBorrable({
                                        songData: song,
                                        showModalBorrable: true
                                    })}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay canciones registradas.</p>
            )}

            {/* Modal de Edición */}
            {showModalEditable.showModalEditable && <EditSong
                songData={showModalEditable.songData}
                closeModal={() => setShowModalEditable({
                    songData: null,
                    showModalEditable: false
                })}
            />}

            {/* Modal de eliminar */}
            {showModalBorrable.showModalBorrable && (
                <DeleteAction
                    item={showModalBorrable.songData}
                    type="canción"
                    closeModal={() => setShowModalBorrable({ item: null, show: false })}
                />
            )}
        </section >
    );
};