const knex = require("./knex"); // knex connection

module.exports = {
  // Return all books from db
  getAll() {
    return knex("books");
  },

  // Insert new book into db
  create(book) {
    return knex("books").insert(book, "*");
  },

  // Add book to library
  addBookToLibrary(bookInfo, libraryId) {
    const { book_id, stock } = bookInfo;
    return knex("library_book_references").insert(
      { book_id, stock, library_id: libraryId },
      "*"
    );
  },

  // Return book by given id
  getBook(id) {
    return knex("books").where("id", id).first();
  },

  async getEmptyStockLibraryBooks() {
    const res = await knex("library_book_references").where({ stock: 0 });
    return res;
  },

  // Update book by given id
  update(id, book, libraryId) {
    let query = libraryId
      ? knex("library_book_references")
          .where({ library_id: libraryId, book_id: id })
          .update({ stock: book.stock }, "*")
      : knex("books").where("id", id).update(book, "*");

    return query;
  },

  delete(id, libraryId) {
    let query = libraryId
      ? knex("library_book_references")
          .where({ library_id: libraryId, book_id: id })
          .delete("*") // delete book from library
      : knex("books").where("id", id).delete("*"); //delete book in book repo

    return query;
  },

  // Increment book stock by given book id and library id
  increment(id, libraryId) {
    return knex("library_book_references")
      .where({ library_id: libraryId, book_id: id })
      .update({ stock: knex.raw("stock + 1") }, [
        "library_id",
        "book_id",
        "stock",
      ]);
  },

  // Decrement book stock by given book id and library id
  decrement(id, libraryId) {
    return knex("library_book_references")
      .where({ library_id: libraryId, book_id: id })
      .update({ stock: knex.raw("stock - 1") }, [
        "library_id",
        "book_id",
        "stock",
      ]);
  },

  // Get all books or books per library with pagination
  async getPage(offset, per_page, libraryId) {
    let query = knex("books").select("*").from("books");

    if (libraryId) {
      query = query
        .join(
          "library_book_references",
          "library_book_references.book_id",
          "books.id"
        )
        .where("library_book_references.library_id", libraryId);
    }

    // Get count for pagination based of libraries number of books
    const total = await knex({ joinedTable: query }) // joinedTable is the alias for the query
      .count()

      .first();
    const rows = await query.orderBy("books.id").offset(offset).limit(per_page);

    return { rows, total };
  },
};
