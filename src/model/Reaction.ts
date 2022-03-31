import {
  IReaction,
  IReactionDocument,
  IReactionModel,
} from './interfaces/reaction.interface';
import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  videoId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  reaction: {
    type: String,
    required: true,
  },
});

reactionSchema.statics.build = (fields: IReaction) => {
  return new Reaction(fields);
};

export const Reaction = mongoose.model<IReactionDocument, IReactionModel>(
  'Reaction',
  reactionSchema
);
