const express = require("express");
const router = express.Router();
const queries = require("../db/bookQueries");

// TODO: use BCRYPT

// Checks if user object has required username, password, and name
const isValidUser = (user) => {
  const hasUsername =
    typeof user.username == "string" && user.username.trim().length !== 0;
  const hasPassword =
    typeof user.password == "string" && user.password.trim().length !== 0;
  const hasName = typeof user.name == "string" && user.name.trim().length !== 0;

  return hasUsername && hasPassword && hasName;
};

// Endpoint to create user
router.post("/", (req, res, next) => {
  const newUser = req.body;
  if (isValidUser(newUser)) {
    queries.create(newUser).then((users) => {
      res.status(201).json(users[0]);
    });
  } else {
    res.status(400);
    next(new Error("Invalid user object"));
  }
});

// Endpoint to return a user by given username
router.get("/:username", (req, res, next) => {
  const { username } = req.params;

  // TODO: Validate correct password is given will go here || add middleware?

  queries.get(username).then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      next(new Error("User with username " + username + " not found"));
    }
  });
});

// Endpoint to find and update user with given username in the db
router.put("/:username", (req, res, next) => {
  const { username } = req.params;
  const user = req.body;

  // TODO: Validate this user is logged in

  if (isValidUser(user)) {
    queries.update(username, user).then((users) => {
      res.json(users[0]);
    });
  } else {
    res.status(400);
    next(new Error("Invalid user object"));
  }
});

module.exports = router;
