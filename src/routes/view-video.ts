import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { authRequired } from '../middleware/authRequired';
import { upload } from '../middleware/multer';
import { IVideo } from '../model/interfaces/video.interface';
import { Reaction } from '../model/Reaction';
import { Video } from '../model/Video';

const router = Router();

router.get(
  '/video/:id/view',
  authRequired,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .send({ err: 'Not valid video id specified in the URL' });
      }

      const video = await Video.findById(id);

      if (!video) {
        return res.status(400).send({ err: 'Video Id is not exist' });
      }

      video.views! += 1;
      await video.save();

      const reaction = await Reaction.find({ videoId: id });
      const userReaction = await Reaction.findOne({
        userId: req.currentUser?.id,
      });

      const like = reaction.filter((item) => item.reaction == 'like');
      const dislike = reaction.filter((item) => item.reaction == 'dislike');

      res.render('video-page-view', {
        video,
        reaction: {
          like: like || [],
          dislike: dislike || [],
          userReaction: userReaction?.reaction || '',
        },
        menu: 'menu-authorized.ejs',
      });
    } catch (err) {
      res
        .status(500)
        .send('Internal server error during fetching video record');
    }
  }
);

export { router as viewVideoRouter };
