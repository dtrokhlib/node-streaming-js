import request from 'supertest';
import { Application } from '../../app';
import mongoose from 'mongoose';

it('comment add', async () => {
  const appObj = new Application();
  const app = await appObj.start();

  const id = new mongoose.Types.ObjectId();
  const user = await request(app)
    .post('/auth/register')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(200);

  const comment = await request(app)
    .post(`/comments/${id}/add`)
    .set('Cookie', `token=${user.body.token}`)
    .send({
      comment: 'test comment',
    })
    .expect(200);
  console.log(comment.body[0].videoId);
  expect(comment.body[0].comment).toEqual('test comment');
  expect(comment.body[0].userId.id).toEqual(user.body.user.id);
  expect(comment.body[0].videoId).toEqual(id.toString());
});
