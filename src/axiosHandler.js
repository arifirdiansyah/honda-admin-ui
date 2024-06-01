import axios from "axios";

const axiosHttp = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

axiosHttp.interceptors.request.use(
    (config) => {
        const response = '';
        return {
            ...config,
            headers: {
                ...(response !== null && { Authorization: `${response}` }),
                ...config.headers,
            },
        };

    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosHttp.interceptors.response.use(
    (response) => {
        //const url = response.config.url;

        //setLocalStorageToken(token);
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            //(`unauthorized :)`);
            //localStorage.removeItem("persist:root");
            //removeLocalStorageToken
            //window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosHttp;