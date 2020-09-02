import passportLocal from 'passport-local';
import { Op } from 'sequelize';
import { User } from '../models';
import { unHashPassword, hashPassword, allowedLevels } from '../helpers';

const LocalStrategy = passportLocal.Strategy;

export const localPassport = (passport) => {
  passport.serializeUser((user, done) => {
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
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        username = username.toLowerCase().trim();
        const email = req.body.email ? req.body.email.toLowerCase().trim() : '';
        User.findOne({
          where: { [Op.or]: [{ username }] },
          logging: false,
        })
          .then((user) => {
            if (!user) return done({ message: 'Invalid user info' });
            if (!unHashPassword(password, user.password))
              return done({ message: 'Invalid password' });
            user = user.toJSON();
            if (user.a_level > 2)
              return done({ message: 'You are not allowed to log in' });
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
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        let { email, names, phone, gender, accessLevel } = req.body;

        email = email ? email.toLowerCase().trim() : '';
        password = hashPassword(password);
        username = username.toLowerCase().trim();
        names = names.trim();
        phone = phone.trim();
        accessLevel = Number(accessLevel);

        if (!allowedLevels.includes(accessLevel)) {
          return done({ message: 'You are not allowed to create account' });
        }

        const userNamePhoneParams = [{ username }, { phone }];
        const withEmailParams = [...userNamePhoneParams, { email }];
        const params = email ? withEmailParams : userNamePhoneParams;
        User.findOne({
          where: { [Op.or]: params },
          logging: false,
        })
          .then((user) => {
            if (user) {
              return done({
                message: 'Phone number, email or username has taken',
              });
            }
            User.create(
              { email, phone, username, password, names, accessLevel, gender },
              { logging: false }
            )
              .then((user) => done(null, user))
              .catch((error) => done(error));
          })
          .catch((error) => done(error));
      }
    )
  );
};
