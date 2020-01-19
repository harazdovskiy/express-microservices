const db = require("./connections");
const Sequelize = require("sequelize");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  state_province: {
    type: Sequelize.STRING
  }
});

module.exports = User;
