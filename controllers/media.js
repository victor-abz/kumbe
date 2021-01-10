import { translate } from '../config';
import {
	createYtbThumbnail,
	getLang,
	paginator,
	QueryHelper,
	serverResponse
} from '../helpers';
import { mediaIncludes } from '../helpers/modelIncludes';
import { Media, MediaTag, Sequelize } from '../models';

const mediaDb = new QueryHelper(Media);
const mediaTagDb = new QueryHelper(MediaTag);
const { Op } = Sequelize;
const mediaTypes = ['image', 'audio', 'video'];
export const createMedia = async (req, res) => {
	const { type, mediaLink } = req.body;
	req.body.thumbnail = type === 'video' ? createYtbThumbnail(mediaLink) : '';
	const newMedia = await mediaDb.create(req.body);
	const mediaTags = req.body.tags.map((tagId) => ({
		tagId,
		mediaId: newMedia.id
	}));
	await mediaTagDb.bulkCreate(mediaTags);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newMedia);
};
export const getMediaDetail = async (req, res) => {
	const { mediaId } = req.params;
	const media = await mediaDb.findOne({ id: mediaId });

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, media);
};
export const updateMedia = async (req, res) => {
	const { mediaId: id } = req.params;
	const { tags } = req.body;
	await mediaDb.update(req.body, { id });

	if (tags && tags.length) {
		await Promise.all(
			tags.map(async (tag) => {
				await mediaTagDb.findOrCreate({ tagId: tag, mediaId: id });
			})
		);
	}

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};

export const getMedias = async (req, res) => {
	const { mediaType, imageType, search, byLanguage } = req.query;
	const { languageId } = req.body;
	const { limit, offset } = paginator(req.query);
	let conditions = { type: mediaType };
	if (!mediaTypes.includes(mediaType) || mediaType === 'all') {
		conditions = null;
	}
	if (imageType === 'Comic' || imageType === 'Fact Factory'){
		conditions = { ...conditions, imageType}
	}
	if (search) {
		conditions = { ...conditions, title: { [Op.iLike]: `%${search}%` } };
	}
	if (byLanguage) {
		conditions = { ...conditions, languageId, parentId: null };
	}
	const attributes = { exclude: ['languageId', 'updatedAt'] };
	const medias = await mediaDb.findAll(
		conditions,
		mediaIncludes,
		[['createdAt', 'DESC']],
		attributes,
		offset,
		limit
	);
	const mediasCount = await mediaDb.count(conditions);
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, medias, mediasCount);
};
