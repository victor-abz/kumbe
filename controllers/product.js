import { unlink } from 'fs';
import { translate } from '../config';
import { getLang, QueryHelper, serverResponse } from '../helpers';
import { Service } from '../models';

const serviceDb = new QueryHelper(Service);
export const createProduct = async (req, res) => {
	const newProduct = await serviceDb.create(req.body);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newProduct);
};
export const getProducts = async (req, res) => {
	const products = await serviceDb.findAll();

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, products);
};
export const editProduct = async (req, res) => {
	const { productId: id } = req.params;

	await serviceDb.update(req.body, { id });

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};
export const deleteProduct = async (req, res) => {
	const { productId: id } = req.params;
	const product = await serviceDb.findOne({ id });
	await serviceDb.delete({ id });

	unlink(`${process.env.IMAGES_ZONE}/${product.coverImage}`, (error) => {
		if (error) {
			process.stdout.write('Sorry service not available');
		}
		const lang = getLang(req);
		const message = translate[lang].success;
		return serverResponse(res, 200, message);
	});
};
