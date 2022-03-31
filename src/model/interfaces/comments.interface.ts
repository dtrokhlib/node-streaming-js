import mongoose, { Document, Model } from 'mongoose';

export interface IComments {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  comment: string;
}

export interface ICommentsDocument extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  comment: string;
}

export interface ICommentsModel extends Model<ICommentsDocument> {
  build: (fields: IComments) => any;
}
