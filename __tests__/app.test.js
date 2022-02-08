const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

//need to import UserService
//need to create dummy user
//need to look at notes as to how to do the user and agent stuff


describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  //creates a new user test goes here



});
