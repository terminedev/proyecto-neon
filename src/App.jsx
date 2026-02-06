import { AuthProvider } from 'contexts/AuthProvider';
import './App.css';
import { Route } from 'react-router-dom';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          Rutas Públicas
          <Route path='/acceder' element={<PrivateAccess />} />
          <Route path='/acerca-de' element={<About />} />

          Rutas Protegidas
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/mis-playlists' element={<MyPlaylist />} />
              <Route path='/mis-videos' element={<MyVideos />} />
              <Route path='/playlist/:playlist_id' element={<PlaylistDetail />} />

              <Route path='crear-playlist' element={<AddPlaylist />} />
              <Route path='agregar-video' element={<AddVideo />} />

              <Route path='/editar-playlist/:playlist_id' element={<EditPlaylist />} />
              <Route path='/editar-video/:video_id' element={<EditVideo />} />

            </Route>
          </Route>

          404
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>


    </AuthProvider>
  );
};