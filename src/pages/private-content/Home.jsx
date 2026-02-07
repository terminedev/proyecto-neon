import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
import { useAuth } from 'contexts/AuthProvider';
import VideoCard from "components/private-content/video/VideoCard";

import styles from 'styles/Grid.module.css';

export default function Home() {
    document.title = "Home | Proyecto Neón | Gastøn ♱érmine";

    const { user, getAllVideos, getVideoCountDB } = useAuth();

    const [asyncHomeData, setAsyncHomeData] = useState({
        data: {
            videos: [],
        },
        count: 0,
        isLoading: false,
        error: null
    });

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                setAsyncHomeData(prev => ({
                    ...prev,
                    isLoading: true,
                    error: null
                }));

                const videosData = await getAllVideos();
                const count = await getVideoCountDB();

                setAsyncHomeData({
                    data: {
                        videos: videosData || [],
                    },
                    count: count,
                    isLoading: false,
                    error: null
                });

            } catch (error) {
                setAsyncHomeData({
                    data: { videos: [] },
                    isLoading: false,
                    error: error
                });
            }
        };

        fetchData();
    }, [user]);

    const { data, isLoading, error, count } = asyncHomeData;

    return (
        <>
            {/* Botones acción principal */}
            {count < 20 &&
                <section style={{ width: "100%" }}>
                    <Link
                        to="/agregar-video"
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px 0",
                            textAlign: "center",
                            border: "2px solid #2271ff",
                            color: "#2271ff",
                            backgroundColor: "transparent",
                            borderRadius: "5px",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Agregar Vídeo
                    </Link>
                </section>
            }


            {/* Manejo de Error Global */}
            {error && <p>*{getFirebaseErrorMessage(error.code)}</p>}

            {/* Sección Vídeos */}
            <section>
                <header className={styles.sectionHeader}>
                    <h2>Tus vídeos ({count}/20)</h2>
                </header>

                <hr />

                {isLoading ? (
                    <p>Cargando vídeos...</p>
                ) : (
                    <ul className={styles.grid}>
                        {
                            data.videos.length > 0 ? (
                                data.videos.map(video => (
                                    <li key={video.video_id}>
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
        </>
    );
}