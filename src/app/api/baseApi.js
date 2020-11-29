import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080'
});


http.interceptors.request.use(config => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJBRE1JTiJdLCJzdWIiOiJhbmRyZXMiLCJpYXQiOjE2MDY2MTUxNTksImV4cCI6MTYwNjYxODc1OX0.uLRKRIEOMr7tll6krFXW9fRlCFBxTFxtoJAgKhjj1r_BA_m4ocsyGbQunE-cydgu33fd4JVEdXG00aoYHZBQsA';
    
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