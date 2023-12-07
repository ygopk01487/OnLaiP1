const express = require("express");
const cors = require("cors");
const connectDB = require("././connectDB/connectDB");
const app = express();
const userRouter = require("././router/users");
require("dotenv").config();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello!");
});

app.use("/user", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server running the PORT: ${PORT}`);
});
