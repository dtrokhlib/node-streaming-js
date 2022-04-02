import { Request, Response, Router } from 'express';
import { authRequired } from '../middleware/authRequired';
import { Comment } from '../model/Comments';
import mongoose from 'mongoose';

const router = Router();

router.get(
  '/comments/:id/view',
  authRequired,
  async (req: Request, res: Response) => {
    try {

      const comments = await Comment.find({ videoId: req.params.id }).populate('userId');

      res.send(comments);
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

router.post(
  '/comments/:id/add',
  authRequired,
  async (req: Request, res: Response) => {
    try {
      const comment = req.body.comment;
      const { id } = req.params;

      const newComment = Comment.build({
        userId: req.currentUser?.id,
        videoId: new mongoose.Types.ObjectId(id),
        comment,
      });

      await newComment.save();

      const comments = await Comment.find({ videoId: id }).populate('userId');

      res.send(comments);
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export { router as commentsRouter };
