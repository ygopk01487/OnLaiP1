import { addCart, deleteProCart, getCartByUser } from "../api/listCart";

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
    console.log(user);
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

export const editListCart = async (id, product) => {
  try {
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
