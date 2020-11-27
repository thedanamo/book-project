const knex = require("./knex"); // knex connection

module.exports = {
  // Return all books from db
  getAll() {
    return knex("books");
  },

  // Return book by given id
  getBook(id) {
    return knex("books").where("id", id).first();
  },
};
