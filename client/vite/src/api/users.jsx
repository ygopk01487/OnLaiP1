import { API } from "./url";

export const signUp = ({ data }) => API.post(`/user/addUsers`, data);

export const forgetPassword = ({ updatePass }) =>
  API.post(`/user/updatePass`, updatePass);

export const SignInss = ({ data }) => API.post(`/user/signIn`, data);

export const getOneUser = () => API.get(`/user/getOne`);

export const checkEmails = ({ email }) =>
  API.post(`/user/checkEmail`, { email });

export const refreshTokens = (token) => API.post(`/user/token`, { token });

export const logOuts = (token) => API.delete(`/user/logOut`, { token });
