import passport from 'passport';
import { User, Sequelize } from '../models';
import {
	serverResponse,
	week,
	generatJWT,
	QueryHelper,
	getLang,
	paginator
} from '../helpers';
import { translate } from '../config/messages';
import { socialAuth } from '../helpers/socialAuth';

const userDb = new QueryHelper(User);
const { Op } = Sequelize;

export const getUsers = async (req, res) => {
	const attributes = { exclude: ['password'] };
	const { limit, offset } = paginator(req.query);
	const whereConditions = { accessLevel: { [Op.ne]: '1' } };

	const users = await userDb.findAll(
		whereConditions,
		null,
		null,
		attributes,
		offset,
		limit
	);
	const usersCount = await userDb.count(whereConditions);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, users, usersCount);
};
export const changeAccessLevel = async (req, res) => {
	const { accessLevel } = req.body;
	const { userId } = req.params;
	await userDb.update({ accessLevel }, { id: userId });

	const lang = getLang(req);
	return serverResponse(res, 200, translate[lang].success);
};
export const createNewUser = async (req, res) => {
	//Create a user here
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
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
	return serverResponse(res, 200, translate[lang].logoutMsg);
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
export const passportStrategy = (req, res, next) => {
	const { strategy } = req.params;
	const permissions = strategy === 'facebook' ? null : ['profile', 'email'];

	passport.authenticate(strategy, { scope: permissions })(req, res, next);
};
export const socialAuthCallBack = (req, res, next) => {
	const { strategy } = req.params;
	socialAuth(req, res, next, strategy, (error, userLink) => {
		if (error) return serverResponse(res, 500, error);
		const lang = getLang(req);
		/*
		 * Redirect a user to the link
		 */
		const msg = translate[lang].success;
		return serverResponse(res, 200, msg, userLink);
	});
};
