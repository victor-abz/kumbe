import { Router } from 'express';
import { createQuestion, getQuestions } from '../../controllers/forum';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
	areTagsValid,
	doesCategoryExist
} from '../../middlewares/blogValidation';
import { isQuestionInfoValid } from '../../middlewares/forumValidation';

const questionRoutes = Router();

questionRoutes.post(
	'/',
	isAtLeastAdmin,
	isQuestionInfoValid,
	doesCategoryExist(),
	catchErrors(areTagsValid),
	catchErrors(createQuestion)
);
questionRoutes.get('/', catchErrors(getQuestions));

export default questionRoutes;
