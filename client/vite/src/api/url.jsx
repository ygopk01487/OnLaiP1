import axios from "axios";

const URL = "https://localhost:5173";

export const API = axios.create({ baseURL: `${URL}` });

//get token
API.interceptors.request.use((req) => {
  const token = JSON.parse(window.sessionStorage.getItem("access_token"));
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
