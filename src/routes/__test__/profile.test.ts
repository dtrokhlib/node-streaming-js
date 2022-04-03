import request from 'supertest';
import { Application } from '../../app';

it('profile route redirect', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app).get('/profile').send().expect(302);
});

it('profile route success', async () => {
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
    .get('/profile')
    .set('Cookie', `token=${user.body.token}`)
    .send()
    .expect(200);
});
