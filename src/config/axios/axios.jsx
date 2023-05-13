import axios from "axios";
import { API_URL_JSON_SERVER } from "../jsonserver/connection";

const clientAxios = axios.create({
    baseURL: API_URL_JSON_SERVER,
});

export default clientAxios;