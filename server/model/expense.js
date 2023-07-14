const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Expense = sequelize.define("transactions", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Expense;
