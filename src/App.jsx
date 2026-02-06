import { AuthProvider } from 'contexts/AuthProvider';
import AddVideo from './components/private-content/AddVideo';
import './App.css';

export default function App() {
  return (
    <AuthProvider>



      {/* <BrowserRouter>
        <Routes>

          Rutas Públicas 
          <Route path='/acceder' element={<PrivateAccess />} />
          <Route path='/acerca-de' element={<About />} />

          Rutas Protegidas
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>

          404
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter> */}


    </AuthProvider>
  );
};