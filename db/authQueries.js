const knex = require("./knex"); // knex connection

module.exports = {
  // Return user by given username
  get(username) {
    return knex("users").where("username", username).first();
  },
};
