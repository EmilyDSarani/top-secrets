//we get the information that we need to create a user in UserServices.js which is getting its information from User.js
const { Router } = require('express');
// const User = require('../models/User');
const UserServices = require('../services/UserServices');


module.exports = Router()
  .post('/', async (req, res, next) => {
    try{
      const user = await UserServices.create(req.body);
      res.json(user);
    } catch (error){
      next(error);
    }

  });

