import { Router } from 'express';
import {
	addFAQuestion,
	createNewSlider,
	deleteFAQuestion,
	deleteSlider,
	editFAQuestion,
	getFAQuestions,
	getSliders,
	updateSlider
} from '../../controllers/adminSetting';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
	doesCategoryExist,
	doSliderCategoriesExist
} from '../../middlewares/blogValidation';
import {
	doesFAQExit,
	doesSliderExit,
	isFAQValid,
	isSliderValid
} from '../../middlewares/manageValidation';

const manageRouter = Router();

manageRouter.post(
	'/faqs',
	catchErrors(isAtLeastAdmin),
	isFAQValid,
	catchErrors(addFAQuestion)
);
manageRouter.get('/faqs', catchErrors(getFAQuestions));
manageRouter.patch(
	'/faqs/:questionId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesFAQExit),
	isFAQValid,
	catchErrors(editFAQuestion)
);
manageRouter.delete(
	'/faqs/:questionId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesFAQExit),
	catchErrors(deleteFAQuestion)
);
manageRouter.post(
	'/sliders',
	catchErrors(isAtLeastAdmin),
	isSliderValid,
	catchErrors(doesCategoryExist),
	catchErrors(createNewSlider)
);
manageRouter.get('/sliders', catchErrors(getSliders));
manageRouter.patch(
	'/sliders/:sliderId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesSliderExit),
	isSliderValid,
	catchErrors(doSliderCategoriesExist),
	catchErrors(updateSlider)
);
manageRouter.delete(
	'/sliders/:sliderId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesSliderExit),
	catchErrors(deleteSlider)
);

export default manageRouter;
