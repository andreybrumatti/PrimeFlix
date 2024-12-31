import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// https://api.themoviedb.org/3/movie/now_playing?api_key=e68807db0339972b24cea8042fb9741d&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;