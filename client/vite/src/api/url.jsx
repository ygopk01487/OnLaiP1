import axios from "axios";

const URL = "http://localhost:5000";

export const API = axios.create({ baseURL: `${URL}` });

//get token
API.interceptors.request.use((req) => {
  const token = JSON.parse(window.sessionStorage.getItem("access_token"));
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
