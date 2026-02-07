// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
// import { useAuth } from 'contexts/AuthProvider';
// import PlaylistCard from "components/private-content/playlist/PlaylistCard";

// import styles from 'styles/Grid.module.css';

// export default function MyPlaylists() {

//     document.title = "Mis Playlists | Proyecto Neón | Gastøn ♱érmine";

//     const { user, getPlaylistDB } = useAuth();

//     const [asyncPlaylistsData, setAsyncPlaylistsData] = useState({
//         data: [],
//         isLoading: false,
//         error: null
//     });

//     useEffect(() => {
//         if (!user) return;

//         const fetchData = async () => {
//             try {
//                 setAsyncPlaylistsData({
//                     data: [],
//                     isLoading: true,
//                     error: null
//                 });

//                 const playlistsResult = await getPlaylistDB();

//                 setAsyncPlaylistsData({
//                     data: playlistsResult || [],
//                     isLoading: false,
//                     error: null
//                 });

//             } catch (error) {
//                 setAsyncPlaylistsData({
//                     data: [],
//                     isLoading: false,
//                     error: error
//                 });
//             }
//         };

//         fetchData();
//     }, []);

//     const { data, isLoading, error } = asyncPlaylistsData;

//     return (
//         <>
//             <header>
//                 <div className={styles.sectionHeader}>
//                     <h1>Mis Playlists</h1>
//                     <Link to="/crear-playlist">Crear Nueva Playlist</Link>
//                 </div>
//             </header >

//             <hr />

//             {error && <p>*{getFirebaseErrorMessage(error.code)}</p>}

//             <section>
//                 {isLoading ? (
//                     <p>Cargando playlists...</p>
//                 ) : (
//                     data.length > 0 ? (
//                         <ul className={styles.grid}>
//                             {data.map(playlist => (
//                                 <li key={playlist.playlist_id}>
//                                     <PlaylistCard playlistData={playlist} />
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         !error && (
//                             <>
//                                 <p>Aún no has creado ninguna playlist.</p>
//                                 <Link to="/crear-playlist">¡Crea tu primera playlist!</Link>
//                             </>
//                         )
//                     )
//                 )}
//             </section>
//         </>
//     );
// }