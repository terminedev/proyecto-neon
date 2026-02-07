// import { useEffect, useState } from "react";
// import { useAuth } from 'contexts/AuthProvider';
// import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';

// export default function ToAddToPlaylist({
//     video_id,
//     onClose
// }) {

//     const { user, getPlaylistDB, addSongToPlaylist } = useAuth();

//     const [asyncFetchPlaylists, setAsyncFetchPlaylists] = useState({
//         data: [],
//         isLoading: false,
//         error: null
//     });

//     const [asyncAddToPlaylist, setAsyncAddToPlaylist] = useState({
//         isLoading: false,
//         error: null
//     });

//     useEffect(() => {
//         if (!user) return;
//         const getPlaylist = async () => {

//             try {
//                 setAsyncFetchPlaylists({ data: [], isLoading: true, error: null });

//                 const list = await getPlaylistDB();

//                 setAsyncFetchPlaylists({
//                     data: list || [],
//                     isLoading: false,
//                     error: null
//                 });

//             } catch (error) {
//                 setAsyncFetchPlaylists({
//                     data: [],
//                     isLoading: false,
//                     error: error
//                 });
//             }
//         }

//         if (video_id && video_id.trim() !== '') getPlaylist();

//     }, [video_id]);

//     const handleAggregate = async (playlist_id) => {
//         try {
//             setAsyncAddToPlaylist({ isLoading: true, error: null });

//             await addSongToPlaylist(playlist_id, video_id);

//             onClose();

//         } catch (error) {
//             setAsyncAddToPlaylist({
//                 isLoading: false,
//                 error: error
//             });
//         }
//     };

//     return (
//         <dialog open>
//             <header>
//                 <h3>Guardar en playlist</h3>
//             </header>

//             <main>
//                 {asyncFetchPlaylists.isLoading && <p>Cargando tus playlists...</p>}

//                 {asyncFetchPlaylists.error &&
//                     <p>
//                         Error cargando listas: {getFirebaseErrorMessage(asyncFetchPlaylists.error.code)}
//                     </p>
//                 }

//                 {!asyncFetchPlaylists.isLoading && !asyncFetchPlaylists.error && !asyncAddToPlaylist.isLoading && (
//                     <>
//                         {asyncFetchPlaylists.data.length > 0 ? (
//                             <ul>
//                                 {asyncFetchPlaylists.data.map((playlist) => (
//                                     <li key={playlist.playlist_id}>
//                                         <button
//                                             onClick={() => handleAggregate(playlist.playlist_id)}
//                                         >
//                                             {playlist.name}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p>No tienes playlists creadas aún.</p>
//                         )}
//                     </>
//                 )}

//                 {asyncAddToPlaylist.isLoading && <p>Guardando video en playlist...</p>}

//                 {asyncAddToPlaylist.error &&
//                     <p>*{getFirebaseErrorMessage(asyncAddToPlaylist.error.code)}</p>
//                 }

//             </main>

//             <footer>
//                 {!asyncAddToPlaylist.isLoading && (
//                     <button onClick={onClose}>
//                         Cancelar
//                     </button>
//                 )}
//             </footer>
//         </dialog>
//     )
// };