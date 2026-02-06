import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthProvider';

import Access from 'components/public-content/access/Access';
import About from 'components/public-content/About';
import ProtectedRoute from 'components/ProtectedRoute';
import Layout from 'components/Layout';
import Home from 'components/private-content/Home';
import MyPlaylists from 'components/private-content/playlist/MyPlaylists';
import MyVideos from 'components/private-content/video/MyVideos';
import PlaylistDetail from 'components/private-content/playlist/PlaylistDetail';
import AddPlaylist from 'components/private-content/playlist/AddPlaylist';
import AddVideo from 'components/private-content/video/AddVideo';
import EditPlaylist from 'components/private-content/playlist/EditPlaylist';
import EditVideo from 'components/private-content/video/EditVideo';

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
              <Route path='/mis-playlists' element={<MyPlaylists />} />
              <Route path='/mis-videos' element={<MyVideos />} />
              <Route path='/playlist/:playlist_id' element={<PlaylistDetail />} />

              <Route path='/crear-playlist' element={<AddPlaylist />} />
              <Route path='/agregar-video' element={<AddVideo />} />

              <Route path='/editar-playlist/:playlist_id' element={<EditPlaylist />} />
              <Route path='/editar-video/:video_id' element={<EditVideo />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}