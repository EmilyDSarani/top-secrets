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

  const confidential = await UserService.createSecret({ ...falseSecret });

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
    const { agent, confidential } = await regiAndLogin();
    const secret = await agent.get('/api/v1/users/secrets');
    expect(secret.body).toEqual(
      [{
        ...confidential,
        createdAt: expect.any(String)
      }]
    );
  });

  it.skip('posts a secret for user', async () => {
    const { agent } = await regiAndLogin();
    const postSecret = await agent.post('/api/v1/users/secrets').send(falseSecret);
    expect(postSecret.body).toEqual({
      title: 'Great Question of Life, the Universe and Everything ',
      description: 'Forty-Two',
      createdAt: expect.any(String)
    });
  });

  it.skip('show 401 when signed out', async () => {
    const res = await request(app).get('/api/v1/users');

    expect(res.body).toEqual({
      message: 'Please sign in to view content',
      status: 401,
    });
  });
});
