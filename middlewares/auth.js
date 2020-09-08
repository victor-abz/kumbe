import { serverResponse, getLang, authenticatedUser } from '../helpers';
import { translate } from '../config';

export const isAuthenticated = async (req, res, next) => {
  const lang = getLang(req);
  const user = await authenticatedUser(req);
  if (user) return next();
  return serverResponse(res, 401, translate[lang].notAuth);
};
export const isAtLeastAdmin = async (req, res, next) => {
  const lang = getLang(req);
  const user = await authenticatedUser(req);
  if (user && user.accessLevel <= 2) return next();

  const message = translate[lang].notAdmin;
  return serverResponse(res, 401, message);
};
