import { translate } from '../config';
import { getLang, serverResponse } from '../helpers';

export const createQuestion = async (req, res) => {
	const lang = getLang(req);
	return serverResponse(res, 201, translate[lang].success);
};
export const getQuestions = async (req, res) => {
	const lang = getLang(req);
	return serverResponse(res, 200, translate[lang].success);
};
