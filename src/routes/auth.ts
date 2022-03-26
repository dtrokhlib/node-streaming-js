import { Router, Response, Request } from 'express';
import { User } from '../model/User';
import bcrypt from 'bcrypt';
import { authRequired } from '../middleware/authRequired';
import { IUserDocument } from '../model/interfaces/user.interface';

const router = Router();

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'Not valid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).send({ message: 'Not valid credentials' });
    }

    const token = await User.token(user.id);
    user.tokens!.push({ token });

    await user.save();

    res.cookie('token', token);
    res.send({ user, token });
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and Password should be not empty' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Email was already taken' });
    }

    const newUser = User.build({ email, password });
    const token = await User.token(newUser.id);
    newUser.tokens.push({ token });
    await newUser.save();

    res.cookie('token', token);
    res.send({ user: newUser, token });
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.post(
  '/auth/logout',
  authRequired,
  async (req: Request, res: Response) => {
    try {
      if (!req.currentUser) {
        return res.status(400).send({ err: 'No session found' });
      }

      res.clearCookie('token');

      const user = await User.findById(req.currentUser.id);

      if (!user) {
        return res.status(404).send({ err: 'User not found' });
      }

      if (!user.tokens) {
        return res.status(400).send({ err: 'User has 0 active sessions' });
      }

      const liveTokens = user.tokens.filter(
        (elem) => elem.token !== req.cookies.token
      );

      user.tokens = liveTokens;

      await user.save();
      res.render('home', { menu: 'menu-not-authorized.ejs' });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export { router as userRouter };

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserDocument;
    }
  }
}
