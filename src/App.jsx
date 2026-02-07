import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthProvider';

import Access from 'pages/public-content/Access';
import About from 'components/public-content/access/About';
import Home from 'pages/private-content/Home';
import MyVideos from 'pages/private-content/MyVideos';
import ProtectedRoute from 'routes/ProtectedRoute';
import Layout from 'components/private-content/ui/Layout';
import AddVideo from 'components/private-content/video/AddVideo';
import EditVideo from 'components/private-content/video/EditVideo';
import DeleteVideo from 'components/private-content/video/DeleteVideo';


import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Rutas Públicas */}
          <Route path='/acceder' element={<Access />} />
          <Route path='/acerca-de' element={<About />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>

              <Route path='/' element={<Home />} />
              <Route path='/mis-videos' element={<MyVideos />} />

              <Route path='/agregar-video' element={<AddVideo />} />

              <Route path='/editar-video/:video_id' element={<EditVideo />} />

              <Route path='/borrar-video/:video_id' element={<DeleteVideo />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}