declare namespace Express {
  export interface Request {
    currentUser?: {
      id: string;
      token: string;
    };
  }
}
