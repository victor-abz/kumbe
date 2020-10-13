import { Validator } from './Validator';

export const isReplyValid = (replyContent = {}) => {
	const validator = new Validator(replyContent);
	const error = validator.validateInput('reply');
};
