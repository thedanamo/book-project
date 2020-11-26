const bookData = require("../bookdata.json");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("books")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("books").insert(bookData);
    });
};
