import { Router, Request, Response } from 'express';
import { authRequired } from '../middleware/authRequired';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const menu = req.currentUser
    ? 'menu-authorized.ejs'
    : 'menu-not-authorized.ejs';

  res.render('home', { menu });
});

router.get('/login', async (req: Request, res: Response) => {
  if (req.currentUser) {
    return res.redirect('/');
  }

  res.render('login', { menu: 'menu-not-authorized.ejs' });
});



router.get('/register', async (req: Request, res: Response) => {
  if (req.currentUser) {
    return res.redirect('/');
  }
  res.render('register', { menu: 'menu-not-authorized.ejs' });
});


router.get('/profile', authRequired, async (req: Request, res: Response) => {
  res.render('profile', { menu: 'menu-authorized.ejs' });
});

router.get('/favourites', authRequired, async (req: Request, res: Response) => {
  res.render('favourites', { menu: 'menu-authorized.ejs' });
});


export { router as defaultRouter };
