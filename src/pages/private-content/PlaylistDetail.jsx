// import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
// import { useAuth } from 'contexts/AuthProvider';
// import VideoCard from "components/private-content/video/VideoCard";


// export default function PlaylistDetail() {

//     document.title = "Detalle Playlist | Proyecto Neón | Gastøn ♱érmine";

//     const { playlist_id } = useParams();

//     const {
//         user,
//         getPlaylistByIdDB,
//         getVideosAccordingToPlaylist,
//         removeSongFromPlaylist
//     } = useAuth();

//     const [playlistInfo, setPlaylistInfo] = useState({
//         data: null,
//         isLoading: false,
//         error: null
//     });

//     const [playlistVideos, setPlaylistVideos] = useState({
//         data: [],
//         isLoading: false,
//         error: null
//     });

//     useEffect(() => {
//         if (!user) return;
//         const fetchPlaylistInfo = async () => {
//             try {
//                 setPlaylistInfo({ data: null, isLoading: true, error: null });

//                 const result = await getPlaylistByIdDB(playlist_id);

//                 if (result) {
//                     setPlaylistInfo({ data: result, isLoading: false, error: null });
//                 } else {
//                     setPlaylistInfo({
//                         data: null,
//                         isLoading: false,
//                         error: { code: 'document-not-found', message: 'La playlist no existe.' }
//                     });
//                 }

//             } catch (error) {
//                 setPlaylistInfo({ data: null, isLoading: false, error: error });
//             }
//         };

//         if (playlist_id) {
//             fetchPlaylistInfo();
//         }
//     }, [playlist_id, getPlaylistByIdDB]);


//     useEffect(() => {
//         const fetchVideos = async () => {

//             if (playlistInfo.data && playlistInfo.data.video_ids && playlistInfo.data.video_ids.length > 0) {

//                 try {
//                     setPlaylistVideos(prev => ({ ...prev, isLoading: true, error: null }));

//                     const videosResult = await getVideosAccordingToPlaylist(playlistInfo.data.video_ids);

//                     setPlaylistVideos({
//                         data: videosResult || [],
//                         isLoading: false,
//                         error: null
//                     });

//                 } catch (error) {
//                     setPlaylistVideos(prev => ({ ...prev, isLoading: false, error: error }));
//                 }
//             } else if (playlistInfo.data && (!playlistInfo.data.video_ids || playlistInfo.data.video_ids.length === 0)) {
//                 setPlaylistVideos({ data: [], isLoading: false, error: null });
//             }
//         };

//         fetchVideos();
//     }, [playlistInfo.data, getVideosAccordingToPlaylist]);

//     const handleRemoveVideo = async (video_id) => {
//         try {
//             await removeSongFromPlaylist(playlist_id, video_id);

//             setPlaylistVideos(prevState => ({
//                 ...prevState,
//                 data: prevState.data.filter(video => video.id !== video_id)
//             }));

//         } catch (error) {
//             console.error("Error al eliminar video:", error);
//             alert("Hubo un error al eliminar el video: " + getFirebaseErrorMessage(error.code));
//         }
//     };


//     const { data: playlist, isLoading: loadingPlaylist, error: errorPlaylist } = playlistInfo;
//     const { data: videos, isLoading: loadingVideos, error: errorVideos } = playlistVideos;

//     if (loadingPlaylist) return <p>Cargando información de la playlist...</p>;
//     if (errorPlaylist) return <p>{getFirebaseErrorMessage(errorPlaylist.code)}</p>;
//     if (!playlist) return <p>No se encontró la playlist.</p>;

//     return (
//         <>

//             <header>
//                 {/* Portada */}
//                 {playlist.cover && (
//                     <img
//                         src={playlist.cover}
//                         alt={`Portada de ${playlist.name}`}
//                     />
//                 )}

//                 <h2>{playlist.name}</h2>
//                 {playlist.description && (
//                     <p>{playlist.description}</p>
//                 )}
//                 <Link to={`/editar-playlist/${playlist_id}`}>
//                     Editar Playlist
//                 </Link>
//             </header>

//             <hr />

//             <section>
//                 <h3>Videos en esta lista</h3>

//                 {errorVideos && <p>Error cargando videos: {getFirebaseErrorMessage(errorVideos.code)}</p>}

//                 {loadingVideos ? (
//                     <p>Cargando videos...</p>
//                 ) : (
//                     videos.length > 0 ? (
//                         <ul>
//                             {videos.map(video => (
//                                 <li key={video.video_id}>

//                                     <VideoCard videoData={video} />

//                                     < button
//                                         onClick={() => handleRemoveVideo(video.video_id)}>
//                                         Eliminar
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul >
//                     ) : (
//                         <p>Esta playlist está vacía. ¡Agrega algunos videos!</p>
//                     )
//                 )
//                 }
//             </section >
//         </>
//     );
// }