import { Router, Request, Response } from 'express';
import { authRequired } from '../middleware/authRequired';
import { Reaction } from '../model/Reaction';
import mongoose from 'mongoose';

const router = Router();

router.post(
  '/reaction/:id/like',
  authRequired,
  async (req: Request, res: Response) => {
    try {
      const { id: videoId } = req.params;
      const userId = req.currentUser?.id;

      const reaction = await Reaction.findOne({
        userId,
        videoId,
      });

      if (reaction) {
        switch (reaction.reaction) {
          case 'like': {
            await reaction.delete();
            break;
          }
          case 'dislike': {
            reaction.reaction = 'like';
            await reaction.save();
            break;
          }
        }
        return res.send(reaction);
      }

      const newReaction = Reaction.build({
        userId,
        videoId: new mongoose.Types.ObjectId(videoId),
        reaction: 'like',
      });

      await newReaction.save();

      res.send(reaction);
    } catch (err) {}
  }
);

router.post(
  '/reaction/:id/dislike',
  authRequired,
  async (req: Request, res: Response) => {
    const { id: videoId } = req.params;
    const userId = req.currentUser?.id;

    const reaction = await Reaction.findOne({
      userId,
      videoId,
    });

    if (reaction) {
      switch (reaction.reaction) {
        case 'dislike': {
          await reaction.delete();
          break;
        }
        case 'like': {
          reaction.reaction = 'dislike';
          await reaction.save();
          break;
        }
      }
      return res.send(reaction);
    }

    const newReaction = Reaction.build({
      userId,
      videoId: new mongoose.Types.ObjectId(videoId),
      reaction: 'dislike',
    });

    await newReaction.save();

    res.send(reaction);
  }
);

export { router as reactionRouter };
