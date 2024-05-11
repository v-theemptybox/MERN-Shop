const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 5000;
const URI =
  "mongodb+srv://vinhnvlfx23170:51gseFhFrmQaXf7v@cluster0.wriqswp.mongodb.net/techShop?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URI).then(() => {
  console.log("MongoDb Connected");
  app.listen(PORT, () => {
    console.log("Server start!");
  });
});
