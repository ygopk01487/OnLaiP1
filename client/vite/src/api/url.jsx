import axios from "axios";
import { Cookies } from "react-cookie";

const URL = "http://localhost:5000";

export const API = axios.create({ baseURL: `${URL}` });

const cookies = new Cookies();

//get token
API.interceptors.request.use((req) => {
  const token = cookies.get("access_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
