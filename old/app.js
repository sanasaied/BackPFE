const express = require("express");
var app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

// connect to database
mongoose
  .connect(
    "mongodb+srv://root:oumayma404@clst-tinar.rh8rie4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  });

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

const router = require("./src/routes/index.route");
app.use("/api", router);

module.exports = app;
