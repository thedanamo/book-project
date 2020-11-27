const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

router.get("/", (req, res) => {
  queries.getAll().then((books) => {
    res.status(200).json(books);
  });
});

module.exports = router;
