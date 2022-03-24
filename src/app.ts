import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Express } from 'express';
import { connect } from 'mongoose';
import { authVerification } from './middleware/auth';
import { userRouter } from './routes/auth';

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
  }

  setup() {
    this.app.use(express.json());
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
