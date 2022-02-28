const express = require("express");
const app = express();
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors");
const bodyParser = require("body-parser");

//cookie and session
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "PATCH", , "DELETE", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

const userManage = require("./router");

app.use("/api", userManage);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.send(err);
});

// connect to mongodb atles
mongoose
  .connect("mongodb://localhost:27017/userAdmin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("databse connected  sucesssufully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => console.log("server connected"));
