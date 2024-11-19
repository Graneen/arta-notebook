module.exports = {
  development: {
    username: "root",
    password: "1234MYSQL",
    database: "notebook_db",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "admin",
    password: "1234",
    database: "notebook_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "admin",
    password: "1234",
    database: "notebook_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
