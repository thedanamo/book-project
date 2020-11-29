const { query } = require("express");
const express = require("express");
const router = express.Router();
const queries = require("../db/libraryQueries");

// Middleware to validate that given id is a number
const isIdNumber = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return next(new Error("Invalid id"));
  }
  return next();
};

router.param("id", isIdNumber);

// Endpoint to return all libraries
router.get("/", (req, res) => {
  queries.getAll().then((libraries) => {
    if (libraries) {
      res.status(200).json(libraries);
    } else {
      res.status(404);
      next(new Error("No libraries in database"));
    }
  });
});

// Endpoint to return a library by given id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  queries.getLibrary(id).then((library) => {
    if (library) {
      res.status(200).json(library);
    } else {
      res.status(404);
      next(new Error("Library with id " + id + " not found"));
    }
  });
});

// TODO: **************************************************************** */
// Endpoint to return libraries with pages information, 16 per page
router.get("/pages/:page", async (req, res) => {
  let { page } = req.params;
  const pagination = {};
  const per_page = 16;
  page = !page || page < 1 ? 1 : page;
  const offset = (page - 1) * per_page;
  try {
    const total = await queries.getCount();
    const rows = await queries.getPage(offset, per_page);

    const count = total.count;
    pagination.total = count;
    pagination.last_page = Math.ceil(count / per_page);
    pagination.data = rows;

    if (pagination.data && pagination.total && pagination.last_page) {
      res.json({
        libraries: pagination.data,
        last_page: pagination.last_page,
        total_count: pagination.total,
      });
    } else {
      res.status(404);
      next(new Error("Error getting libraries."));
    }
  } catch (error) {
    res.status(404);
    next(new Error(error.message));
  }
});

module.exports = router;
