import { unlink } from 'fs';
import { Faq, SliderContent } from '../models';
import { getLang, QueryHelper, serverResponse } from '../helpers';
import { translate } from '../config';
import { categoryIncludes } from '../helpers/modelIncludes';

const faqDb = new QueryHelper(Faq);
const sliderDb = new QueryHelper(SliderContent);
export const addFAQuestion = async (req, res) => {
	const newFaq = await faqDb.create(req.body);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newFaq);
};
export const getFAQuestions = async (req, res) => {
	const { languageId } = req.body;

	const questions = await faqDb.findAll({ languageId });
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, questions);
};
export const editFAQuestion = async (req, res) => {
	const { questionId: id } = req.params;

	await faqDb.update(req.body, { id });

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};
export const deleteFAQuestion = async (req, res) => {
	const { questionId: id } = req.params;

	await faqDb.delete({ id });

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};
export const createNewSlider = async (req, res) => {
	const newSlider = await sliderDb.create(req.body);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newSlider);
};
export const getSliders = async (req, res) => {
	const { languageId } = req.body;

	const sliders = await sliderDb.findAll({ languageId }, categoryIncludes);
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, sliders);
};
export const updateSlider = async (req, res) => {
	const { sliderId: id } = req.params;
	await sliderDb.update(req.body, { id });

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};
export const deleteSlider = async (req, res) => {
	const { sliderId: id } = req.params;
	const slider = await sliderDb.findOne({ id });
	await sliderDb.delete({ id });

	unlink(`${process.env.IMAGES_ZONE}/${slider.imageLink}`, (error) => {
		if (error) {
			process.stdout.write('Sorry service not available');
		}
		const lang = getLang(req);
		const message = translate[lang].success;
		return serverResponse(res, 200, message);
	});
};
