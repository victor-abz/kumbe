import passport from 'passport';
import { serverResponse, week, generatJWT } from '../helpers';

export const getUsers = (req, res) => {
  return serverResponse(res, 200, 'Working');
};
export const loginUser = (req, res, next) => {
  passport.authenticate('local.login', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    req.logIn(user, (err) => {
      if (err) return next(err);

      delete user.password;

      user.token = generatJWT({ id: user.id });
      req.session.cookie.maxAge = week;
      req.session.save();
      return serverResponse(res, 200, `Welcome ${user.names}`, user);
    });
  })(req, res, next);
};
export const signupUser = (req, res, next) => {
  passport.authenticate('local.signup', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    const successMsg = `Thank you, ${user.names}, for registering`;
    delete user.password;
    return serverResponse(res, 200, successMsg, user);
  })(req, res, next);
};
export const logoutUser = (req, res) => {
  req.session.destroy();
  req.logout();
  return serverResponse(res, 200, 'Successfully logged out');
};
