import request from 'supertest';
import { Application } from '../../app';

it('register validation error', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: '',
    })
    .expect(400);

  await request(app)
    .post('/auth/register')
    .send({
      email: '',
      password: 'test',
    })
    .expect(400);
});

it('register validation error', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  const response = await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  expect(response.body.user.email).toEqual('test@test.com');
  expect(response.body.token).toBeDefined();
});

it('register duplication error', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(400);
});

it('login validation failed', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  await request(app)
    .post('/auth/login')
    .send({
      email: 'test1@test.com',
      password: 'test',
    })
    .expect(404);

  await request(app)
    .post('/auth/login')
    .send({
      email: 'test@test.com',
      password: 'test1',
    })
    .expect(404);
});

it('login validation failed', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  const response = await request(app)
    .post('/auth/login')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  expect(response.body.user.email).toEqual('test@test.com');
  expect(response.body.token).toBeDefined();
});

it('logout validation failed', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  const response = await request(app)
    .post('/auth/register')
    .send({
      email: 'test1@test.com',
      password: 'test1',
    })
    .expect(200);

  await request(app).post('/auth/logout').send().expect(302);
});

it('logout success', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  const response = await request(app)
    .post('/auth/register')
    .send({
      email: 'test1@test.com',
      password: 'test1',
    })
    .expect(200);

  await request(app).post('/auth/logout').set('Cookie', `token=${response.body.token}`).send().expect(200);
});
