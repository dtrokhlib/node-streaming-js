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
    if (!req.headers.authorization) {
      return next();
    }
    const token = req.headers.authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.CLIENT_SECRET!) as JwtPayload;

    const user = await User.findById(id);

    if (!user) {
      return next();
    }

    req.currentUser = user;
    req.token = token;

    next();
  } catch (err) {
    res.status(400).send({ err: 'Token not valid' });
  }
};

export { authVerification };

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserDocument;
      token: string;
    }
  }
}
