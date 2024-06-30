import {
  addDislikeReply,
  addLikeReply,
  addReply,
  editReply,
  getReplyAll,
  getReplyByComment,
  removeDislikeReply,
  removeLikeReply,
  removeReply,
} from "../api/replys";

export const getReplysAlls = async () => {
  try {
    const { data } = await getReplyAll();
    return data.data;
  } catch (error) {
    console.log("get reply alll fail");
  }
};

export const getReplysByComment = async (idProduct) => {
  try {
    const { data } = await getReplyByComment(idProduct);
    return data.data;
  } catch (error) {
    console.log("get reply by commment fail");
  }
};

export const addReplys = async (
  replyUser,
  replyUserOther,
  receverUser,
  receverUserOther,
  comment,
  idReviewProduct,
  idReviewUser,
  checkReply
) => {
  try {
    const { data } = await addReply(
      replyUser,
      replyUserOther,
      receverUser,
      receverUserOther,
      comment,
      idReviewProduct,
      idReviewUser,
      checkReply
    );
    return data;
  } catch (error) {
    console.log("add reply fail");
  }
};

export const editReplys = async (
  id,
  idReply,
  comment,
  textEdit,
  idRv,
  idReviewProduct
) => {
  try {
    const { data } = await editReply(
      id,
      idReply,
      comment,
      textEdit,
      idRv,
      idReviewProduct
    );
    return data;
  } catch (error) {
    console.log("edit reply fail");
  }
};

export const removeReplys = async (id, idReply, idRv) => {
  try {
    const { data } = await removeReply(id, idReply, idRv);
    return data;
  } catch (error) {
    console.log("remove reply fail");
  }
};

export const addLikeReplys = async (
  user,
  userOther,
  id,
  idReply,
  like,
  idReviewProduct
) => {
  try {
    const { data } = await addLikeReply(
      user,
      userOther,
      id,
      idReply,
      like,
      idReviewProduct
    );
    return data;
  } catch (error) {
    console.log("add  like reply  fail");
  }
};

export const addDislikeReplys = async (
  user,
  userOther,
  id,
  idReply,
  dislike,
  idReviewProduct
) => {
  try {
    const { data } = await addDislikeReply(
      user,
      userOther,
      id,
      idReply,
      dislike,
      idReviewProduct
    );
    return data;
  } catch (error) {
    console.log("add dislike reply fail");
  }
};

export const removeLikeReplys = async (idReply, idLike) => {
  try {
    const { data } = await removeLikeReply(idReply, idLike);
    return data;
  } catch (error) {
    console.log("remove like reply fail");
  }
};

export const removeDislikeReplys = async (idReply, idDislike) => {
  try {
    const { data } = await removeDislikeReply(idReply, idDislike);
    return data;
  } catch (error) {
    console.log("remove dislike reply fail");
  }
};
