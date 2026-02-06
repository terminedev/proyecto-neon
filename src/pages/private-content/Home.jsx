import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
import { useAuth } from 'contexts/AuthProvider';
import VideoCard from "components/private-content/video/VideoCard";
import PlaylistCard from "components/private-content/playlist/PlaylistCard";

import styles from 'styles/Grid.module.css';

export default function Home() {

    const { getLatestVideos, getLatestPlaylist } = useAuth();

    const [asyncHomeData, setAsyncHomeData] = useState({
        data: {
            videos: [],
            playlists: []
        },
        isLoading: false,
        error: null
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                setAsyncHomeData({
                    data: {
                        videos: [],
                        playlists: []
                    },
                    isLoading: true,
                    error: null
                });

                const [videosData, playlistsData] = await Promise.all([
                    getLatestVideos(),
                    getLatestPlaylist()
                ]);

                setAsyncHomeData({
                    data: {
                        videos: videosData || [],
                        playlists: playlistsData || []
                    },
                    isLoading: false,
                    error: null
                });

            } catch (error) {
                setAsyncHomeData({
                    data: { videos: [], playlists: [] },
                    isLoading: false,
                    error: error
                });
            }
        };

        fetchData();
    }, []);

    const { data, isLoading, error } = asyncHomeData;

    return (
        <>
            {/* Botones acción principal */}
            <section>
                <Link to="/agregar-video">Agregar Vídeo</Link>
                <Link to="/crear-playlist">Agregar Playlist</Link>
            </section>

            {/* Manejo de Error Global para la carga inicial */}
            {error && <p>*{getFirebaseErrorMessage(error.code)}</p>}

            {/* Sección Vídeos */}
            <section>
                <header className={styles.sectionHeader}>
                    <h2>Tus vídeos</h2>
                    <Link to="/mis-videos">Ver más</Link>
                </header>

                <hr />

                {isLoading ? (
                    <p>Cargando vídeos...</p>
                ) : (
                    <ul className={styles.grid}>
                        {
                            data.videos.length > 0 ? (
                                data.videos.map(video => (
                                    <li>

                                        <VideoCard videoData={video} />

                                    </li>
                                ))
                            ) : (
                                !error && <p>No hay vídeos recientes.</p>
                            )
                        }
                    </ul>
                )}
            </section>

            {/* Sección Playlist */}
            <section>
                <header className={styles.sectionHeader}>
                    <h2>Tus playlists</h2>
                    <Link to="/mis-playlists">Ver más</Link>
                </header>

                <hr />

                {isLoading ? (
                    <p>Cargando playlists...</p>
                ) : (
                    <ul className={styles.grid}>
                        {
                            data.playlists.length > 0 ? (
                                data.playlists.map(playlist => (
                                    <li key={playlist.playlist_id}>
                                        <PlaylistCard playlistData={playlist} />
                                    </li>
                                ))
                            ) : (
                                !error && <p>No hay playlists recientes.</p>
                            )
                        }
                    </ul>
                )}
            </section>
        </>
    );
}