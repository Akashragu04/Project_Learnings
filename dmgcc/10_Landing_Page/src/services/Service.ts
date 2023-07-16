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


//Add a response interceptor
baseAPI.interceptors.response.use(
    function (response) {
        const { status, data } = response;
        if (status === 404) {

        }
        if (status === 200 && data.message === "Invalid Token") {
            // useAuthMethod().logout()
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    });

export default baseAPI;
