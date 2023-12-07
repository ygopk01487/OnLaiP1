import { sendMail } from "../api/sendMail";

export const sendMailss = async ({ email }) => {
  try {
    const data = await sendMail({ email });
    return data.data;
  } catch (error) {
    console.log("send mail fail");
  }
};
