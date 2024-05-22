const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const PORT = 5000;
const URI =
  "mongodb+srv://vinhnvlfx23170:51gseFhFrmQaXf7v@cluster0.wriqswp.mongodb.net/techShop";

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");

const MongoDbStore = require("connect-mongodb-session")(session);

const app = express();
const store = new MongoDbStore({ uri: URI, collection: "sessions" });

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(express.json({ limit: "5mb" }));
// app.use(express.urlencoded({ limit: "5mb" }));
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

mongoose.connect(URI).then(() => {
  console.log("MongoDb Connected");
  const server = app.listen(PORT, () => {
    console.log("Server start!");
  });
  const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Client connected " + socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      // console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // socket.emit("getId", socket.id);
    socket.on("sendMessage", (data) => {
      // socket.join(data.socketId);
      // console.log(data);
      io.to(data.socketId).emit("receiveMessage", data);
      io.emit("getRoomId", data.socketId);
    });
  });
});
