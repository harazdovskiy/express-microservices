const { Schema } = require("mongoose");

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

module.exports = require("./index.js").model("User", userSchema);
