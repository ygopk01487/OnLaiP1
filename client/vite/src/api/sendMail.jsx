import { API } from "./url";

export const sendMail = ({ email }) => API.post(`/user/sendMail`, { email });

