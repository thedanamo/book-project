const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const auth = require("./api/auth");
const books = require("./api/books");

const port = process.env.PORT || 9001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("assets"));
// Auth api
app.use("/api/auth", auth);

// ADD MIDDLWARE TO CHECK IF USER LOGGED IN

// Book api
app.use("/api/books", books);

// 404 error and send to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
  console.log("ERROR: ", err.status, err.message);
});

// Listen on port 9001
app.listen(port, () => console.log(`listening on port: ${port}`));

module.exports = app;
