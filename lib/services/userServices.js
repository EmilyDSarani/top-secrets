//we bring in User.js here and then we will pass UserServices to users.js
const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  //need to create a user
  static async create({ email, password })
  {
    //need to bcrypt hash it
    const passHash = await bcryptjs.hash(
      password,
      //need the salt-rounds hidden
      Number(process.env.SALT_ROUNDS)
    );

    //insert what we would need(email and passhash)
    const user = await User.insert({
      email,
      passHash
    });
    return user;
  }



};

