import {
  IVideo,
  IVideoDocument,
  IVideoModel,
} from './interfaces/video.interface';
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    placeholderFile: {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number,
    },
    videoFile: {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.statics.build = function (data: IVideo) {
  return new Video(data);
};

export const Video = mongoose.model<IVideoDocument, IVideoModel>(
  'Video',
  videoSchema
);
