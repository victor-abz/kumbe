import passport from 'passport';
import { User } from '../models';
import {
  serverResponse,
  week,
  generatJWT,
  QueryHelper,
  getLang
} from '../helpers';
import { translate } from '../config/messages';

const userDb = new QueryHelper(User);
export const getUsers = (req, res) => {
  return serverResponse(res, 200, 'Working');
};
export const loginUser = (req, res, next) => {
  const lang = getLang(req);
  passport.authenticate('local.login', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    req.logIn(user, (err) => {
      if (err) return next(err);

      user.token = generatJWT({ id: user.id });
      req.session.cookie.maxAge = week;
      req.session.save();

      const successMsg = translate[lang].loginSuccess(user.firstName);
      return serverResponse(res, 200, successMsg, user);
    });
  })(req, res, next);
};
export const signupUser = (req, res, next) => {
  const lang = getLang(req);

  passport.authenticate('local.signup', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);

    const successMsg = translate[lang].registerSuccess(user.firstName);
    delete user.password;
    return serverResponse(res, 200, successMsg, user);
  })(req, res, next);
};
export const logoutUser = (req, res) => {
  const lang = getLang(req);

  req.session.destroy();
  req.logout();
  return serverResponse(res, 200, translate[lang].success);
};
export const updateProfile = async (req, res) => {
  const lang = getLang(req);
  const { id } = req.user;
  await userDb.update(req.body, { id });
  return serverResponse(res, 200, translate[lang].success);
};
export const getUserProfile = (req, res) => {
  const lang = getLang(req);

  const currentUser = req.user.toJSON();
  delete currentUser.password;
  const msg = translate[lang].success;
  return serverResponse(res, 200, msg, currentUser);
};
