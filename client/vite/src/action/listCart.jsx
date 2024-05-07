import {
  addCart,
  addSaleCart,
  deleteALlProCarts,
  deleteCarts,
  deleteProCart,
  editCart,
  getCartByUser,
} from "../api/listCart";

export const getListCartByUser = async (userOther, user) => {
  try {
    const { data } = await getCartByUser(userOther, user);

    return data;
  } catch (error) {
    console.log("get list cart by user fail");
  }
};

export const addListCart = async (
  user,
  userOther,
  product,
  total,
  quanitty,
  totalPrice
) => {
  try {
    const { data } = await addCart(
      user,
      userOther,
      product,
      total,
      quanitty,
      totalPrice
    );

    return data.pushCart || data.newCart || data.updateCarts;
  } catch (error) {
    console.log("add list cart fail");
  }
};

export const editListCart = async (id, product, quantity, total, type) => {
  try {
    const { data } = await editCart(id, product, quantity, total, type);
    return data.updateCart;
  } catch (error) {
    console.log("edit list cart  fail");
  }
};

export const deleteListProCart = async (id, product) => {
  try {
    const { data } = await deleteProCart(id, product);
    return data.deleteListProCart;
  } catch (error) {
    console.log("delete list pro cart fail");
  }
};

export const deleteAllProCartss = async (id) => {
  try {
    const { data } = await deleteALlProCarts(id);
    return data.data;
  } catch (error) {
    console.log("delete cart fail");
  }
};

export const deleteCartss = async (id) => {
  try {
    await deleteCarts(id);
  } catch (error) {
    console.log("delete cart fail");
  }
};

export const addSaleCarts = async (nameSale, value, id) => {
  try {
    const { data } = await addSaleCart(nameSale, value, id);
    return data.data;
  } catch (error) {
    console.log("add sale fail");
  }
};
