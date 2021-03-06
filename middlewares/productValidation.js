import { translate } from '../config';
import { getLang, QueryHelper, serverResponse, Validator } from '../helpers';
import { Service, Sequelize } from '../models';

const serviceDb = new QueryHelper(Service);
const { Op } = Sequelize;
export const isProductInfoValid = async (req, res, next) => {
	const lang = getLang(req);
	let validator = new Validator(req.body);
	let validateAction = req.method === 'POST' ? 'create' : 'update';
	const error = validator.validateInput('product', validateAction);
	if (error) return serverResponse(res, 400, error);

	let findParams = { name: req.body.name };
	if (req.method === 'PATCH') {
		findParams = { ...findParams, id: { [Op.ne]: req.params.productId } };
	}
	const service = await serviceDb.findOne(findParams);
	if (!service) {
		return next();
	}
	const message = translate[lang].dataExist('Product');
	return serverResponse(res, 400, message);
};
export const doesProductExit = async (req, res, next) => {
	const { productId } = req.params;
	const product = await serviceDb.findOne({ id: productId });
	if (product) {
		return next();
	}
	const lang = getLang(req);
	return serverResponse(res, 400, translate[lang].dataNotFound('Product'));
};
