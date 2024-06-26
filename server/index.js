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
const replyComments = require("./router/replys");

const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

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
app.use("/replys", replyComments);

const PORT = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://bansach.netlify.app",
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

  socket.on("loadReply", (data, idRvs) => {
    io.emit("load_Reply", data.data, idRvs);
  });
});

server.listen(PORT, (req, res) => {
  connectDBB();
  console.log(`Server running the PORT: ${PORT}`);
});

module.exports = app;
