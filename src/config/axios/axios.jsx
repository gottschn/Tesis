import axios from "axios";
import { API_URL_JSON_SERVER } from "../jsonserver/connection";

const instance = axios.create({
    baseURL: API_URL_JSON_SERVER,
}); 

instance.interceptors.request.use((request) => {
    if(request.method?.toUpperCase() === 'POST' || !request.url?.includes('?'))
        if(!request.url?.endsWith('/'))
        request.url = request.url?.concat('/')

        return request
})

export default instance;