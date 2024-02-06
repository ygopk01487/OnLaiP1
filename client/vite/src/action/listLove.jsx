import {
  addLove,
  deleteProList,
  getAllList,
  getByUserLiveLove,
} from "../api/listLove";

export const getALl = async () => {
  try {
    const { data } = await getAllList();
    return data.products;
  } catch (error) {
    console.log("get all list love fail");
  }
};

export const addListLove = async (idUserOther, idProduct, user) => {
  try {
    const { data } = await addLove(idUserOther, idProduct, user);
    return data.UpdateListLove || data.newList;
  } catch (error) {
    console.log("add  list love fail");
  }
};

export const removeProLove = async (id, idProduct) => {
  try {
    const { data } = await deleteProList(id, idProduct);
    return data.dataDeleted;
  } catch (error) {
    console.log("remove pro list love fail");
  }
};

export const getByUserLove = async (userOther, user) => {
  try {
    const { data } = await getByUserLiveLove(userOther, user);
    return data.userListLove;
  } catch (error) {
    console.log("get by user list love fail");
  }
};
