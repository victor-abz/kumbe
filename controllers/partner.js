import { unlink } from 'fs';
import { translate } from '../config';
import { getLang, QueryHelper, serverResponse } from '../helpers';
import { Partner } from '../models';

const partnerDb = new QueryHelper(Partner);
export const createPartner = async (req, res) => {
	const newPartner = await partnerDb.create(req.body);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newPartner);
};
export const getPartners = async (req, res) => {
	const partners = await partnerDb.findAll();
	const partnersCount = await partnerDb.count();

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, partners, partnersCount);
};

export const deletePartner = async (req, res) => {
	const { partnerId: id } = req.params;
	const partner = await partnerDb.findOne({ id });
	await partnerDb.delete({ id });

	unlink(`${process.env.IMAGES_ZONE}/${partner.coverImage}`, (error) => {
		if (error) {
			process.stdout.write('Sorry service not available');
		}
		const lang = getLang(req);
		const message = translate[lang].success;
		return serverResponse(res, 200, message);
	});
};
