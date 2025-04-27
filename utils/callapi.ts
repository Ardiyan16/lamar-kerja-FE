import axios from "axios";

const callApi = axios.create({
    baseURL: "http://localhost:8000/api",
});

callApi.interceptors.request.use(
    async (config) => {
        const a = localStorage.getItem('a')
        const b = localStorage.getItem('b')
        const c = localStorage.getItem('c')
        const d = localStorage.getItem('d')
        const e = localStorage.getItem('e')
        if (a) {
            config.headers['a'] = a;
        }
        if (b) {
            config.headers['b'] = b
        }
        if (c) {
            config.headers['c'] = c
        }
        if (d) {
            config.headers['d'] = d
        }
        if (e) {
            config.headers['e'] = e
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

callApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.data.message || error.response.statusText);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default callApi 
