const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const forgetPasswordRequests = sequelize.define("resetRequests", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = forgetPasswordRequests;
