import { existsSync, mkdirSync, unlink } from 'fs';
import {
	serverResponse,
	QueryHelper,
	getLang,
	allowedStrategies
} from '../helpers';
import { Language } from '../models';
import { translate } from '../config';

const languageDb = new QueryHelper(Language);
export const monitorDevActions = (req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		const user = req.isAuthenticated()
			? `User: ${req.user.username}`
			: 'UNKNOWN user';
		console.log(
			`${user} is using ${req.device.type}, 
        Route: ${req.path}, method: ${req.method}, 
        body: ${JSON.stringify(req.body)}, 
        session: ${JSON.stringify(req.session)},
        IP: ${req.ip} `
		);
	}
	return next();
};

export const route404 = (req, res) => {
	const lang = getLang(req);
	return serverResponse(res, 404, translate[lang].notFound);
};
/**
 *
 * @param {function} fn Express callback promise function
 * @returns {promise} Resolve the promise irrespective
 * resolved or rejected
 */
export const catchErrors = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
export const handleErrors = (err, req, res, next) => {
	const lang = getLang(req);
	if (process.env.NODE_ENV === 'development') {
		console.log(err.stack);
	}
	/**
	 * Check every route that uses the uploadFile Middleware
	 */
	return serverResponse(res, 500, translate[lang].serverError);
	/**
	 * To view the error detail, uncomment the following line
	 */
	// return serverResponse(res, 500, err.message);
};
export const setLanguage = async (req, res, next) => {
	const shortName = req.acceptsLanguages('en', 'kin') || 'en';
	const language = await languageDb.findOne({ shortName });
	req.body.languageId = language.id || 1;
	return next();
};
export const validateStrategy = (req, res, next) => {
	const lang = getLang(req);
	const { strategy } = req.params;
	if (allowedStrategies.includes(strategy)) {
		return next();
	}
	return serverResponse(res, 500, translate[lang].serverError);
};
