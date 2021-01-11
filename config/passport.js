import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Op } from 'sequelize';
import { User } from '../models';
import {
	unHashPassword,
	hashPassword,
	getLang,
	toFirstLastName
} from '../helpers';
import { translate } from './messages';

export const localPassport = () => {
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
						if (!unHashPassword(password, user.password)) {
							return done({ message: translate[lang].invalidPwd });
						}
						user = user.toJSON();
						// if (Number(user.accessLevel) > 2) {
						// 	return done({ message: translate[lang].signinNotAllowed });
						// }
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
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${process.env.APP_LINK}/google/auth/callback`
			},
			(token, tokenSecret, profile, done) => {
				// console.log('GM profile', profile);
				const { given_name, family_name, picture, email } = profile._json;
				User.findOrCreate({
					where: { email },
					defaults: {
						firstName: given_name,
						lastName: family_name,
						profilePic: picture,
						username: given_name,
						gender: 'Other',
						isActive: true,
						isVerified: true
					},
					logging: false
				})
					.then((user) => {
						const jsonUser = user[0].dataValues;

						return done(null, jsonUser);
					})
					.catch((error) => done(error));
			}
		)
	);
	passport.use(
		'facebook',
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: `${process.env.APP_LINK}/facebook/auth/callback`
			},
			(accessToken, refreshToken, profile, done) => {
				// console.log('FB profile', profile);
				const { name } = profile._json;
				const { firstName, lastName } = toFirstLastName(name);
				User.findOrCreate({
					where: { username: name.split(' ').join('') },
					defaults: {
						firstName,
						lastName,
						gender: 'Other',
						isActive: true,
						isVerified: true
					},
					logging: false
				})
					.then((user) => {
						const jsonUser = user[0].dataValues;

						return done(null, jsonUser);
					})
					.catch((error) => done(error));
			}
		)
	);
	passport.use(
		'twitter',
		new TwitterStrategy(
			{
				consumerKey: process.env.TWITTER_APP_ID,
				consumerSecret: process.env.TWITTER_APP_SECRET,
				callbackURL: `${process.env.APP_LINK}/twitter/auth/callback`
			},
			(accessToken, refreshToken, profile, done) => {
				// console.log('TW profile', profile);
				const { screen_name, name, profile_image_url_https } = profile._json;
				const { firstName, lastName } = toFirstLastName(name);
				User.findOrCreate({
					where: { username: screen_name.toLowerCase() },
					defaults: {
						firstName,
						lastName,
						profilePic: profile_image_url_https,
						gender: 'Other',
						isActive: true,
						isVerified: true
					},
					logging: false
				})
					.then((user) => {
						const jsonUser = user[0].dataValues;

						return done(null, jsonUser);
					})
					.catch((error) => done(error));
			}
		)
	);
};
