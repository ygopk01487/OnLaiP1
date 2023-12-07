import { checkOTP, deleteOTP, getOneUserOTP } from "../api/otp";

export const checkOtp = async ({ otp, email }) => {
  try {
    const { data } = await checkOTP({ otp, email });
    return data;
  } catch (error) {
    console.log("get otp  fail");
  }
};

export const getOneUserOtp = async ({ id }) => {
  try {
    const { data } = await getOneUserOTP({ id });
    return data.data.id;
  } catch (error) {
    console.log("get one user otp  fail");
  }
};

export const deleteOtp = async ({ email }) => {
  try {
    const { data } = await deleteOTP({ email });
    return data.message;
  } catch (error) {
    console.log("delete otp  fail");
  }
};
