import { User, Sequelize } from '../models';
import { Validator, serverResponse, QueryHelper } from '../helpers';

const userDb = new QueryHelper(User);
const { Op } = Sequelize;
export const isLoginInfoValid = (req, res, next) => {
  if (req.isAuthenticated()) {
    return serverResponse(res, 422, 'You are already authenticatred');
  }
  let validator = new Validator(req.body);
  const error = validator.validateInput('user', 'login');

  if (error) return serverResponse(res, 400, errorMsg);
  return next();
};
export const isSignUpInfoValid = (req, res, next) => {
  if (req.isAuthenticated()) {
    return serverResponse(res, 422, 'You are already authenticatred');
  }
  delete req.body.confirmPassword;
  let validator = new Validator(req.body);
  const error = validator.validateInput('auth', 'signup');

  if (error) return serverResponse(res, 400, error);
  return next();
};
export const isUpdateUserInfoValid = async (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('user-update', '');

  if (error) return serverResponse(res, 400, error);
  const { username } = req.body;
  const usernameTaken = await userDb.findOne({
    id: { [Op.ne]: req.user.id },
    username
  });
  if (usernameTaken) {
    return serverResponse(res, 422, 'The username has taken');
  }
  return next();
};
