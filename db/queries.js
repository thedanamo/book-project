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
};
