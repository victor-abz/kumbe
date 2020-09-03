import { User, Sequelize } from '../models';
import { Validator, serverResponse, QueryHelper, getLang } from '../helpers';
import { translate } from '../config/messages';

const userDb = new QueryHelper(User);
const { Op } = Sequelize;
export const isLoginInfoValid = (req, res, next) => {
  const lang = getLang(req);
  if (req.isAuthenticated()) {
    return serverResponse(res, 422, translate[lang].alreadyAuth);
  }
  let validator = new Validator(req.body);
  const error = validator.validateInput('user', 'login');

  if (error) return serverResponse(res, 400, errorMsg);
  return next();
};
export const isSignUpInfoValid = (req, res, next) => {
  const lang = getLang(req);
  if (req.isAuthenticated()) {
    return serverResponse(res, 422, translate[lang].alreadyAuth);
  }
  delete req.body.confirmPassword;
  let validator = new Validator(req.body);
  const error = validator.validateInput('auth', 'signup');

  if (error) return serverResponse(res, 400, error);
  return next();
};
export const isUpdateUserInfoValid = async (req, res, next) => {
  const lang = getLang(req);
  let validator = new Validator(req.body);
  const error = validator.validateInput('user-update', '');

  if (error) return serverResponse(res, 400, error);
  const { username } = req.body;
  const usernameTaken = await userDb.findOne({
    id: { [Op.ne]: req.user.id },
    username
  });
  if (usernameTaken) {
    return serverResponse(res, 422, translate[lang].usernameTaken);
  }
  return next();
};
