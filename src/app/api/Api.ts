import axios from 'axios';

const apiUrl = 'https://desafio-backend-03-dindin.pedagogico.cubos.academy';
export const instance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: { 
        'Content-Type': 'application/json',
    }
});

