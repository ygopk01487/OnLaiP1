const mongoose = require("mongoose");
require("dotenv").config();

const connectURL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.yptfu6i.mongodb.net/?retryWrites=true&w=majority
`;

const connectDBB = async () => {
  try {
    await mongoose.connect(connectURL, {});
    console.log("ConnectDB trueeee!!!!!!!!!!!");
  } catch (error) {
    console.log("ConnectDB Fails!!!!!!!");
  }
};

module.exports = connectDBB;
