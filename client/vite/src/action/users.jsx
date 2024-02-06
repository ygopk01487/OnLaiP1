import {
  SignInss,
  checkEmails,
  forgetPassword,
  getOneUser,
  logOuts,
  refreshTokens,
  signUp,
} from "../api/users";

export const SignUps = async ({ data }) => {
  try {
    const datas = await signUp({ data });
  } catch (error) {
    console.log("get api signUp fail");
  }
};

export const forgetPass = async ({ updatePass }) => {
  try {
    const data = await forgetPassword({ updatePass });
  } catch (error) {
    console.log("forget pass fail");
  }
};

export const singIns = async ({ data }) => {
  try {
    const datas = await SignInss({ data });
    return datas.data;
  } catch (error) {
    console.log("login fail !!!");
  }
};

export const checkEmailsss = async ({ email }) => {
  try {
    const { data } = await checkEmails({ email });
    console.log(data);
    return data;
  } catch (error) {
    console.log("check mail fail!!!");
  }
};

export const getByUser = async () => {
  try {
    const datas = await getOneUser();
    return datas.data.user;
  } catch (error) {
    console.log("get by user fail!!!");
  }
};

export const refreshTK = async ({ rfTK }) => {
  try {
    const datas = await refreshTokens({ refreshToken: rfTK });
    return datas.data.accessToken;
  } catch (error) {
    console.log("refresh token fail!!!");
  }
};

export const logOUT = async ({ refreshTks }) => {
  try {
    const data = await logOuts({ refreshTks });
  } catch (error) {
    console.log("log out  fail!!!");
  }
};
