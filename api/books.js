const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

// Middleware to validate that given id is a number
const isIdNumber = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return next(new Error("Invalid id"));
  }
  return next();
};

// Checks if given book has required field, title
const isValidBook = (book) => {
  const hasTitle =
    typeof book.title == "string" && book.title.trim().length !== 0;
  return hasTitle;
};

router.param("id", isIdNumber);

// Endpoint to return all books
router.get("/", (req, res) => {
  queries.getAll().then((books) => {
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404);
      next(new Error("No books in database"));
    }
  });
});

// Endpoint to add book to db
router.post("/", (req, res, next) => {
  const givenBook = req.body;
  if (isValidBook(givenBook)) {
    queries.create(givenBook).then((books) => {
      res.status(201).json(books[0]);
    });
  } else {
    res.status(400);
    next(new Error("Invalid book object"));
  }
});

// Endpoint to return a book by given id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  queries.getBook(id).then((book) => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404);
      next(new Error("Book with id " + id + " not found"));
    }
  });
});

// Endpoint to find and update book with given id in the db
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const updateBook = req.body;
  if (isValidBook(updateBook)) {
    queries.update(id, updateBook).then((books) => {
      res.json(books[0]);
    });
  } else {
    res.status(400);
    next(new Error("Invalid book object"));
  }
});

// Endpoint to delete book with given id
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  queries.delete(id).then((books) => {
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404);
      next(new Error("No books in database"));
    }
  });
});

module.exports = router;
