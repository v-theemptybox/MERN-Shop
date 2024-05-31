const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");

const MongoDbStore = require("connect-mongodb-session")(session);

const app = express();
const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
  })
);
app.use(express.json({ limit: "5mb" }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/admin", adminRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDb Connected");
  const server = app.listen(process.env.PORT, () => {
    console.log("Server start!");
  });

  const io = require("socket.io")(server, {
    cors: {
      origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    },
  });

  io.on("connection", (socket) => {
    // console.log("Client connected " + socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      // console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // socket.emit("getId", socket.id);
    socket.on("sendMessage", (data) => {
      io.to(data.socketId).emit("receiveMessage", data);
      io.emit("getRoomId", data.socketId);
    });
  });
});
