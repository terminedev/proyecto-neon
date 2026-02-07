// import React from 'react';

// export default function SortSelector({ onSortChange }) {
//     const options = [
//         { label: 'Alfabéticamente (A-Z)', value: 'asc_alpha' },
//         { label: 'Alfabéticamente (Z-A)', value: 'desc_alpha' },
//         { label: 'Fecha: Más antiguos primero', value: 'asc_date' },
//         { label: 'Fecha: Más recientes primero', value: 'desc_date' },
//     ];

//     const handleChange = (event) => {
//         onSortChange(event.target.value);
//     };

//     return (
//         <select
//             onChange={handleChange}
//         >
//             {options.map((opt, index) => (
//                 <option key={opt.value} value={opt.value} select={index === 0 && index}>
//                     {opt.label}
//                 </option>
//             ))}
//         </select>
//     );
// };
