import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080'
});


http.interceptors.request.use(config => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInN1YiI6ImFuZHJlcyIsImlhdCI6MTYwNjQ0OTI0MywiZXhwIjoxNjA2NDUyODQzfQ._UeGZTKWXvUQyIz3r7Fz5oVNecJVftYH1MifpG_sFiKbnYJoRvd5VT6fElDDNnFQ4wI1he1DcE3sR769RzfAyg';
    
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