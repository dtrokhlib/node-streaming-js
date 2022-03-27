import { Router, Request, Response } from 'express';
import { authRequired } from '../middleware/authRequired';
import { upload } from '../middleware/multer';
import { IFile, IVideo } from '../model/interfaces/video.interface';
import { Video } from '../model/Video';

const router = Router();

router.post(
  '/upload/video',
  authRequired,
  upload.fields([{ name: 'videoFile' }, { name: 'placeholderFile' }]),
  async (req: Request, res: Response) => {
    try {
      const data = JSON.parse(JSON.stringify(req.files));
      const videoData: IVideo = {
        userId: req.currentUser?.id,
        name: req.body.videoName,
        description: req.body.videoDescription,
        placeholderFile: data.placeholderFile[0],
        videoFile: data.videoFile[0],
      };

      const video = Video.build(videoData);

      await video.save();

      if (!video) {
        return res.status(400).send({ err: 'Issue during the saving' });
      }

      res.send(video);
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export { router as uploadVideoRouter };
