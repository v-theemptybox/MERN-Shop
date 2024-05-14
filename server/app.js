const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");

const PORT = 5000;
const URI =
  "mongodb+srv://vinhnvlfx23170:51gseFhFrmQaXf7v@cluster0.wriqswp.mongodb.net/techShop";

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoute = require("./routes/cart");

const MongoDbStore = require("connect-mongodb-session")(session);

const app = express();
const store = new MongoDbStore({ uri: URI, collection: "sessions" });

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoute);

mongoose.connect(URI).then(() => {
  console.log("MongoDb Connected");
  app.listen(PORT, () => {
    console.log("Server start!");
  });
});
