import axios from 'axios'

const caxios = axios.create({
    baseURL: 'http://localhost:8000',
});

const authAxios = axios.create({
    baseURL: 'http://localhost:8000',
})

authAxios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt_token') || ""}`;
        return config;
    },
    error => {
        throw new Error(error.message)
    }
);

export { caxios, authAxios }