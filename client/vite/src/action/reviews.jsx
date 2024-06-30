import {
  addDisLike,
  addLike,
  addRv,
  deleteComment,
  editRv,
  getRvById,
  removeDisLike,
  removeLike,
} from "../api/reviews";

export const getReviewById = async (product) => {
  try {
    const { data } = await getRvById(product);
    return data;
  } catch (error) {
    console.log("get review by id fail");
  }
};

export const addReview = async (user, userOther, star, comment, product) => {
  try {
    const { data } = await addRv(user, userOther, star, comment, product);
    return data.new || data.push;
  } catch (error) {
    console.log("get review by id fail");
  }
};

export const editReview = async (star, comment, id, idComment) => {
  try {
    const { data } = await editRv(star, comment, id, idComment);
    return data.editReview;
  } catch (error) {
    console.log("get review by id fail");
  }
};

export const deleteCm = async (id, idComment) => {
  try {
    const { data } = await deleteComment(id, idComment);
    return data.deleteComment;
  } catch (error) {
    console.log("get review by id fail");
  }
};

export const addLikes = async (user, userOther, id, idCm, like) => {
  try {
    const { data } = await addLike(user, userOther, id, idCm, like);
    return data.data;
  } catch (error) {
    console.log("add like fail");
  }
};

export const addDisLikes = async (user, userOther, id, idCm, disLikes) => {
  try {
    const { data } = await addDisLike(user, userOther, id, idCm, disLikes);
    return data.data;
  } catch (error) {
    console.log("add dis like fail");
  }
};

export const removeLikes = async (idCm, idLike) => {
  try {
    const { data } = await removeLike(idCm, idLike);
    return data;
  } catch (error) {
    console.log("remove like fail");
  }
};

export const removeDislikes = async (idCm, idDisLike) => {
  try {
    const { data } = await removeDisLike(idCm, idDisLike);
    return data;
  } catch (error) {
    console.log("remvoew dis liek ffail");
  }
};
