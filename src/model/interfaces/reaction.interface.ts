import mongoose, { Document, Model } from 'mongoose';

export interface IReaction {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  reaction: string;
}

export interface IReactionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  reaction: string;
}

export interface IReactionModel extends Model<IReactionDocument> {
  build: (fields: IReaction) => any;
}
