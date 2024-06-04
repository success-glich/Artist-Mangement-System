import config from "@/config/config";
import useTokenStore from '@/store';
import axios from "axios";

const api = axios.create({
    baseURL: config.backendUri,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
        const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (data:{username:string,password:string})=>
    api.post("/auth/login", data);


export const register = (data:{name:string,username:string,password:string})=>
    api.post("/auth/register", data);

export const getUsers = async (page:number=1,limit:number=5) => {
  return  (await api.get(`/users/?page=${page}&limit=${limit}`)).data;
}


export const createUser = async (data:FormData)=>{
    return api.post("/users", data);
}