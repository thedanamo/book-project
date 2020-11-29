const knex = require("./knex"); // knex connection

module.exports = {
  // Return all libraries from db
  getAll() {
    return knex("libraries");
  },

  // Return library by given id
  getLibrary(id) {
    return knex("libraries").where("id", id).first();
  },

  // Update library by given id
  update(id, library) {
    return knex("libraries").where("id", id).update(library, "*");
  },

  // Get count for pagination
  getCount() {
    return knex("libraries").count("* as count").from("libraries").first();
  },

  // For pagination incase there are many libraries
  getPage(offset, per_page) {
    return knex("libraries")
      .select("*")
      .from("libraries")
      .offset(offset)
      .limit(per_page);
  },
};
