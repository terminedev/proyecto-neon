import { useState } from "react";
import { Link } from "react-router-dom";
import ToAddToPlaylist from "components/private-content/playlist/ToAddToPlaylist";
import DeleteVideo from "components/private-content/video/DeleteVideo";

import styles from 'styles/Card.module.css';

export default function VideoCard({ videoData }) {

    const {
        video_id,
        original_url,
        author_name,
        title,
        thumbnail_url,
    } = videoData;


    // const { addToFavoritesDB } = useAuth();

    // const [asynObjectAddToFav, setAsynObjectAddToFav] = useState({
    //     isLoading: false,
    //     error: null,
    //     success: false
    // });

    // const handleAddToFavorites = async (id) => {
    //     try {
    //         setAsynObjectAddToFav({ isLoading: true, error: null, success: false });

    //         await addToFavoritesDB(id);

    //         setAsynObjectAddToFav({ isLoading: false, error: null, success: true });

    //     } catch (error) {
    //         setAsynObjectAddToFav({ isLoading: false, error: error, success: false });
    //     }
    // };

    const [handleAddToPlaylist, setHandleAddToPlaylist] = useState({
        isOpen: false,
        video_id: null,
    });

    // const handlePlay = () => { console.log("Reproducir video interno"); };

    return (
        <>
            <article className={styles.card}>
                <header className={styles.content}>
                    <h3>{title}</h3>
                    <p>Canal: {author_name}</p>
                </header>
                <main>
                    <img
                        src={thumbnail_url}
                        alt={`Portada de ${title}`}
                        className={styles.thumbnail}
                    />
                </main>
                <footer className={styles.footer}>
                    {/* <button onClick={handlePlay}>Play</button> */}

                    {/* <button onClick={() => {
                        setHandleAddToPlaylist({
                            isOpen: true,
                            video_id: video_id
                        })
                    }}>+</button> */}

                    {/* <button
                        onClick={() => handleAddToFavorites(video_id)}
                    >
                        {asynObjectAddToFav.isLoading ? '...' : 'Fav'}
                    </button> */}

                    <Link to={`/editar-video/${video_id}`} className={styles.button}>
                        Editar
                    </Link>

                    <Link to={`/borrar-video/${video_id}`} className={styles.button}>
                        Borrar
                    </Link>

                    <a href={original_url} target='_blank' rel="noreferrer">Ir a Vídeo YT</a>
                </footer>
            </article>

            {handleAddToPlaylist.isOpen && (
                <ToAddToPlaylist
                    video_id={handleAddToPlaylist.video_id}
                    onClose={() => {
                        setHandleAddToPlaylist({
                            isOpen: false,
                            video_id: null
                        })
                    }}
                />
            )}
        </>
    );
};