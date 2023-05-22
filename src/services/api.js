import axios from 'axios';

const apiUrl = 'https://desafio-backend-03-dindin.pedagogico.cubos.academy/';

const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json'}
});

export default api;