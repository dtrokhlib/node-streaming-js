import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Express } from 'express';
import { connect } from 'mongoose';
import { authVerification } from './middleware/auth';
import { userRouter } from './routes/auth';
import path from 'path';
import { defaultRouter } from './routes/default';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { uploadVideoRouter } from './routes/upload-video';

export class Application {
  app: Express;

  constructor() {
    this.app = express();
  }

  middlewares() {
    this.app.use(authVerification);
  }

  routes() {
    this.app.use(userRouter);
    this.app.use(defaultRouter);
    this.app.use(uploadVideoRouter);
  }

  setup() {
    this.app.use(express.static(path.join(__dirname, './public')));
    this.app.set('views', path.join(__dirname, './views'));
    this.app.set('view engine', 'ejs');
    this.app.use(express.json());
    this.app.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
    this.app.use(cookieParser());
  }

  async start() {
    await connect(process.env.MONGO_DB_URL as string);
    await this.setup();
    await this.middlewares();
    await this.routes();

    this.app.listen(process.env.PORT, () => {
      console.log(`Node-streaming-app is running on PORT: ${process.env.PORT}`);
    });
  }
}
