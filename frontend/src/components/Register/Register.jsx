import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Llamada al endpoint de registro
      const response = await authService.register(formData);
      
      // Si el servidor devuelve un token, guardarlo
      if (response.data.token) {
        authService.setToken(response.data.token);
      }

      // Redirigir al login o dashboard
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
      console.error('Error de registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Try-Catchers 📊</h1>
        </div>

        <div className="register-form-wrapper">
          <h2>REGISTRO</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Tu apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="tu@email.com"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                placeholder="Tu contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'REGISTRARSE'}
            </button>
          </form>

          <div className="login-link">
            <p>¿Ya tienes cuenta? 
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="link-btn"
              >
                LOGIN
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
