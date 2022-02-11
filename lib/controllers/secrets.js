const { Router } = require('express');
const aunthen = require('../middleware/aunthen');
const Secret = require('../models/Secret');
const UserService = require('../services/UserServices');

//I might need to authorize and aunthenticate users

module.exports = Router()
  .post('/', aunthen, async (req, res, next) => {
    try{
      const secrets = await UserService.createSecret({ title: req.body.title, description: req.body.description, email: req.user.email });
      res.json(secrets);
    } catch (error){
      next(error);
    }
  })
  .get('/', aunthen,  async (req, res, next) => {
    try{
      const secrets = await Secret.getAll();
      //this is coming from the payload, which is in authen
      res.send(secrets);
    } catch (error){
      next(error);
    }
  });
