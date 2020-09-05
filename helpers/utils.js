import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken';
import slugify from 'slugify';
import uniqid from 'uniqid';
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
