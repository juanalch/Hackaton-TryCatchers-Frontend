import apiClient from './apiClient';

const authService = {
  /**
   * Registra un nuevo usuario
   * Endpoint: POST /autenticacion/register
   * @param {Object} userData - Datos del usuario
   * @returns {Promise} Respuesta del servidor
   */
  register: (userData) => {
    return apiClient.post('/autenticacion/register', userData);
  },

  /**
   * Inicia sesión de un usuario
   * Endpoint: POST /autenticacion/login
   * @param {Object} credentials - Credenciales { correo, contraseña }
   * @returns {Promise} Respuesta del servidor con token
   */
  login: (credentials) => {
    return apiClient.post('/autenticacion/login', credentials);
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
