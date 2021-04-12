import Joi from 'joi';

export class ValidatorKeys {
	getAuthKeys(action) {
		const phoneReg = '^+[0-9]{2}(0)([0-9]{9}$';
		const login = {
			languageId: Joi.string(),
			username: Joi.string().required(),
			password: Joi.string().required()
		};
		const signUp = {
			...login,
			phone: Joi.string().required(),
			username: Joi.string().required(),
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			gender: Joi.string().valid('Male', 'Female').required()
		};
		return action === 'login' ? login : signUp;
	}
	getUserKeys() {
		return {
			languageId: Joi.string().required(),
			phone: Joi.string(),
			firstName: Joi.string(),
			lastName: Joi.string(),
			profilePic: Joi.string(),
			username: Joi.string()
		};
	}
	getCategoryKeys() {
		return {
			name: Joi.string().required(),
			type: Joi.string(),
			languageId: Joi.string()
		};
	}
	getBlogKeys(action) {
		if (action === 'publish') {
			return {
				isPublished: Joi.boolean().required(),
				languageId: Joi.string().required(),
				blogId: Joi.string()
			};
		}
		return {
			title: Joi.string().required(),
			coverImage: Joi.string(),
			content: Joi.string().required(),
			categoryId: Joi.string().required(),
			languageId: Joi.string().required(),
			tags: Joi.array().required(),
			isPublished: Joi.boolean(),
			blogId: Joi.string()
		};
	}
	getTagKeys() {
		return {
			name: Joi.string().required(),
			color: Joi.string().required(),
			type: Joi.string().valid('blog', 'forum', 'media'),
			languageId: Joi.string()
		};
	}
	getMediaKeys(action) {
		const basicKeys = {
			title: Joi.string().required(),
			description: Joi.string().required(),
			type: Joi.string().valid('audio', 'image', 'video').required(),
			imageType: Joi.string().valid('Comic', 'Fact Factory'),
			mediaLink: Joi.string().required(),
			tags: Joi.array(),
			languageId: Joi.string()
		};
		const moreKeys = {
			...basicKeys,
			tags: Joi.array(),
			thumbnail: Joi.string().required()
		};
		return action === 'add' ? basicKeys : moreKeys;
	}
	getCommentKeys() {
		return {
			content: Joi.string().required(),
			languageId: Joi.string(),
			blogId: Joi.string()
		};
	}
	getQuestionKeys(action) {
		return {
			content: Joi.string().required(),
			anonymous: Joi.boolean().required(),
			categoryId: Joi.string().required(),
			languageId: Joi.string()
		};
	}
	getReplyKeys(action) {
		return {
			content: Joi.string().required(),
			anonymous: Joi.boolean().required(),
			type: Joi.string().valid('reply', 'question').required(),
			discussionId: Joi.string(),
			parentId: Joi.string(),
			languageId: Joi.string()
		};
	}
	getProductKeys(action) {
		return {
			name: Joi.string().required(),
			coverImage: Joi.string().required(),
			languageId: Joi.string()
		};
	}
	getPartnerKeys(action) {
		return {
			name: Joi.string().required(),
			coverImage: Joi.string().required(),
			languageId: Joi.string()
		};
	}
	getFAQuestionKeys() {
		return {
			question: Joi.string().required(),
			answer: Joi.string().required(),
			languageId: Joi.string()
		};
	}
	getSliderKeys() {
		return {
			position: Joi.string().valid('left', 'right').required(),
			titleColor: Joi.string().required(),
			bgColor: Joi.string().required(),
			captionColor: Joi.string().required(),
			imageLink: Joi.string().required(),
			languageId: Joi.string(),
			textContents: Joi.array()
				.required()
				.items({
					lang: Joi.string().valid('kin', 'en').required(),
					title: Joi.string().required(),
					caption: Joi.string().required(),
					clickText: Joi.string().required(),
					categoryId: Joi.string().required()
				})
		};
	}
}
