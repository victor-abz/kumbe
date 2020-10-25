import { translate } from '../config';
import { getLang, QueryHelper, serverResponse, Validator } from '../helpers';
import { Partner, Sequelize } from '../models';

const partnerDb = new QueryHelper(Partner);
const { Op } = Sequelize;
export const isPartnerInfoValid = async (req, res, next) => {
	const lang = getLang(req);
	let validator = new Validator(req.body);
	let validateAction = req.method === 'POST' ? 'create' : 'update';
	const error = validator.validateInput('partner', validateAction);
	if (error) return serverResponse(res, 400, error);

	let findParams = { name: req.body.name };

	const partner = await partnerDb.findOne(findParams);
	if (!partner) {
		return next();
	}
	const message = translate[lang].dataExist('Partner');
	return serverResponse(res, 400, message);
};
export const doesPartnerExist = async (req, res, next) => {
	const { partnerId } = req.params;
	const partner = await partnerDb.findOne({ id: partnerId });
	if (partner) {
		return next();
	}
	const lang = getLang(req);
	return serverResponse(res, 400, translate[lang].dataNotFound('Partner'));
};
