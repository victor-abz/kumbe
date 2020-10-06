import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken';
import slugify from 'slugify';
import uniqid from 'uniqid';
import path from 'path';
import { translate } from '../config';
import { User } from '../models';
import { QueryHelper } from './QueryHelper';

const userDb = new QueryHelper(User);
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(process.env.PASS_SALT);
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};
export const unHashPassword = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
};
/**
 *
 * @param {Response} res Server response
 * @param {Number} statusCode Status code
 * @param {string} message Response message
 * @param {*} data Response data
 */
export const serverResponse = (res, statusCode, message, data) => {
  const messageType = statusCode >= 400 ? 'error' : 'message';
  return res
    .status(statusCode)
    .json({ status: statusCode, [messageType]: message, data });
};
export const generatJWT = (userInfo) => {
  const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '1w' });
  return token;
};
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const tokenGenerator = (tokenLength) => {
  const token = [];
  const chars = '0123456789';

  for (let i = 0; i < tokenLength; i += 1) {
    token.push(chars[getRandomInt(0, chars.length - 1)]);
  }
  return token.join('');
};
export const generateSlug = (title) => {
  const uniqueId = uniqid.process();
  const slug = `${slugify(title, { lower: true })}-${uniqueId}`;
  return slug;
};
export const authenticatedUser = async (req) => {
  const { user, useragent, headers } = req;
  if (
    useragent.isFirefox ||
    useragent.isOpera ||
    useragent.isChromeOS ||
    useragent.isEdge
  ) {
    const token = headers.authorization;
    try {
      const { id } = verify(token, process.env.SECRET);
      const user = await userDb.findOne({ id });
      if (user.id) {
        return user;
      }
    } catch (error) {
      return null;
    }
  } else if ((useragent.browser = 'PostmanRuntime' && req.isAuthenticated())) {
    return user;
  }
  return null;
};
export const paginator = ({ page, pageSize }) => {
  const offset = Number((page - 1) * pageSize) || 0;
  const limit = Number(pageSize) || 20;
  return { offset, limit };
};
/**
 *
 * @param {string} name
 * @returns {string} Return a capitalized name
 */
export const ucFirst = (name) => {
  return name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};
/**
 *
 * @param {string} fullName A name to split into two
 * @returns {object} An object of two names
 */
export const toFirstLastName = (fullName) => {
  let names = {};

  if (fullName) {
    const nameArr = fullName.split(' ');
    names.lastName = nameArr.pop();
    names.firstName = ucFirst(nameArr.join(' '));
  }
  return names;
};

/**
 *
 * @param {File} file File info
 * @param {String} filePath Where file will be saved
 * @param {String} lang System languange
 * @param {Function} fileCallBack Callback function
 */
export const isFileAllowed = (file, filePath, lang, fileCallBack) => {
  const coverImages = process.env.BLOGS_ZONE;
  const images = process.env.IMAGES_ZONE;
  const audios = process.env.AUDIOS_ZONE;
  const profiles = process.env.PROFILES_ZONE;
  const thumbnails = process.env.THUMBNAILS_ZONE;
  // Allowed exts
  const allowedImages = /jpeg|jpg|png/;
  const allowedAudios = /mp3|mpeg/;
  // Check ext
  let extname = false;
  // Check mime
  let mimetype = false;
  let errorMessage = '';
  if (
    filePath === coverImages ||
    filePath === images ||
    filePath === profiles ||
    filePath === thumbnails
  ) {
    extname = allowedImages.test(path.extname(file.originalname).toLowerCase());
    mimetype = allowedImages.test(file.mimetype);
    errorMessage = translate[lang].imageNotAllowed;
  }
  if (filePath === audios) {
    extname = allowedAudios.test(path.extname(file.originalname).toLowerCase());
    mimetype = allowedAudios.test(file.mimetype);
    errorMessage = translate[lang].audioNotAllowed;
  }

  if (mimetype && extname) {
    return fileCallBack(null, true);
  } else {
    fileCallBack(errorMessage);
  }
};
export const createYtbThumbnail = (videoLink) => {
  const matchVId = videoLink.match('[\\?&]v=([^&#]*)');
  const videoId = matchVId === null ? '' : matchVId[1];
  const nFrameImg = `http://img.youtube.com/vi/${videoId}/0.jpg`;
  return nFrameImg;
};
