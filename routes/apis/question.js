import { Router } from 'express';
import {
	createQuestion,
	createReply,
	getQuestions,
	getReplies
} from '../../controllers/forum';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin, isAuthenticated } from '../../middlewares/auth';
import { doesCategoryExist } from '../../middlewares/blogValidation';
import {
	doesQuestionExist,
	isQuestionInfoValid,
	isReplyInfoValid
} from '../../middlewares/forumValidation';

const questionRoutes = Router();

questionRoutes.post(
	'/',
	isAtLeastAdmin,
	isQuestionInfoValid,
	doesCategoryExist,
	catchErrors(createQuestion)
);
questionRoutes.get('/', catchErrors(getQuestions));
questionRoutes.post(
	'/:questionId/replies',
	catchErrors(isAuthenticated),
	isReplyInfoValid,
	catchErrors(doesQuestionExist),
	catchErrors(createReply)
);
questionRoutes.get(
	'/:questionId/replies',
	catchErrors(doesQuestionExist),
	catchErrors(getReplies)
);

export default questionRoutes;
