// export default function Seeker({ onSearch }) {

//     const [query, setQuery] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim()) onSearch(query);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Buscar vídeo o playlist"
//                 className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//             <button type="submit">
//                 Buscar
//             </button>
//         </form>
//     );
// };
