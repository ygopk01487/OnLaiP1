const generateOTP = () => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    return otp;
  } catch (error) {
    console.log("return otp fail!!");
  }
};

module.exports = { generateOTP };
