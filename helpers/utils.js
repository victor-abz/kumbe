import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken';
import slugify from 'slugify';
import uniqid from 'uniqid';
import path from 'path';
import { translate } from '../config';
import { User, Language, SliderContent } from '../models';
import { QueryHelper } from './QueryHelper';
import { validate } from 'uuid';

const userDb = new QueryHelper(User);
export const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10, process.env.PASS_SALT);
	const hashPass = bcrypt.hashSync(password, salt);
	return hashPass;
};
export const unHashPassword = (password, hashedPass) => {
	return bcrypt.compareSync(password, hashedPass);
};
/**
 *
 * @param {Response} res Server response
 * @param {Number} statusCode Status code
 * @param {string} message Response message
 * @param {*} data Response data
 * @param {Number} totalItems All data for pagination
 */
export const serverResponse = (res, statusCode, message, data, totalItems) => {
	const messageType = statusCode >= 400 ? 'error' : 'message';
	return res
		.status(statusCode)
		.json({ status: statusCode, [messageType]: message, data, totalItems });
};
export const generatJWT = (userInfo) => {
	const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '1w' });
	return token;
};
export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const tokenGenerator = (tokenLength) => {
	const token = [];
	const chars = '0123456789';

	for (let i = 0; i < tokenLength; i += 1) {
		token.push(chars[getRandomInt(0, chars.length - 1)]);
	}
	return token.join('');
};
export const generateSlug = (title = 'unique') => {
	const uniqueId = uniqid.process();
	const slug = `${slugify(title, { lower: true })}-${uniqueId}`;
	return slug;
};
export const authenticatedUser = async (req) => {
	const { user, useragent, headers } = req;
	if (
		useragent.isFirefox ||
		useragent.isOpera ||
		useragent.isChromeOS ||
		useragent.isEdge
	) {
		const token = headers.authorization;
		try {
			const { id } = verify(token, process.env.SECRET);
			const user = await userDb.findOne({ id });
			if (user.id) {
				return user;
			}
		} catch (error) {
			return null;
		}
	} else if ((useragent.browser = 'PostmanRuntime' && req.isAuthenticated())) {
		return user;
	}
	return null;
};
export const paginator = ({ page = 0, pageSize = 20 }) => {
	const limit = pageSize ? +pageSize : 20;
	const offset = page && +page !== 0 ? (+page - 1) * limit : 0;
	return { limit, offset };
};
export const validTags = (tagIds = '') => {
	const newTags = tagIds.split(',').map((id) => {
		if (id && validate(id)) return id;
	});
	return newTags;
};
/**
 *
 * @param {string} name
 * @returns {string} Return a capitalized name
 */
export const ucFirst = (name) => {
	return name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};
/**
 *
 * @param {string} fullName A name to split into two
 * @returns {object} An object of two names
 */
export const toFirstLastName = (fullName) => {
	let names = {};

	if (fullName) {
		const nameArr = fullName.split(' ');
		names.lastName = nameArr.pop();
		names.firstName = ucFirst(nameArr.join(' '));
	}
	return names;
};

/**
 *
 * @param {File} file File info
 * @param {String} filePath Where file will be saved
 * @param {String} lang System languange
 * @param {Function} fileCallBack Callback function
 */
export const isFileAllowed = (file, filePath, lang, fileCallBack) => {
	const coverImages = process.env.BLOGS_ZONE;
	const images = process.env.IMAGES_ZONE;
	const audios = process.env.AUDIOS_ZONE;
	const profiles = process.env.PROFILES_ZONE;
	const thumbnails = process.env.THUMBNAILS_ZONE;
	// Allowed exts
	const allowedImages = /jpeg|jpg|png/;
	const allowedAudios = /mp3|mpeg/;
	// Check ext
	let extname = false;
	// Check mime
	let mimetype = false;
	let errorMessage = '';
	if (
		filePath === coverImages ||
		filePath === images ||
		filePath === profiles ||
		filePath === thumbnails
	) {
		extname = allowedImages.test(path.extname(file.originalname).toLowerCase());
		mimetype = allowedImages.test(file.mimetype);
		errorMessage = translate[lang].imageNotAllowed;
	}
	if (filePath === audios) {
		extname = allowedAudios.test(path.extname(file.originalname).toLowerCase());
		mimetype = allowedAudios.test(file.mimetype);
		errorMessage = translate[lang].audioNotAllowed;
	}

	if (mimetype && extname) {
		return fileCallBack(null, true);
	} else {
		return fileCallBack(errorMessage);
	}
};
export const createYtbThumbnail = (videoLink) => {
	const matchVId = videoLink.match('[\\?&]v=([^&#]*)');
	const videoId = matchVId === null ? '' : matchVId[1];
	const nFrameImg = `http://img.youtube.com/vi/${videoId}/0.jpg`;
	return nFrameImg;
};
export const saveNewSlider = async (
	textContents = [],
	uniqueSign = '',
	items = {}
) => {
	const sliderDb = new QueryHelper(SliderContent);
	const languageDb = new QueryHelper(Language);
	try {
		let slidersContents = [];
		/**
		 * Create tasks to adjust slider contents according to
		 * the appropriate language
		 */
		const tasks = textContents.map(
			async ({ lang, categoryId, ...restItem }) => {
				const language = await languageDb.findOne({ shortName: lang });
				if (language) {
					slidersContents.push({
						...items,
						...restItem,
						languageId: language.id,
						categoryId,
						uniqueSign
					});
				}
			}
		);
		// run the tasks
		await Promise.all(tasks);
		// Save the contents into DBs
		await sliderDb.bulkCreate(slidersContents);
	} catch (error) {
		throw new Error(error);
	}
};
