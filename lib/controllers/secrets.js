const { Router } = require('express');
const aunthen = require('../middleware/aunthen');
const UserService = require('../services/UserServices');

//I might need to authorize and aunthenticate users

module.exports = Router()
  .post('/secrets', aunthen, async (req, res, next) => {
    try{
      const secrets = await UserService.createSecret(req.body);
      res.json(secrets);
    } catch (error){
      next(error);
    }
  })
  .get('/secrets', aunthen,  async (req, res, next) => {
    try{
    //this is coming from the payload, which is in authen
      res.send(req.user);
    } catch (error){
      next(error);
    }
  });
