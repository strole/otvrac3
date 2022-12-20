var createError = require("http-errors");
var mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
const { MongoKerberosError } = require("mongodb");
const { stringify } = require("querystring");
const { StringDecoder } = require("string_decoder");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const m2s = require("mongoose-to-swagger");
const Boat = require("./model/Boat");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Boats",
      version: "1.0.0",
      descripton: "OR 3 labos",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/", indexRouter);
app.use("/boats", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5557, () => {
  console.log("Server started on port 5557");
});

module.exports = app;
