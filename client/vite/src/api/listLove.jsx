import { API } from "./url";

export const getAllList = () => API.get("/listLove/getAllLove");

export const addLove = (userOther, products, user) =>
  API.post("/listLove/addLove", { userOther, products, user });

export const deleteProList = (id, products) =>
  API.put(`/listLove/deleteProList/${id}`, { products });

export const getByUserLiveLove = (userOther, user) =>
  API.post("/listLove/getByUserLove", { userOther, user });
