import axios from 'axios';
import { toast } from 'react-toastify';
import { getJwt } from '../config/auth/credentials';
import { TOKEN_KEY } from '../core/appConstants';
import history from '../..';

const http = axios.create({
    baseURL: 'http://localhost:8080'
});

http.interceptors.response.use(undefined, (error) => {
    if(error.message === 'Network Error' && !error.response){
        toast.error('Error de red - Por favor válida que el servidor esté ejecutándose');
        window.localStorage.removeItem(TOKEN_KEY);
        history.push('/');
        toast.info('Tu sesión ha expirado, por favor inicia de nuevo sesión');
    }

    const {status, data, config} = error.response;

    if(status === 404){
        history.push('/notFound');
    }

    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')){
        history.push('/notFound');
    }

    if(status === 404){
        toast.info('Error - Por favor valida la consola para más información');
    }

    throw error.response;
});

http.interceptors.request.use(config => {
    const token = getJwt();

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

const responseBody = response => response.data;

const baseApi = {
    get: url => http.get(url).then(responseBody),
    post: (url, data) => http.post(url, data).then(responseBody),
    put: (url, data) => http.put(url, data).then(responseBody),
    delete: url => http.delete(url).then(responseBody)
};

export default baseApi;