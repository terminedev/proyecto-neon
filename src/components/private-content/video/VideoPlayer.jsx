
// export default function VideoPlayer({ videoData, onClose }) {

//     if (!videoData) return null;

//     const {
//         original_video_id_url,
//         title,
//         author_name,
//         description
//     } = videoData;

//     const embedUrl = `https://www.youtube.com/embed/${original_video_id_url}?autoplay=1`;

//     return (
//         <aside>

//             <header>
//                 <span>Reproduciendo ahora...</span>
//                 <button onClick={onClose}>⨉</button>
//             </header>

//             <main>
//                 <iframe
//                     width="100%"
//                     height="100%"
//                     src={embedUrl}
//                     title={title}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                 ></iframe>
//             </main>

//             <footer>
//                 <h2 >{title}</h2>
//                 <span>Canal: {author_name}</span>

//                 <h4>Mis Notas:</h4>
//                 <p>{description}</p>
//             </footer>
//         </aside >
//     );
// };
