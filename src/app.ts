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
import { libraryRouter } from './routes/library';
import { viewVideoRouter } from './routes/view-video';
import { reactionRouter } from './routes/reaction';
import { commentsRouter } from './routes/comments';
import { profileRouter } from './routes/profile';
import { favouritesRouter } from './routes/favourites';

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
    this.app.use(libraryRouter);
    this.app.use(viewVideoRouter);
    this.app.use(reactionRouter);
    this.app.use(commentsRouter);
    this.app.use(profileRouter);
    this.app.use(favouritesRouter);
  }

  setup() {
    this.app.use(express.static(path.join(__dirname, './public')));
    this.app.set('views', path.join(__dirname, './views'));
    this.app.set('view engine', 'ejs');
    this.app.use(bodyParser.json());
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
    if (process.env.NODE_ENV !== 'test') {
      await connect(process.env.MONGO_DB_URL as string);
      console.log('Node-streaming-app is connected to DB');
    }

    await this.setup();
    await this.middlewares();
    await this.routes();

    if (process.env.NODE_ENV !== 'test') {
      this.app.listen(process.env.PORT, () => {
        console.log(
          `Node-streaming-app is running on PORT: ${process.env.PORT}`
        );
      });
    }
    
    if(process.env.NODE_ENV == 'test') {
      return this.app;
    }
  }
}
