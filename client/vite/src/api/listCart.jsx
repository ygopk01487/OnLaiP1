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

export const addSaleCart = (nameSale, value, id) =>
  API.post(`/listCart/addSale`, { nameSale, value, id });

export const editCart = (id, product, quantity, total, type) =>
  API.put(`/listCart/editCart/${id}`, { product, quantity, total, type });

export const deleteProCart = (id, product) =>
  API.put(`/listCart/deleteProCart/${id}`, { product });

export const deleteALlProCarts = (id) =>
  API.put(`/listCart/deleteAllPros/${id}`);

export const deleteCarts = (id) => API.delete(`/listCart/deleteCart/${id}`);
