import axios from "axios";

export const Base_Url = `${process.env.REACT_APP_API_URL}`;
export const myAxios = axios.create({
    baseURL:Base_Url
});