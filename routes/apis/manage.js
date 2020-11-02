import { Router } from 'express';
import {
	addFAQuestion,
	deleteFAQuestion,
	editFAQuestion,
	getFAQuestions
} from '../../controllers/adminSetting';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import { doesFAQExit, isFAQValid } from '../../middlewares/manageValidation';

const manageRouter = Router();

manageRouter.post(
	'/',
	catchErrors(isAtLeastAdmin),
	isFAQValid,
	catchErrors(addFAQuestion)
);
manageRouter.get('/', catchErrors(getFAQuestions));
manageRouter.patch(
	'/:questionId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesFAQExit),
	isFAQValid,
	catchErrors(editFAQuestion)
);
manageRouter.delete(
	'/:questionId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesFAQExit),
	catchErrors(deleteFAQuestion)
);

export default manageRouter;
