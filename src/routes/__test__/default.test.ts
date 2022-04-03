import request from 'supertest';
import { Application } from '../../app';

it('home route success', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app).get('/').send().expect(200);
});

it('login route success', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app).get('/login').send().expect(200);
});

it('login route redirect', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  const user = await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  await request(app)
    .get('/login')
    .set('Cookie', `token=${user.body.token}`)
    .send()
    .expect(302);
});

it('register route success', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app).get('/register').send().expect(200);
});

it('register route redirect', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  const user = await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  await request(app)
    .get('/register')
    .set('Cookie', `token=${user.body.token}`)
    .send()
    .expect(302);
});
