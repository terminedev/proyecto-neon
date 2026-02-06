import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
import { useAuth } from 'contexts/AuthProvider';
import VideoCard from "components/private-content/video/VideoCard";

export default function MyVideos() {

    const { getAllVideos } = useAuth();

    const [asyncVideosData, setAsyncVideosData] = useState({
        data: [],
        isLoading: false,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAsyncVideosData({
                    data: [],
                    isLoading: true,
                    error: null
                });

                const videosResult = await getAllVideos();

                setAsyncVideosData({
                    data: videosResult || [],
                    isLoading: false,
                    error: null
                });

            } catch (error) {

                setAsyncVideosData({
                    data: [],
                    isLoading: false,
                    error: error
                });
            }
        };

        fetchData();
    }, []);

    const { data, isLoading, error } = asyncVideosData;

    return (
        <>
            <header>
                <h1>Mis Vídeos</h1>
                <Link to="/agregar-video">Agregar Nuevo Vídeo</Link>
            </header>

            <hr />

            {error && <p>*{getFirebaseErrorMessage(error.code)}</p>}

            <section>
                {isLoading ? (
                    <p>Cargando biblioteca de vídeos...</p>
                ) : (
                    data.length > 0 ? (
                        <ul>
                            {data.map(video => (
                                <li key={video.video_id}>
                                    <VideoCard videoData={video} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !error && (
                            <>
                                <p>Aún no has subido ningún vídeo.</p>
                                <Link to="/agregar-video">¡Sube tu primer vídeo!</Link>
                            </>
                        )
                    )
                )}
            </section>
        </>
    );
}