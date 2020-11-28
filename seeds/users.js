exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "admin", password: "vention9001", name: "Alucard" },
        { username: "mrwick", password: "myd0gg0", name: "John" },
        ,
      ]);
    });
};
