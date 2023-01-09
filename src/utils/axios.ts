import axios from 'axios';
import jsCookie from 'js-cookie';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


let options: any = {
    baseURL: "http://localhost:4000",
    withCredentials: true,
};


const axiosInstance = axios.create(options);


axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 401) {
        jsCookie.remove("login");
        if (
            !(~window.location.href.indexOf('login')
                || ~window.location.href.indexOf('signup')
                || ~window.location.href.indexOf('reset'))
        ) {
            history.push("/sessionExpired");
            window.location.href = "/sessionExpired";
        }
    }
    return Promise.reject(error);
});

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common['token'] = process.env.REACT_APP_SITE_TOKEN || '';


export default axiosInstance;