import { Request, Response, Router } from 'express';
import { authRequired } from '../middleware/authRequired';
import { Reaction } from '../model/Reaction';
import { Video } from '../model/Video';

const router = Router();

router.get('/profile', authRequired, async (req: Request, res: Response) => {
  try {
    const videos = await Video.find({ userId: req.currentUser?.id });


    res.render('profile', {
      user: req.currentUser,
      videos: videos || [],
      menu: 'menu-authorized.ejs',
      like: 0,
      dislike: 0
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

export { router as profileRouter };
