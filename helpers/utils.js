import bcrypt from 'bcrypt';

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
