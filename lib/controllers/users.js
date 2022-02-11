//we get the information that we need to create a user in UserServices.js which is getting its information from User.js
const { Router } = require('express');
const UserService = require('../services/UserServices');



//miliseconds
const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try{
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error){
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try{
      const { email, password } = req.body;
      
      const sessToken = await UserService.signIn({ email, password });
      res
        .cookie(process.env.COOKIE_NAME, sessToken, {
          httpOnly: true,
          maxAge: ONE_DAY,
        })
        .json({
          message: 'Signed in!'
        });
    } catch (error){
      next(error);
    }
  })
  // .post('/secrets', async (req, res, next) => {
  //   try{
  //     const { title, description, createdAt } = req.body;
      
  //     const sessToken = await UserService.signIn({ title, description, createdAt });
  //     res
  //       .cookie(process.env.COOKIE_NAME, sessToken, {
  //         httpOnly: true,
  //         maxAge: ONE_DAY,
  //       })
  //       .json({
  //         message: 'Signed in!'
  //       });
  //   } catch (error){
  //     next(error);
  //   }
  // })
  .delete('/sessions', (req, res, next) => {
    try{
      res
        .clearCookie(process.env.COOKIE_NAME)
        .json({  
          message: 'Signed out!' });
    } catch (error){
      next(error);
    }
  });

