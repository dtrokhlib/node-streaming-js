import { Document, Model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  tokens?: { token: string }[];
}

export interface IUserDocument extends Document {
  email: string;
  password: string;
  tokens?: { token: string }[];
}

export interface IUserModel extends Model<IUserDocument> {
  build: (data: IUser) => any;
  token: (data: IUser) => any;
}
