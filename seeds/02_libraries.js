exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("libraries")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("libraries").insert([
        { name: "St.Do Brary", city: "Laval" },
        { name: "Westmount", city: "Montreal" },
        { name: "Concordia LB", city: "Montreal" },
      ]);
    });
};
