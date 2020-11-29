exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("library_book_references")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("library_book_references").insert([
        { library_id: 1, book_id: 87, stock: 2 },
        { library_id: 1, book_id: 5, stock: 7 },
        { library_id: 1, book_id: 7, stock: 3 },
        { library_id: 1, book_id: 8, stock: 8 },
        { library_id: 1, book_id: 90, stock: 22 },
        { library_id: 1, book_id: 42, stock: 14 },
        { library_id: 1, book_id: 12, stock: 32 },
        { library_id: 2, book_id: 13, stock: 2 },
        { library_id: 2, book_id: 23, stock: 7 },
        { library_id: 2, book_id: 34, stock: 3 },
        { library_id: 2, book_id: 45, stock: 8 },
        { library_id: 2, book_id: 56, stock: 22 },
        { library_id: 2, book_id: 42, stock: 6 },
        { library_id: 2, book_id: 12, stock: 15 },
        { library_id: 3, book_id: 77, stock: 18 },
        { library_id: 3, book_id: 56, stock: 22 },
        { library_id: 3, book_id: 42, stock: 6 },
        { library_id: 3, book_id: 12, stock: 15 },
      ]);
    });
};
