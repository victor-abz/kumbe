import { serverResponse, msgs } from '../helpers';

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return serverResponse(res, 401, msgs.NOT_AUTH);
};
