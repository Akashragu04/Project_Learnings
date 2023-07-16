import axios from "axios";

const jwtAxios= axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true 
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === "Token is not valid") {
    }
    return Promise.reject(err);
  }
);

export default jwtAxios;
