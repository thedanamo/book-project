exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments(); // This will be the primary key.
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
