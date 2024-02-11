const express = require("express");
const cors = require("cors");
const connectDB = require("././connectDB/connectDB");
const app = express();
const userRouter = require("././router/users");
const productsRouter = require("./router/products");
const usersOtherRouter = require("./router/usersother");
const listLoveRouter = require("./router/listLove");
const cartRouter = require("./router/listCart");
require("dotenv").config();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello!");
});

app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/userOther", usersOtherRouter);
app.use("/listLove", listLoveRouter);
app.use("/listCart", cartRouter);

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server running the PORT: ${PORT}`);
});
