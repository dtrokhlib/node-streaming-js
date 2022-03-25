import { IUserDocument } from '../src/model/interfaces/user.interface';

declare namespace Express {
  export interface Request {
    currentUser?: IUserDocument;
    token: string;
  }
}
