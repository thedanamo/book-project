module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "bookdb",
      user: "thedy",
      password: "wakata",
    },
    //connection: "postgres://localhost/bookdb",
  },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "bookdb",
  //     user: "thedy",
  //     password: "wakata",
  //   },
  // },
};
