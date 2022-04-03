import request from 'supertest';
import { Application } from '../../app';
import path from 'path';
import { Reaction } from '../../model/Reaction';

it('like reaction success', async () => {
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

  console.log(uploadedVideo.body);
  

  await request(app)
    .post(`/reaction/${uploadedVideo.body._id}/like`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  const reaction = await Reaction.findOne({});
  expect(reaction?.reaction).toEqual('like');
});

it('dislike reaction success', async () => {
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
    .post(`/reaction/${uploadedVideo.body._id}/dislike`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  const reaction = await Reaction.findOne({});
  expect(reaction?.reaction).toEqual('dislike');
});

it('reaction deleted success', async () => {
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
    .post(`/reaction/${uploadedVideo.body._id}/dislike`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  await request(app)
    .post(`/reaction/${uploadedVideo.body._id}/dislike`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  const reactionDislike = await Reaction.findOne({});
  expect(reactionDislike).toBe(null);

  await request(app)
    .post(`/reaction/${uploadedVideo.body._id}/like`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  await request(app)
    .post(`/reaction/${uploadedVideo.body._id}/like`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  const reactionLike = await Reaction.findOne({});
  expect(reactionLike).toBe(null);
});

it('reaction replaced success', async () => {
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
    .post(`/reaction/${uploadedVideo.body._id}/dislike`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  const reactionDislike = await Reaction.findOne({});

  await request(app)
    .post(`/reaction/${uploadedVideo.body._id}/like`)
    .set('Cookie', `token=${user.body.token}`)
    .expect(200);

  const reactionLike = await Reaction.findById(reactionDislike?._id);
  expect(reactionLike?.reaction).toEqual('like');
});
