import multer from 'multer';
import { mediaPathResolver } from '../helpers/mediaPathResolver';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = mediaPathResolver(file);

    cb(null, path);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + `.${extension}`);
  },
});

const upload = multer({ storage: storage });

export { upload };
