const mongoose = require("mongoose");
require("dotenv").config();

const connectURL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.yptfu6i.mongodb.net/?retryWrites=true&w=majority
`;

const connectDB = async () => {
  try {
    await mongoose.connect(connectURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("ConnectDB trueeee!!!!!!!!!!!");
  } catch (error) {
    console.log("ConnectDB Fails!!!!!!!");
  }
};

module.exports = connectDB;
