import axios from "axios";
import { config } from "dotenv";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;