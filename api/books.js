const express = require("express");
const router = express.Router();
const queries = require("../db/bookQueries");

const emptyArrayAccess = () => {
  let newEmptyStockBooks = [];

  return { newEmptyStockBooks };
};

const emptyBooks = emptyArrayAccess();

// Finds and adds book to newEmptyStockBooks list
const addEmptyBookToList = async (id) => {
  try {
    const book = await queries.getBook(id);
    if (book) {
      emptyBooks.newEmptyStockBooks.push(book);
    } else {
      throw new Error("Book with id " + id + " not found");
    }
  } catch (error) {
    throw error;
  }
};

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
router.get("/", async (req, res) => {
  try {
    const books = await queries.getAll();
    res.json(books);
  } catch (error) {
    const err = new Error(error.message);
    err.status(500);
    next(err);
  }
});

// Endpoint to add book to db
router.post("/", async (req, res, next) => {
  const givenBook = req.body;
  if (isValidBook(givenBook)) {
    try {
      const books = await queries.create(givenBook);
      res.status(201).json(books[0]);
    } catch (error) {
      const err = new Error(error.message);
      err.status(500);
      next(err);
    }
  } else {
    const err = new Error("Invalid book object");
    err.status(400);
    next(err);
  }
});

// Endpoint to add book to library
router.post("/add", async (req, res, next) => {
  const { id, stock } = req.body;
  const { libraryId } = req.query;
  if (id && libraryId) {
    try {
      stock = stock ? stock : 1;
      const library_books = await queries.addBookToLibrary(
        { id, stock },
        libraryId
      );
      res.status(201).json(library_books[0]);
    } catch (error) {
      const err = new Error(error.message);
      err.status(500);
      next(err);
    }
  } else {
    const err = new Error("Invalid book info");
    err.status(400);
    next(err);
  }
});

// Endpoint to return a book by given id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await queries.getBook(id);
    if (book) {
      res.json(book);
    } else {
      const err = new Error("Book with id " + id + " not found");
      err.status(404);
      next(err);
    }
  } catch (error) {
    const err = new Error(error.message);
    err.status(500);
    next(err);
  }
});

// Endpoint to find and update book with given id in the db
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { libraryId } = req.query;
  const updateBook = req.body;

  try {
    if (isValidBook(updateBook)) {
      const book = await queries.update(id, updateBook, libraryId);
      res.json(books[0]);

      if (books[0].stock === 0) {
        await addEmptyBookToList(id);
      }
    } else {
      res.status(400);
      next(new Error("Invalid book object"));
    }
  } catch (error) {
    const err = new Error(error.message);
    err.status(500);
    next(err);
  }
});

// Endpoint to delete book with given id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { libraryId } = req.query;
  try {
    if (libraryId) {
      const library_books = await queries.delete(id, libraryId);
      if (library_books) {
        res.json(library_books);
      } else {
        const err = new Error("Error deleting book from library");
        err.status(404);
        next(err);
      }
    } else {
      const books = await queries.delete(id);
      if (books) {
        res.json(books);
      } else {
        res.status(404);
        next(new Error("No books in database"));
      }
    }
  } catch (error) {
    const err = new Error(error.message);
    err.status(500);
    next(err);
  }
});

// Endpoint to increment stock of book with given id
router.put("/increment/:id", async (req, res, next) => {
  const { id } = req.params;
  const { libraryId } = req.query;
  try {
    const library_books = await queries.increment(id, libraryId);
    res.json(library_books[0]);
  } catch (err) {
    res.status(500);
    next(new Error(err.message));
  }
});

// Endpoint to decrement stock of book with given id
router.put("/decrement/:id", async (req, res, next) => {
  const { id } = req.params;
  const { libraryId } = req.query;
  try {
    const library_books = await queries.decrement(id, libraryId);
    res.json(library_books[0]);
    if (library_books[0].stock === 0) {
      await addEmptyBookToList(id);
    }
  } catch (err) {
    res.status(500);
    next(new Error(err.message));
  }
});

// Endpoint to return books with pages information, 16 per page
router.get("/pages/:page", async (req, res, next) => {
  let { page } = req.params;
  const { library } = req.query;
  const pagination = {};
  const per_page = 16;
  page = !page || page < 1 ? 1 : page;
  const offset = (page - 1) * per_page;

  try {
    const { total, rows } = await queries.getPage(offset, per_page, library);

    const count = total.count;
    pagination.total = count;
    pagination.last_page = Math.ceil(count / per_page);
    pagination.data = rows;

    if (pagination.data && pagination.total && pagination.last_page) {
      res.json({
        books: pagination.data,
        last_page: pagination.last_page,
        total_count: pagination.total,
      });
    } else {
      res.status(404);
      next(new Error("Error getting books."));
    }
  } catch (error) {
    res.status(404);
    next(new Error(error.message));
  }
});

module.exports = { router, emptyBooks };
