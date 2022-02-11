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
const falseSecret = {
  title: 'Great Question of Life, the Universe and Everything ',
  description: 'Forty-Two',
};
// we set userProps to be an empty object becayse that is what we expect to see 
const regiAndLogin = async () => {
  //then we are saying return the mockUser when the userProps is null
  const password = mockUser.password;
  //from UserServices, we will create the mockuser and userprops, deconstruct it and spread it
  //agent holds cookies, request does not
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser });

  //we deconstructed the email off of our mockUser and userProps, now we will pass it in the agent and get the email and pass
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });

  //this was the correct way to do it, forgot to feed it email, but already fixed the test to take in the falseSecret directly
  // const confidential = await UserService.createSecret({ ...falseSecret, userId: user.id, email });
  const confidential = await UserService.createSecret({ ...falseSecret, userId: user.id });
  return { agent, user, confidential };
};

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
  //login user 
  it('logs in a user', async () => {
    //pop out the agent
    const { agent } = await regiAndLogin();
    const sessions = await agent.post('/api/v1/users/sessions').send(mockUser);

    expect(sessions.body).toEqual({
      message: 'Signed in!'
    });
  });

  it('gets secrets for logged in user', async () => {
    const { agent } = await regiAndLogin();
    await agent.post('/api/v1/secrets').send(falseSecret);
    const secret = await agent.get('/api/v1/secrets');
    expect(secret.body).toEqual(
      [{
        secretId: expect.any(String),
        ...falseSecret,
        createdAt: expect.any(String),
        userId: expect.any(String),
      }]
    );
  });

  it('posts a secret for user', async () => {
    const { agent } = await regiAndLogin();
    const postSecret = await agent.post('/api/v1/secrets').send(falseSecret);
    expect(postSecret.body).toEqual({
      secretId: expect.any(String),
      title: 'Great Question of Life, the Universe and Everything ',
      description: 'Forty-Two',
      createdAt: expect.any(String),
      userId: expect.any(String),
    });
  });

  it('show signed out message', async () => {
    const { agent } = await regiAndLogin();
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.body.message).toEqual('Signed out!');
  });
});
