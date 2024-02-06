import { addUserOther, getById } from "../api/usersOther";

export const addUserOthers = async (data) => {
  try {
    await addUserOther(data);
  } catch (error) {
    console.log("add fail user other client");
  }
};

export const getByIdUserOther = async (localId) => {
  try {
    const { data } = await getById(localId);
    return data.userOtherId;
  } catch (error) {
    console.log("get by id user other client fail");
  }
};

