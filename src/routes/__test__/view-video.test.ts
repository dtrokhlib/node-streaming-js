import request from 'supertest';
import { Application } from '../../app';
import path from 'path';
import mongoose from 'mongoose';
import { Video } from '../../model/Video';

it('view video fail', async () => {
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
    .get(`/video/test/view`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(400);

  const id = new mongoose.Types.ObjectId();

  await request(app)
    .get(`/video/${id}/view`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(400);
});

it('view video success', async () => {
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

  const uploadedVideo = await request(app)
    .post('/upload/video')
    .set('Cookie', `token=${user.body.token}`)
    .attach('videoFile', video)
    .attach('placeholderFile', image)
    .field('videoName', 'test')
    .field('videoDescription', 'test')
    .expect(200);

  await request(app)
    .get(`/video/${uploadedVideo.body._id}/view`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  const videoInfo = await Video.findById(uploadedVideo.body._id);
  expect(videoInfo?.views).toEqual(1);
});
