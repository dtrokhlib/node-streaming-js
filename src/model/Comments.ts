import mongoose from 'mongoose';
import {
  IComments,
  ICommentsDocument,
  ICommentsModel,
} from './interfaces/comments.interface';

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoId: {
      type: mongoose.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.statics.build = (fields: IComments) => {
  return new Comment(fields);
};

export const Comment = mongoose.model<ICommentsDocument, ICommentsModel>(
  'Comment',
  commentSchema
);
