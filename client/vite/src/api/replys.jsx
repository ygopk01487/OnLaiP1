import { API } from "./url";

export const getReplyAll = () => API.get(`/replys/getAllReplys`);

export const getReplyByComment = (idProduct) =>
  API.post(`replys/getByIdComment`, { idProduct });

export const addReply = (
  replyUser,
  replyUserOther,
  receverUser,
  receverUserOther,
  comment,
  idReviewProduct,
  idReviewUser,
  checkReply
) =>
  API.post(`/replys/addReply`, {
    replyUser,
    replyUserOther,
    receverUser,
    receverUserOther,
    comment,
    idReviewProduct,
    idReviewUser,
    checkReply,
  });

export const editReply = (
  id,
  idReply,
  comment,
  textEdit,
  idRv,
  idReviewProduct
) =>
  API.put(`/replys/edtiReply/${id}`, {
    comment,
    textEdit,
    idReply,
    idRv,
    idReviewProduct,
  });

export const removeReply = (id, idReply, idRv) =>
  API.put(`/replys/removeReply/${id}`, { idReply, idRv });

export const addLikeReply = (
  user,
  userOther,
  id,
  idReply,
  like,
  idReviewProduct
) =>
  API.post("/replys/addLikeReply", {
    user,
    userOther,
    id,
    idReply,
    like,
    idReviewProduct,
  });

export const addDislikeReply = (
  user,
  userOther,
  id,
  idReply,
  dislike,
  idReviewProduct
) =>
  API.post(`/replys/addDislikeReply`, {
    user,
    userOther,
    id,
    idReply,
    dislike,
    idReviewProduct,
  });

export const removeLikeReply = (idReply, idLike) =>
  API.put(`/replys/removeLikeReply/${idReply}`, { idLike });

export const removeDislikeReply = (idReply, idDislike) =>
  API.put(`/replys/removeDislikeReply/${idReply}`, { idDislike });
