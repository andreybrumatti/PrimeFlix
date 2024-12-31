import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// https://api.themoviedb.org/3/movie/now_playing?api_key=e68807db0339972b24cea8042fb9741d&language=pt-BR


const api = axios.create({ //Criando uma instância personalizada do Axios
    baseURL: 'https://api.themoviedb.org/3/' //Define a URL base para todas as requisições que serão feitas usando essa instância do Axios.
});

export default api;