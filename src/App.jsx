import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthProvider';
import PrivateAccess from 'pages/public-content/PrivateAccess';
import About from 'pages/public-content/About';
import ProtectedRoute from 'routes/ProtectedRoute';
import Home from './pages/private-content/Home';
import './App.css';

export default function App() {
  return (
    <AuthProvider>

      <h1>Proyecto Neón</h1>

      <BrowserRouter>
        <Routes>

          {/* Rutas Públicas */}
          <Route path='/acceder' element={<PrivateAccess />} />
          <Route path='/acerca-de' element={<About />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};