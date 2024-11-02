import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = './uploads';

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      let name: string;
      if (file.fieldname === 'pictureurl') name = 'picture1.png';
      else name = 'picture2.png';

      cb(null, name);
    },
  }),
};

export default multerOptions;
