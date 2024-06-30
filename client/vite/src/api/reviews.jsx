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

export const addLike = (user, userOther, id, idCm, like) =>
  API.post(`/reviews/addLikes`, { user, userOther, id, idCm, like });

export const addDisLike = (user, userOther, id, idCm, disLikes) =>
  API.post(`/reviews/addDislikes`, { user, userOther, id, idCm, disLikes });

export const removeLike = (idCm, idLike) =>
  API.put(`/reviews/deleteLike/${idCm}`, { idLike });

export const removeDisLike = (idCm, idDisLike) =>
  API.put(`/reviews/deleteDislike/${idCm}`, { idDisLike });
