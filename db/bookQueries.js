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

  // Return book by given id
  getBook(id) {
    return knex("books").where("id", id).first();
  },

  // Update book by given id
  update(id, book) {
    return knex("books").where("id", id).update(book, "*");
  },

  delete(id) {
    return knex("books").where("id", id).delete("*");
  },

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
    const rows = await query.offset(offset).limit(per_page);

    return { rows, total };
  },
};
