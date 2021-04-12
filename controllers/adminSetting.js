import { unlink } from 'fs';
import { Faq, SliderContent, Language } from '../models';
import {
	generateSlug,
	getLang,
	QueryHelper,
	saveNewSlider,
	serverResponse
} from '../helpers';
import { translate } from '../config';
import { sliderIncludes } from '../helpers/modelIncludes';

const faqDb = new QueryHelper(Faq);
const sliderDb = new QueryHelper(SliderContent);
const languageDb = new QueryHelper(Language);
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
	const { textContents, ...rest } = req.body;
	const uniqueSign = generateSlug();

	/**
	 * Save a new slider
	 */
	await saveNewSlider(textContents, uniqueSign, rest);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message);
};
export const getSliders = async (req, res) => {
	const { languageId } = req.body;
	const { forAdmin } = req.query;
	let conditions = { languageId };
	if (forAdmin && forAdmin === 'forAdmin') {
		conditions = null;
	}
	const sliders = await sliderDb.findAll(conditions, sliderIncludes);
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, sliders);
};
export const updateSlider = async (req, res) => {
	const { uniqueSign } = req.params;
	const { textContents, ...rest } = req.body;

	// Delete the old sliders
	await sliderDb.delete({ uniqueSign });

	/**
	 * Save a new slider
	 */
	await saveNewSlider(textContents, uniqueSign, rest);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};
export const deleteSlider = async (req, res) => {
	const { sliderId: id, uniqueSign } = req.params;
	const slider = await sliderDb.findOne({ id });

	await sliderDb.delete({ uniqueSign });

	unlink(`${process.env.IMAGES_ZONE}/${slider.imageLink}`, (error) => {
		if (error) {
			process.stdout.write('Sorry service not available');
		}
		const lang = getLang(req);
		const message = translate[lang].success;
		return serverResponse(res, 200, message);
	});
};
