import { API } from "./url";

export const getRvById = (product) => API.post("/reviews/getById", { product });

export const addRv = (user, userOther, star, comment, product) =>
  API.post("/reviews/addReview", { user, userOther, star, comment, product });

export const editRv = (star, comment, id, idComment) =>
  API.put("/reviews/editReview", {
    star,
    comment,
    id,
    idComment,
  });

export const deleteComment = (id, idComment) =>
  API.put(`/reviews/deleteComment`, { id, idComment });
