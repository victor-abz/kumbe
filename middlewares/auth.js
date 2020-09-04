import { serverResponse, getLang } from '../helpers';
import { translate } from '../config';

export const isAuthenticated = (req, res, next) => {
  const lang = getLang(req);
  if (req.isAuthenticated()) return next();
  return serverResponse(res, 401, translate[lang].notAuth);
};
