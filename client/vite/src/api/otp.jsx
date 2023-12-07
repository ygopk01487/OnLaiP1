import { API } from "./url";

export const checkOTP = ({ otp, email }) =>
  API.post(`/user/checkOTP`, { otp, email });

export const getOneUserOTP = ({ email }) =>
  API.post(`/user/getOneUserOTP`, { email });

export const deleteOTP = ({ id }) => API.put(`/user/deleteOtp/${id}`);
