import passportLocal from 'passport-local';
import { User, sequelize } from '../models';
import { unHashPassword, hashPassword, allowedLevels } from '../helpers';

const { Op } = sequelize;

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
        usernameField: 'phone',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, phone, password, done) => {
        phone = phone.toLowerCase().trim();
        const username = req.body.username || '';
        User.findOne({
          where: { [Op.or]: [{ phone }, { username }] },
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
        usernameField: 'phone',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, phone, password, done) => {
        password = hashPassword(password);
        const email = req.body.email || null;
        const username = req.body.username.trim();
        const names = req.body.names.trim();
        const a_level = Number(req.body.a_level);
        if (!allowedLevels.includes(a_level)) {
          return done({ message: 'You are not allowed to create account' });
        }
        const userPhoneParams = [{ username }, { phone }];
        const withEmailParams = [...userPhoneParams, { email }];
        const params = email ? withEmailParams : userPhoneParams;
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
              { email, phone, username, password, names, a_level },
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
