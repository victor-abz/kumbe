import { Validator } from './Validator';
import { User } from '../models';
import { QueryHelper } from './QueryHelper';

const userDb = new QueryHelper(User);
export const replyValidator = (replyContent = {}, replyCb) => {
	const validator = new Validator(replyContent);
	const error = validator.validateInput('reply');

	if (error) return replyCb(error);
	const { userId } = replyContent;
	userDb
		.findOne({ id: userId })
		.then((user) => {
			if (user) return replyCb(null, user.toJSON());
			return replyCb('Sorry, service not available');
		})
		.catch(() => replyCb('Sorry, service not available'));
};
