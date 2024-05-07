import { API } from "./url";

export const addOrderProducts = (
  sale,
  products,
  totalPrices,
  users,
  usersOther,
  notes,
  address,
  phone,
  country
) =>
  API.post("/orders/addOrder", {
    sale,
    products,
    totalPrices,
    users,
    usersOther,
    notes,
    address,
    phone,
    country,
  });

export const getOrderByUsers = (users, usersOther) =>
  API.post("/orders/getOrderByUser", { users, usersOther });
