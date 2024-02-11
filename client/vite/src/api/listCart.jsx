import { API } from "./url";

export const getCartByUser = (userOther, user) =>
  API.post("/listCart/cartByUser", { userOther, user });

export const addCart = (
  user,
  userOther,
  product,
  total,
  quantity,
  totalPrice
) =>
  API.post("/listCart/addCart", {
    user,
    userOther,
    product,
    total,
    quantity,
    totalPrice,
  });

export const editCart = () => API.put("/listCart/editCart");

export const deleteProCart = (id, product) =>
  API.put(`/listCart/deleteProCart/${id}`, { product });
