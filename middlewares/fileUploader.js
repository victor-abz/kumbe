import multer from 'multer';
import path from 'path';
import { getLang } from '../helpers/constants';
import { translate } from '../config';
import { serverResponse } from '../helpers';
import { existsSync, mkdirSync, unlink } from 'fs';

const MB = 1024 * 1024;
const fileMaxSize = 12 * MB; //16 mbs

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
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
    } else callBack(translate[lang].fileError);

    console.log('fs', fileStorage);
    /**
     * Delete the previous file if exist
     */
    if (!existsSync(fileStorage)) {
      mkdirSync(fileStorage, { recursive: true });
    }
    if (prevFile) {
      unlink(`${fileStorage}/${prevFile}`, () => {});
    }
    callBack(null, fileStorage);
  },
  filename: (req, file, callBack) => {
    let ext = path.extname(file.originalname).split('.')[1];
    let fileName = file.originalname.split('.')[0];
    let mediaLink = `${fileName}-${Date.now()}.${ext}`;
    callBack(null, mediaLink);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: fileMaxSize },
  fileFilter: (req, file, filterCallBack) => {
    console.log(' File before saving' + JSON.stringify(file));
    return filterCallBack(null, true);
  }
}).single('file');

export const uploadFile = (req, res) => {
  upload(req, res, (uploadError) => {
    const lang = getLang(req);
    console.log(uploadError);
    if (uploadError instanceof multer.MulterError || uploadError || !req.file) {
      return serverResponse(res, 500, translate[lang].notUploaded);
    }
    if (!req.file) return serverResponse(res, 400, 'No file selected');
    const fileName = req.file.filename;
    return serverResponse(res, 200, translate[lang].success, fileName);
  });
};
