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
	const error = validator.validateInput('auth', 'login');

	if (error) return serverResponse(res, 400, error);
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
	if (username) {
		const usernameTaken = await userDb.findOne({
			id: { [Op.ne]: req.user.id },
			username
		});
		if (usernameTaken) {
			return serverResponse(res, 422, translate[lang].usernameTaken);
		}
	}
	return next();
};
export const isUpdateALevelValid = async (req, res, next) => {
	const { accessLevel } = req.body;
	const { userId } = req.params;
	const { id, accessLevel: myAccess } = req.user;
	const notYou = 'You cannot change your onw level',
		aLNotAllowed = 'The access level is not allowed',
		notFount = 'User not found',
		invalidUser = 'Invalid user data';
	if (userId && userId === id) {
		return serverResponse(res, 401, notYou);
	}
	if (accessLevel) {
		if (Number(accessLevel) < 2 || Number(accessLevel) > 4) {
			return serverResponse(res, 403, aLNotAllowed);
		}
		const theUser = await userDb.findOne({ id: userId });
		if (!theUser) {
			return serverResponse(res, 404, notFount);
		}
		if (Number(theUser.accessLevel) < Number(myAccess)) {
			return serverResponse(res, 400, aLNotAllowed);
		}
		return next();
	}
	return serverResponse(res, 400, invalidUser);
};
