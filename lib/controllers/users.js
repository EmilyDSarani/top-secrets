//we get the information that we need to create a user in UserServices.js which is getting its information from User.js
const { Router, response } = require('express');
const UserService = require('../services/UserServices');
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
  })
  .post('/sessions', async (req, res, next) => {
    try{
      const { email, password } = req.body;
      const sessToken = await UserService.signIn({ email, password });
      response
        .cookie(process.env.COOKIE_NAME, sessToken, {
          httpOnly: true,
          //   maxAge
        })
        .json({
          message: 'Signed in!'
        });
    } catch (error){
      next(error);
    }
  });

