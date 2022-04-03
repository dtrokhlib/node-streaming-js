import request from 'supertest';
import { Application } from '../../app';
import mongoose from 'mongoose';
import path from 'path';

it('upload video fail', async () => {
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
    .post('/upload/video')
    .set('Cookie', `token=${user.body.token}`)
    .send({})
    .expect(500);
});

it('upload video success', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  const user = await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  const video = path.resolve(__dirname, './public/video.mp4');
  const image = path.resolve(__dirname, './public/image.jpg');

  await request(app)
    .post('/upload/video')
    .set('Cookie', `token=${user.body.token}`)
    .attach('videoFile', video)
    .attach('placeholderFile', image)
    .field('videoName', 'test')
    .field('videoDescription', 'test')
    .expect(200);
});
