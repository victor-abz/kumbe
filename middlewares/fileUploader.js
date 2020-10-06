import multer from 'multer';
import path from 'path';
import { ACCEPTED_FILE_SIZE, getLang } from '../helpers/constants';
import { translate } from '../config';
import { isFileAllowed, serverResponse } from '../helpers';
import { existsSync, mkdirSync, unlink } from 'fs';

export const uploadFile = (req, res) => {
  let fileStorage = null;
  const lang = getLang(req);
  const { fileType } = req.params;
  const { prevFile } = req.query;
  if (fileType === 'coverImage') {
    fileStorage = process.env.BLOGS_ZONE;
  } else if (fileType === 'image') {
    fileStorage = process.env.IMAGES_ZONE;
  } else if (fileType === 'audio') {
    fileStorage = process.env.AUDIOS_ZONE;
  } else if (fileType === 'profile') {
    fileStorage = process.env.PROFILES_ZONE;
  } else if (fileType === 'thumbnail') {
    fileStorage = process.env.THUMBNAILS_ZONE;
  } else return serverResponse(res, 400, translate[lang].fileError);
  /**
   * Delete the previous file if exist
   */
  if (!existsSync(fileStorage)) {
    mkdirSync(fileStorage, { recursive: true });
  }
  if (prevFile) {
    unlink(`${fileStorage}/${prevFile}`, () => {});
  }
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, fileStorage);
    },
    filename: (req, file, callBack) => {
      let ext = path.extname(file.originalname).split('.')[1];
      let fileName = file.originalname.split('.')[0];
      let mediaLink = `${fileName}-${Date.now()}.${ext}`;
      callBack(null, mediaLink);
    }
  });
  const upload = multer({
    storage,
    limits: { fileSize: ACCEPTED_FILE_SIZE },
    fileFilter: (req, file, filterCallBack) => {
      isFileAllowed(file, fileStorage, lang, (error, allowed) => {
        if (error) return filterCallBack(error);
        return filterCallBack(null, true);
      });
    }
  }).single('file');

  upload(req, res, (uploadError) => {
    const lang = getLang(req);
    if (uploadError instanceof multer.MulterError || uploadError) {
      const errorMsg = uploadError.message || uploadError;
      console.log(errorMsg);
      return serverResponse(res, 500, errorMsg);
    }

    if (!req.file) return serverResponse(res, 400, 'No file selected');
    const fileName = req.file.filename;
    return serverResponse(res, 200, translate[lang].success, fileName);
  });
};
