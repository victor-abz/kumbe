import Joi from 'joi';
import { ValidatorKeys } from './ValidatorKeys';

export class Validator extends ValidatorKeys {
	constructor(data) {
		super();
		this.data = data;
	}

	validateInput(type, action) {
		let validationKeys = null;
		switch (type) {
			case 'auth':
				validationKeys = this.getAuthKeys(action);
				break;
			case 'user-update':
				validationKeys = this.getUserKeys();
				break;
			case 'category':
				validationKeys = this.getCategoryKeys();
				break;
			case 'blog':
				validationKeys = this.getBlogKeys(action);
				break;
			case 'tag':
				validationKeys = this.getTagKeys();
				break;
			case 'media':
				validationKeys = this.getMediaKeys(action);
				break;
			case 'comment':
				validationKeys = this.getCommentKeys(action);
				break;
			case 'question':
				validationKeys = this.getQuestionKeys(action);
				break;
			case 'reply':
				validationKeys = this.getReplyKeys(action);
				break;
			case 'product':
				validationKeys = this.getProductKeys(action);
				break;
			case 'partner':
				validationKeys = this.getPartnerKeys(action);
				break;
			case 'faq':
				validationKeys = this.getFAQuestionKeys(action);
				break;
			case 'slider':
				validationKeys = this.getSliderKeys(action);
				break;
			default:
				break;
		}
		const schema = Joi.object(validationKeys);
		const { error } = schema.validate(this.data);

		if (error) return this.getErrorMessage(error);
		return false;
	}
	getErrorMessage(error) {
		const errors = [];
		const errorsSent = error.details;

		for (let i = 0; i < errorsSent.length; i += 1) {
			errors.push(errorsSent[i].message.split('"').join(''));
		}
		return errors[0];
	}
}
