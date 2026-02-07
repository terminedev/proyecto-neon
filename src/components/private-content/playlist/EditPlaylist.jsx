// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { getFirebaseErrorMessage } from 'utils/helpers/getFirebaseErrorMessage';
// import { useAuth } from 'contexts/AuthProvider';

// import styles from 'styles/Form.module.css';

// export default function EditPlaylist() {

//     document.title = "Editar Playlist | Proyecto Neón | Gastøn ♱érmine";

//     const { playlist_id } = useParams();
//     const { user, getPlaylistDB, updatePlaylistDB } = useAuth();
//     const navigate = useNavigate();

//     const [asynObjectFetchPlaylist, setAsynObjectFetchPlaylist] = useState({
//         isLoading: true,
//         error: null
//     });

//     const [asynObjectUpdatePlaylist, setAsynObjectUpdatePlaylist] = useState({
//         isLoading: false,
//         error: null
//     });

//     const {
//         register,
//         handleSubmit,
//         reset,
//         watch,
//         formState: { errors }
//     } = useForm({
//         defaultValues: {
//             name: '',
//             cover: '',
//             description: '',
//             color: '#00ffff',
//         }
//     });

//     const watchedCover = watch('cover');

//     useEffect(() => {
//         if (!user) return;

//         const getPlaylistDatabase = async () => {

//             setAsynObjectFetchPlaylist({ isLoading: true, error: null, data: null });

//             try {
//                 const data = await getPlaylistDB(playlist_id);

//                 if (!data) throw { code: 'custom/not-found', message: 'Playlist no encontrada' };

//                 console.log(data)

//                 reset({
//                     name: data.name,
//                     cover: data.cover,
//                     description: data.description,
//                     color: data.color,
//                 });

//                 setAsynObjectFetchPlaylist({
//                     isLoading: false,
//                     error: null
//                 });

//             } catch (error) {
//                 setAsynObjectFetchPlaylist({ isLoading: false, error: error, data: null });
//             }
//         };

//         if (playlist_id && playlist_id.trim() !== '') getPlaylistDatabase();
//     }, [playlist_id, reset]);


//     const handleChange = async (newData) => {
//         setAsynObjectUpdatePlaylist({ isLoading: true, error: null });

//         try {
//             await updatePlaylistDB(playlist_id, newData);

//             setAsynObjectUpdatePlaylist({ isLoading: false, error: null });

//             navigate(-1, { replace: true });
//         } catch (error) {
//             setAsynObjectUpdatePlaylist({ isLoading: false, error: error });
//         }
//     };


//     return (
//         <section className={styles.formWrapper}>
//             <h2>Editar Información de la Playlist:</h2>

//             {asynObjectFetchPlaylist.isLoading && <p>Cargando información de la playlist...</p>}

//             {asynObjectFetchPlaylist.error &&
//                 <p>Error: {getFirebaseErrorMessage(asynObjectFetchPlaylist.error.code)}</p>
//             }

//             {!asynObjectFetchPlaylist.isLoading && !asynObjectFetchPlaylist.error && (
//                 <form onSubmit={handleSubmit(handleChange)}>

//                     <div className={styles.formGroup}>
//                         <label htmlFor='name'>Nombre:</label>
//                         <input
//                             className={styles.input}

//                             type='text'
//                             id="name"
//                             {...register('name', { required: 'El nombre es requerido' })}
//                         />
//                         {errors.name && <small>*{errors.name.message}</small>}
//                     </div>

//                     <div className={styles.formGroup}>
//                         <label htmlFor='cover'>URL Portada:</label>
//                         <input
//                             className={styles.input}
//                             type='text'
//                             id='cover'
//                             {...register('cover')}
//                         />


//                         {watchedCover && (
//                             <img
//                                 src={watchedCover}
//                                 alt="Thumb"
//                             />
//                         )}
//                     </div>

//                     <div className={styles.formGroup}>
//                         <label htmlFor='color'>Color:</label>
//                         <input
//                             className={styles.input}
//                             type='color'
//                             id="color"
//                             {...register('color')}
//                         />
//                     </div>

//                     <div className={styles.formGroup}>
//                         <label>Notas Personales (Descripción):</label>
//                         <textarea
//                             {...register('description')}
//                             rows="4"
//                             placeholder="Escribe tus notas aquí..."
//                         />
//                     </div>


//                     {asynObjectUpdatePlaylist.error &&
//                         <p>
//                             *{getFirebaseErrorMessage(asynObjectUpdatePlaylist.error.code)}
//                         </p>
//                     }


//                     {asynObjectUpdatePlaylist.isLoading
//                         ? <p>Guardando...</p>
//                         :
//                         <>
//                             <button
//                                 className={styles.button}
//                                 type="button"
//                                 onClick={() => reset()}
//                             >
//                                 Restaurar Datos
//                             </button>
//                             <button type="submit" className={styles.button}>Guardar Cambios</button>
//                         </>
//                     }
//                 </form>
//             )}
//         </section>
//     );
// }