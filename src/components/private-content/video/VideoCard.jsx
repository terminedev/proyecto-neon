import { useState } from "react";
import { Link } from "react-router-dom";
import ToAddToPlaylist from "components/private-content/playlist/ToAddToPlaylist";
import DeleteVideo from "components/private-content/video/DeleteVideo";

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

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // const handlePlay = () => { console.log("Reproducir video interno"); };

    return (
        <>
            <article>
                <header>
                    <h3>{title}</h3>
                    <p>Canal: {author_name}</p>
                </header>
                <main>
                    <img
                        src={thumbnail_url}
                        alt={`Portada de ${title}`}
                    />
                </main>
                <footer>
                    {/* <button onClick={handlePlay}>Play</button> */}

                    <button onClick={() => {
                        setHandleAddToPlaylist({
                            isOpen: true,
                            video_id: video_id
                        })
                    }}>+</button>

                    {/* <button
                        onClick={() => handleAddToFavorites(video_id)}
                    >
                        {asynObjectAddToFav.isLoading ? '...' : 'Fav'}
                    </button> */}

                    <Link to={`/editar-video/${video_id}`}>
                        Editar
                    </Link>

                    <button onClick={() => setShowDeleteModal(true)}>Borrar</button>

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

            {showDeleteModal && (
                <DeleteVideo
                    video_id={video_id}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
};