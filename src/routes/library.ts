import { Router, Request, Response } from 'express';
import { Video } from '../model/Video';

const router = Router();

router.get('/library', async (req: Request, res: Response) => {
  const menu = req.currentUser
    ? 'menu-authorized.ejs'
    : 'menu-not-authorized.ejs';

  let skip = 0;

  if (req.query.skip) {
    skip = Number(req.query.skip) * 6;
  }

  const videos1 = await Video.find().sort('-createdAt').limit(3).skip(skip);
  const videos2 = await Video.find()
    .sort('-createdAt')
    .limit(3)
    .skip(skip + 3);

  const count = await Video.count();
  
  res.render('library', {
    menu,
    videos1,
    videos2,
    count: Math.floor(count / 6) + 1,
    skip: req.query.skip || skip,
  });
});

export { router as libraryRouter };
