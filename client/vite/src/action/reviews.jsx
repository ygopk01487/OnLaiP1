import { addRv, deleteComment, editRv, getRvById } from "../api/reviews";

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
