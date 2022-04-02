import request from 'supertest';
import { Application } from '../../app';



it('auth', async () => {
const appObj = new Application();
const app = await appObj.startTest();

  const response = await request(app)
    .post('/auth/login')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);
});
