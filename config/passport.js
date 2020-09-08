import { Strategy as LocalStrategy } from 'passport-local';
import { OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';
import { Op } from 'sequelize';
import { User } from '../models';
import { unHashPassword, hashPassword, getLang } from '../helpers';
import { translate } from './messages';

export const localPassport = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('User', user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id }, logging: false })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  });
  //____________________Local login_________________//
  passport.use(
    'local.login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, username, password, done) => {
        const lang = getLang(req);
        username = username.toLowerCase().trim();
        const email = req.body.email ? req.body.email.toLowerCase().trim() : '';
        User.findOne({
          where: { [Op.or]: [{ username }] },
          logging: false
        })
          .then((user) => {
            if (!user) return done({ message: translate[lang].invalidLogin });
            if (!unHashPassword(password, user.password))
              return done({ message: translate[lang].invalidPwd });
            user = user.toJSON();

            delete user.password;
            return done(null, user);
          })
          .catch((error) => done(error));
      }
    )
  );
  /**
   * Sign up using Phone and Password.  New Account
   */
  passport.use(
    'local.signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, username, password, done) => {
        let { email, firstName, lastName, phone, gender } = req.body;

        email = email ? email.toLowerCase().trim() : '';
        password = hashPassword(password);
        username = username.toLowerCase().trim();
        phone = phone.trim();

        const userNamePhoneParams = [{ username }, { phone }];
        const withEmailParams = [...userNamePhoneParams, { email }];
        const params = email ? withEmailParams : userNamePhoneParams;
        User.findOne({
          where: { [Op.or]: params },
          logging: false
        })
          .then((user) => {
            if (user) {
              const lang = getLang(req);
              return done({
                message: translate[lang].userExists
              });
            }
            User.create(
              { email, phone, username, password, firstName, lastName, gender },
              { logging: false }
            )
              .then((user) => done(null, user))
              .catch((error) => done(error));
          })
          .catch((error) => done(error));
      }
    )
  );
  passport.use(
    'google',
    new GoogleStrategy(
      {
        consumerKey: 'GOOGLE_CONSUMER_KEY',
        consumerSecret: 'GOOGLE_CONSUMER_SECRET',
        callbackURL: 'http://www.kumbe.com/auth/google/callback'
      },
      (token, tokenSecret, profile, done) => {
        console.log('g token', token);
        console.log('g tokenSecret', tokenSecret);
        console.log('g profile', profile);
        return done(null, 'Success user');
      }
    )
  );
};
