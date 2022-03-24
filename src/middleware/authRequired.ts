import { Request, Response, NextFunction } from 'express';

const authRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    return res.status(403).send({ err: 'Not Authorized for this action' });
  }

  next();
};

export { authRequired };
