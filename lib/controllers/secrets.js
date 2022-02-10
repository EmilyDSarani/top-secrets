const { Router } = require('express');
const aunthen = require('../middleware/aunthen');
const Secret = require('../models/Secret');

//I might need to authorize and aunthenticate users
module.exports = Router()
  .post('/secrets', aunthen, async (req, res, next) => {
    try{
      const secrets = await Secret.create(req.body);
      res.json(secrets);
    } catch (error){
      next(error);
    }
  });

