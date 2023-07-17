const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;
