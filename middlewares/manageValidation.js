import { QueryHelper, serverResponse, Validator, getLang } from '../helpers';
import { translate } from '../config';
import { Faq, SliderContent } from '../models';

const faqDb = new QueryHelper(Faq);
const sliderDb = new QueryHelper(SliderContent);
export const isFAQValid = (req, res, next) => {
	let validator = new Validator(req.body);
	let validateAction = req.method === 'POST' ? 'create' : 'update';
	const error = validator.validateInput('faq', validateAction);

	if (!error) return next();
	return serverResponse(res, 400, error);
};
export const doesFAQExit = async (req, res, next) => {
	const { questionId: id } = req.params;
	const question = await faqDb.findOne({ id });
	if (question) {
		return next();
	}
	const lang = getLang(req);
	return serverResponse(res, 400, translate[lang].dataNotFound('F-A-Q'));
};
export const isSliderValid = (req, res, next) => {
	let validator = new Validator(req.body);
	let validateAction = req.method === 'POST' ? 'create' : 'update';
	const error = validator.validateInput('slider', validateAction);

	if (!error) return next();
	return serverResponse(res, 400, error);
};
export const doesSliderExit = async (req, res, next) => {
	const { sliderId: id } = req.params;
	const slider = await sliderDb.findOne({ id });
	if (slider) {
		req.params.uniqueSign = slider.uniqueSign;
		return next();
	}
	const lang = getLang(req);
	return serverResponse(res, 404, translate[lang].dataNotFound('Slider'));
};
