const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./api/auth");
let { router: books, emptyBooks } = require("./api/books");

const port = process.env.PORT || 9001;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: true,
  origins: ["*"],
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("assets"));

const verifyToken = (req, res, next) => {
  if (req.path == "/api/auth/login" || req.path == "/") return next();

  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    console.log("bearerHeader", bearerHeader);
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403);
  }
};
app.all("*", verifyToken);

// Auth api
app.use("/api/auth", auth);

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

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    console.log("user disconnected");
  });
});

// 1 Minute Interval to notify users of recent books that went out of stock
setInterval(async () => {
  if (emptyBooks.newEmptyStockBooks.length > 0) {
    await io.emit("receive empty notifications", emptyBooks.newEmptyStockBooks);
    // Reset it to empty since we only want to notify about books that just went to 0 stock
    emptyBooks.newEmptyStockBooks = [];
  }
}, 60000);

// Listen on port 9001
server.listen(port, () => console.log(`listening on port: ${port}`));

module.exports = app;
