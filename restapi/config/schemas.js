"use strict";

// Third-party dependencies.
const mongoose = require("mongoose");

// Setting up the environment.
mongoose.connect("mongodb://localhost/rest-tutorial");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

const userModel = mongoose.model("Users", userSchema);

const createUser = newUserData => {
  const newUser = new User(newUserData);
  return newUser.save();
};

const findUserById = id => {
  return User.findById(id).then(res => {
    res = res.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

module.exports = {
  createUser: createUser
};
