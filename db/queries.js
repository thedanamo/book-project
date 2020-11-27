const knex = require("./knex"); // knex connection

module.exports = {
  getAll() {
    return knex("books");
  },
};
