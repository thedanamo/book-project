exports.up = function (knex) {
  return knex.schema.createTable("libraries", (table) => {
    table.increments(); // This will be the primary key.
    table.string("name").notNullable();
    table.string("city");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("libraries");
};
