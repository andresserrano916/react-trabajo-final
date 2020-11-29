import axios from 'axios';
import { getJwt } from '../config/auth/credentials';

const http = axios.create({
    baseURL: 'http://localhost:8080'
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