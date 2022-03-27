import { Document, Model } from 'mongoose';

export interface IVideo {
  userId: string;
  name: string;
  description: string;
  placeholderFile: IFile;
  videoFile: IFile;
  views?: number;
  rating?: number;
}

export interface IVideoDocument extends Document {
  userId: string;
  name: string;
  description: string;
  placeholderFile: IFile;
  videoFile: IFile;
  views?: number;
  rating?: number;
}

export interface IVideoModel extends Model<IVideoDocument> {
  build: (data: IVideo) => any;
}

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
