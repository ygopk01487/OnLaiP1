const nodemailer = require("nodemailer");

const sendMails = ({ email, otp }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      hot: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD_GMAIL,
      },
    });

    var mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: "MÃ CODE",
      text: "Mã code",
      html: `Mã code: ${otp}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
      } else {
        console.log("Mail send successfully");
      }
    });
  } catch (error) {
    console.log("send mail failll!!");
  }
};

module.exports = { sendMails };
