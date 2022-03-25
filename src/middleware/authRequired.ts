import { Request, Response, NextFunction } from 'express';

const authRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser || !req.currentUser.tokens) {
    return res.status(403).send({ err: 'Not Authorized for this action' });
  }

  const liveTokens = req.currentUser.tokens.filter(
    (elem) => elem.token == req.token
  );

    console.log(req.currentUser, liveTokens)

  if (liveTokens.length === 0) {
    return res.status(403).send({ err: 'Not Authorized for this action' });
  }
  next();
};

export { authRequired };
