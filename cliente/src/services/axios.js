import axios from 'axios';

const usuarioAPI = axios.create({
    baseURL: 'http://localhost:3000/api/usuario',
    headers: {
        'Content-Type': 'application/json',
    }
});

const tareaAPI = axios.create({
    baseURL: 'http://localhost:3001/api/tarea',
    headers: {
        'Content-Type': 'application/json',
    }
});
//agregar el token al header automaticamente si existe
usuarioAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
);

export {usuarioAPI, tareaAPI};