import request from 'supertest';
import { Application } from '../../app';

it('favourites route redirect', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app).get('/favourites').send().expect(302);
});

it('favourites route success', async () => {
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
    .get('/favourites')
    .set('Cookie', `token=${user.body.token}`)
    .send()
    .expect(200);
});
