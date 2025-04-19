import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: BASE_URL,
});

// https://axios-http.com/es/docs/interceptors
api.interceptors.request.use(
  function (config) {
    // Guardamos el token en los headers
    const token = localStorage.getItem("access");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Obtenemos el tiempo actual en segundos
      if (decodedToken.exp > currentTime) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    // Error de la petición
    return Promise.reject(error);
  }
);

export default api;
