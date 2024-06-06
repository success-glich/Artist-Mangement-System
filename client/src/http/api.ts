import config from "@/config/config";
import useTokenStore from "@/store";
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

export const login = (data: { username: string; password: string }) =>
  api.post("/auth/login", data);

export const register = (data: {
  name: string;
  username: string;
  password: string;
}) => api.post("/auth/register", data);

// * User's Api
export const getUsersCount = async () => {

  return api.get("/users/count");
};

export const getUsers = async (page: number = 1, limit: number = 5) => {
  return (await api.get(`/users/?page=${page}&limit=${limit}`)).data;
};

export const getUser = async (userId: number) => {
  return api.get(`/users/${userId}`);
};
export const createUser = async (data: FormData) => {
  return api.post("/users", data);
};

export const updateUser = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}) => {
  return api.put(`/users/${id}`, data);
};
export const deleteUser = async (id: number) => {
  return api.delete(`/users/${id}`);
};

// * Artist Api
export const getArtistsCount = async () => {
  return api.get("/artists/count");
};
export const getArtists = async (page: number = 1, limit: number = 5) => {
  return (await api.get(`/artists/?page=${page}&limit=${limit}`)).data;
};
export const getArtist = async (artistId: number) => {
  return api.get(`/artists/${artistId}`);
};
export const createArtist = async (data: FormData) => {
  return api.post("/artists", data);
};
export const deleteArtist = async (artistId: number) => {
  return api.delete(`/artists/${artistId}`);
};

export const updateArtist = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}) => {
  return api.put(`/artists/${id}`, data);
};

//* songs api

export const getMusicsCount = async () => {
  return api.get("/artists/count");
};
export const getMusics = async ({
  page = 1,
  limit = 5,
  artistId,
}: {
  page?: number;
  limit?: number;
  artistId: number;
}) => {
  return (await api.get(`/musics/${artistId}?page=${page}&limit=${limit}`))
    .data;
};
export const getMusic = async (artistId: number) => {
  return api.get(`/musics/info/${artistId}`);
};
export const createMusic = async (data: FormData) => {
  return api.post(`/musics`, data);
};

export const deleteMusic = async (musicId: number) => {
  return api.delete(`/musics/${musicId}`);
};

export const updateMusic = async ({
  id,
  data
}: {
  id: number;
  data: FormData;
}) => {
  return api.put(`/musics/${id}`, data);
};
