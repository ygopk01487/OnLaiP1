import { API } from "./url";

export const addUserOther = (data) =>
  API.post("/userOther/addUserOther", {
    name: data.displayName,
    email: data.email,
    image: data.photoUrl,
    localId: data.localId,
  });

export const getById = (localId) =>
  API.post("/userOther/getByIdUsersOther", { localId });
