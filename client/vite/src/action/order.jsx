import { addOrderProducts, getOrderByUsers } from "../api/order";

export const addOrderPro = async (
  users,
  usersOther,
  sale,
  address,
  country,
  phone,
  notes,
  products,
  totalPrices
) => {
  try {
    const { data } = await addOrderProducts(
      sale,
      products,
      totalPrices,
      users,
      usersOther,
      notes,
      address,
      phone,
      country
    );
    return data.data;
  } catch (error) {
    console.log("add oreder pro fail");
  }
};

export const getOrderByUser = async (users, usersOther) => {
  try {
    const { data } = await getOrderByUsers(users, usersOther);
    return data.data;
  } catch (error) {
    console.log("get oreder by user fail");
  }
};
