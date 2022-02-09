//we bring in User.js here and then we will pass UserServices to users.js
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

  static async signIn({ email, password = '' }){
    try{
      const user = await User.getByEmail(email);
      if(!user) throw new Error('Email is invalid');
      //will need a getter method placed in User.js to allow us to define this
      //REMEMBER user.THE GETTER FUNCTION
      if (!bcryptjs.compareSync(password, user.passwordHash))
        throw new Error ('Password is invalid');
      //spread user since there is no way to JSON it
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error){
      error.status = 401;
      throw error;
    }
  }

};

