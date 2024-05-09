const express = require("express");
const cors = require("cors");
const connectDBB = require("././connectDB/connectDB");
const app = express();
const userRouter = require("././router/users");
const productsRouter = require("./router/products");
const usersOtherRouter = require("./router/usersother");
const listLoveRouter = require("./router/listLove");
const cartRouter = require("./router/listCart");
const reviewRouter = require("./router/reviews");
const ordersProducts = require("./router/order");

const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

connectDBB();

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
app.use("/reviews", reviewRouter);
app.use("/orders", ordersProducts);

const PORT = process.env.PORT;

const server = http.createServer(app);

const io = new Server("https://storebook-api.vercel.app", {
  cors: {
    origin: "https://storebook-client.vercel.app",
  },
});

io.on("connection", (socket) => {
  // console.log("user socket id", socket.id);
  socket.on("comment", (data) => {
    io.emit("new_comment", data);
  });

  socket.on("loadCart", (data) => {
    io.emit("load", data);
  });
});

server.listen(PORT, (req, res) => {
  console.log(`Server running the PORT: ${PORT}`);
});

module.exports = app;
