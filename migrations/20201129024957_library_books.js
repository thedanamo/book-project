exports.up = function (knex) {
  return knex.schema.createTable("library_book_references", (table) => {
    table
      .integer("book_id")
      .references("books.id")
      .onUpdate("CASCADE") // if Article primary key is changed, update this foreign key.
      .onDelete("CASCADE"); // if referenced Article is deleted, delete this Comment.;
    table
      .integer("library_id")
      .references("libraries.id")
      .onUpdate("CASCADE") // if Article primary key is changed, update this foreign key.
      .onDelete("CASCADE"); // if referenced Article is deleted, delete this Comment.;
    table.integer("stock").nullable(false);
    table.unique(["book_id", "library_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("library_book_references");
};
