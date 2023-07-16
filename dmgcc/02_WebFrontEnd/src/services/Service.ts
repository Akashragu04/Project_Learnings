//Using React Router Inside Axios Interceptors
import axios from 'axios';

//Back end LDAP authentication project
export const baseAPIAuth = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api`,
    withCredentials: true
});

//Back end Rest services project
export const baseAPI = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api`,
    withCredentials: true
});

export const configTokenAPI = {
    headers: {
        Authorization: `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("token")))}`
    }
}

//Add a response interceptor
baseAPI.interceptors.request.use(
    config => {
        if (!config.headers.Authorization) {
            const token: any = JSON.parse(JSON.stringify(localStorage.getItem("token")));
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);


export default baseAPI;
