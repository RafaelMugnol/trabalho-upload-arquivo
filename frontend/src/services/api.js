import axios from 'axios';

const api = axios.create({
  baseURL: 'https://oministack-backend-manzoli.herokuapp.com'
});

export default api;
