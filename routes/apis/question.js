import { Router } from 'express';
import {
	createQuestion,
	getQuestions,
	getReplies
} from '../../controllers/forum';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
	areTagsValid,
	doesCategoryExist
} from '../../middlewares/blogValidation';
import {
	doesQuestionExist,
	isQuestionInfoValid
} from '../../middlewares/forumValidation';

const questionRoutes = Router();

questionRoutes.post(
	'/',
	isAtLeastAdmin,
	isQuestionInfoValid,
	doesCategoryExist,
	catchErrors(areTagsValid),
	catchErrors(createQuestion)
);
questionRoutes.get('/', catchErrors(getQuestions));
questionRoutes.get(
	'/:questionId/replies',
	catchErrors(doesQuestionExist),
	catchErrors(getReplies)
);

export default questionRoutes;
