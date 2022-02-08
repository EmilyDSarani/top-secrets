const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/userServices');

//need to import UserService
//need to create dummy user
//need to look at notes as to how to do the user and agent stuff
const mockUser = {
  email: 'this@email.com',
  password: 'iswhack1234'
};
//we set userProps to be an empty object becayse that is what we expect to see 
// const regiAndLogin = async (userProps = {}) => {
//   //then we are saying return the mockUser when the userProps is null
//   const pass = userProps.password ?? mockUser.password;
//   //from UserServices, we will create the mockuser and userprops, deconstruct it and spread it
//   const agent = request.agent(app);
//   const user = await UserService.create({ ...mockUser, ...userProps });

//   //we deconstructed the email off of our mockUser and userProps, now we will pass it in the agent and get the email and pass
//   const { email } = user;
//   await (await agent.post('/api/v1/sessions')).setEncoding({ email, pass });
//   return [agent, user];
// };

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  //creates a new user test goes here
  it('creates new user', async () => {
    const response = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(response.body).toEqual({
      id: expect.any(String),
      email,
    });
  });


});
