import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      // Llamada al endpoint de login
      const response = await authService.login(formData);
      
      // Guardar el token
      if (response.data.token) {
        authService.setToken(response.data.token);
      }

      // Redirigir al dashboard o página principal
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Correo o contraseña incorrectos');
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Try-Catchers 📊</h1>
        </div>

        <div className="login-form-wrapper">
          <h2>LOGIN</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
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
              {loading ? 'Iniciando sesión...' : 'LOGIN'}
            </button>
          </form>

          <div className="register-link">
            <p>¿No tienes cuenta? 
              <button 
                type="button"
                onClick={() => navigate('/register')}
                className="link-btn"
              >
                REGISTRO
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="login-contact">
        <div className="contact-group">
          <span>📧 Email:</span>
          <a href="mailto:trycatchers@gmail.accounting.edu.co">trycatchers@gmail.accounting.edu.co</a>
        </div>
        <div className="contact-group">
          <span>📧 Email:</span>
          <a href="mailto:sergio.idarraga@gmail.accounting.edu.co">sergio.idarraga@gmail.accounting.edu.co</a>
        </div>
        <div className="contact-group">
          <span>📧 Email:</span>
          <a href="mailto:brayan.gomez@gmail.accounting.edu.co">brayan.gomez@gmail.accounting.edu.co</a>
        </div>
        <div className="contact-group">
          <span>📧 Email:</span>
          <a href="mailto:mario.dominguez@gmail.accounting.edu.co">mario.dominguez@gmail.accounting.edu.co</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
