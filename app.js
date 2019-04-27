var createError = require("http-errors");
var express = require("express");
var engine = require("ejs-mate");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mysql = require("mysql");
var connection = require("./models/index");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to database");
  var createuserData = `create table if not exists userData(
                          userName varchar(25) NOT Null,
                          emailId varchar(50) primary key,
                          phoneNo varchar(10) Not Null,
                          password varchar(50) Not Null,
                          dateTime Timestamp Not Null
                      )`;

  connection.query(createuserData, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log("Table created");
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
// app.listen(port);
// console.log("Server listening to port", port);

module.exports = app;
