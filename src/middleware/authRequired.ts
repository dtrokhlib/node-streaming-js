import { Request, Response, NextFunction } from 'express';

const authRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser || !req.currentUser.tokens) {
    return res.status(403).redirect('/login');
  }

  const liveTokens = req.currentUser.tokens.filter(
    (elem) => elem.token == req.cookies.token
  );

  if (liveTokens.length === 0) {
    return res.status(403).redirect('/login');
  }
  next();
};

export { authRequired };
