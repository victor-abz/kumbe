import passport from 'passport';
import { generatJWT } from './utils';
import { week } from './constants';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} strategy google | facebook
 * @param {Callback} authCallBack Callback function whick return link
 */
export const socialAuth = (req, res, strategy, authCallBack) => {
  passport.authenticate(
    strategy,
    {
      successRedirect: '/',
      failureRedirect: '/login'
    },
    (error, user) => {
      console.log('fs Error', error);
      console.log('fs User', user);
      if (error) return authCallBack(error.message);
      req.logIn(user, (logError) => {
        if (logError) {
          console.log('LogError', logError);
          return authCallBack('Service not available');
        }
        user.token = generatJWT({ id: user.id });
        req.session.cookie.maxAge = week;
        req.session.save();

        /*
         * Put the frontend link to Redirect to
         After the user has successfully authenticated using google auth
         */
        const userLink = '/dashboard';
        return authCallBack(null, userLink);
      });
    }
  )(req, res);
};
