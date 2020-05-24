import axiosMiddleware from "redux-axios-middleware";
import Axios from 'axios';


const client = Axios.create({
    baseURL: '/api/',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

export default function getAxiosMiddleware() {
    return axiosMiddleware(client);
}