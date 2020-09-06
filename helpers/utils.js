import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
