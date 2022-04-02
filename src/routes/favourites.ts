import { Request, Response, Router } from 'express';
import { authRequired } from '../middleware/authRequired';
import { Reaction } from '../model/Reaction';

const router = Router();

router.get('/favourites', authRequired, async (req: Request, res: Response) => {
  try {
    const videos = await Reaction.find({ userId: req.currentUser?.id, reaction: 'like' }).populate(
      'videoId'
    );

    res.render('favourites', { videos, menu: 'menu-authorized.ejs' });
  } catch (err) {
    res.status(500).send({ err });
  }
});

export { router as favouritesRouter };
