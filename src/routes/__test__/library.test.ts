import request from 'supertest';
import { Application } from '../../app';

it('library route success', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  await request(app).get('/library').send().expect(200);
});
