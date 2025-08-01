import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://garuda-hacks-jaya-manggala.vercel.app/api",
});

API.interceptors.request.use(
  (request) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  () => Promise.reject()
);
