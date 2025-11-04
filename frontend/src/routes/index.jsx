import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from '../components/index.js';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta raíz - redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas futuras del dashboard */}
        {/* <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/perfil" element={<Perfil />} />
             etc... */}

        {/* Ruta para página no encontrada */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
