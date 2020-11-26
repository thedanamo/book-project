const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .json(
      "They've done studies you know. Sixty percent of the time it works every time.  "
    );
});

module.exports = router;
