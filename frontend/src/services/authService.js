import apiClient from './apiClient';

const authService = {
  /**
   * Registra un nuevo usuario
   * Endpoint: POST /auth/register
   * @param {Object} userData - Datos del usuario
   * @returns {Promise} Respuesta del servidor
   */
  register: (userData) => {
    // Mapear campos del frontend al formato del backend
    const backendData = {
      email: userData.correo,
      password: userData.contraseña,
      firstName: userData.nombre,
      lastName: userData.apellido
    };
    return apiClient.post('/auth/register', backendData);
  },

  /**
   * Inicia sesión de un usuario
   * Endpoint: POST /auth/login
   * @param {Object} credentials - Credenciales { correo, contraseña }
   * @returns {Promise} Respuesta del servidor con token
   */
  login: (credentials) => {
    // Mapear campos del frontend al formato del backend
    const backendData = {
      email: credentials.correo,
      password: credentials.contraseña
    };
    return apiClient.post('/auth/login', backendData);
  },

  /**
   * Cierra sesión del usuario
   * @returns {void}
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Obtiene el token almacenado
   * @returns {string|null} El token o null si no existe
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Guarda el token en localStorage
   * @param {string} token - El token a guardar
   */
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
};

export default authService;
