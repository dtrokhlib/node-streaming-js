import { Request, Response, NextFunction } from 'express';
import { User } from '../model/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, IUserDocument } from '../model/interfaces/user.interface';

const authVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies.token) {
      return next();
    }

    const { id } = jwt.verify(
      req.cookies.token,
      process.env.CLIENT_SECRET!
    ) as JwtPayload;

    const user = await User.findById(id);

    if (!user) {
      return next();
    }

    req.currentUser = user;

    next();
  } catch (err) {
    res.status(400).send({ err: 'Token not valid' });
  }
};

export { authVerification };
