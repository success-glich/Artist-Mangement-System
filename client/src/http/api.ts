
import config from "@/config/config";
import axios from "axios";

const api = axios.create({
    baseURL: config.backendUri,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((request) => {
    return request;
});

export const login = (data:{username:string,password:string})=>
    api.post("/auth/login", data);