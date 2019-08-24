const { Schema } = require("mongoose");
const {dbConnection} = require("./connections");

const userSchema = new Schema({
  firstName: {
    require: true,
    type: String
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  city: String,
  address: String,
  title: String,
  country: String,
  state_province: String
});

module.exports = dbConnection.model("User", userSchema);
