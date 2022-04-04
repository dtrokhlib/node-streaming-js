import { IUser, IUserDocument, IUserModel } from './interfaces/user.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.password;
        delete ret.tokens;
      },
    },
  }
);

userSchema.statics.build = function (data: IUser) {
  return new User(data);
};

userSchema.statics.token = async function (id: string) {
  try {
    const token = await jwt.sign(
      { id },
      process.env.CLIENT_SECRET! || 'testSecret'
    );

    return token;
  } catch (err) {
    console.log(err);
  }
};

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
});

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema
);
