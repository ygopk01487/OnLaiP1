import { checkOTP, deleteOTP, getOneUserOTP } from "../api/otp";

export const checkOtp = async ({ otp, email }) => {
  try {
    const { data } = await checkOTP({ otp, email });
    return data;
  } catch (error) {
    console.log("get otp  fail");
  }
};

export const getOneUserOtp = async (email) => {
  try {
    const { data } = await getOneUserOTP(email);
    return data.data._id;
  } catch (error) {
    console.log("get one user otp  fail");
  }
};

export const deleteOtp = async (id) => {
  try {
    const { data } = await deleteOTP(id);
    return data.message;
  } catch (error) {
    console.log("delete otp  fail");
  }
};
