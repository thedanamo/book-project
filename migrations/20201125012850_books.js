exports.up = function (knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments(); // This will be the primary key.
    table.string("author");
    table.string("country");
    table.string("imageLink");
    table.string("language");
    table.string("link");
    table.integer("pages");
    table.string("title").notNullable();
    table.integer("year");
    table.integer("stock"); // Setting default if null for testing
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("books");
};
