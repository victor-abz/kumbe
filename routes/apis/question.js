import { Router } from 'express';
import {
	createQuestion,
	createReply,
	getQuestions,
	getReplies,
	getOneQuestion,
	likeQuestion,
	reactToReply
} from '../../controllers/forum';
import { catchErrors } from '../../middlewares/app';
import { isAuthenticated } from '../../middlewares/auth';
import { doesCategoryExist } from '../../middlewares/blogValidation';
import {
	doesDiscussionExist,
	isQuestionInfoValid,
	isReplyInfoValid
} from '../../middlewares/forumValidation';

const questionRoutes = Router();

questionRoutes.post(
	'/',
	isAuthenticated,
	isQuestionInfoValid,
	doesCategoryExist,
	catchErrors(createQuestion)
);
questionRoutes.get('/', catchErrors(getQuestions));
questionRoutes.get(
	'/:questionId',
	catchErrors(doesDiscussionExist),
	catchErrors(getOneQuestion)
);
questionRoutes.post(
	'/:questionId/replies',
	catchErrors(isAuthenticated),
	isReplyInfoValid,
	catchErrors(doesDiscussionExist),
	catchErrors(createReply)
);
questionRoutes.get(
	'/:questionId/replies',
	catchErrors(doesDiscussionExist),
	catchErrors(getReplies)
);
questionRoutes.patch(
	'/:questionId/like',
	catchErrors(isAuthenticated),
	catchErrors(doesDiscussionExist),
	catchErrors(likeQuestion)
);
questionRoutes.patch(
	'/:replyId/reply-react/:type',
	catchErrors(isAuthenticated),
	catchErrors(doesDiscussionExist),
	catchErrors(reactToReply)
);

export default questionRoutes;
