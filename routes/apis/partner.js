import { Router } from 'express';
import {
	createPartner,
	deletePartner,
	getPartners
} from '../../controllers/partner';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
	doesPartnerExist,
	isPartnerInfoValid
} from '../../middlewares/partnerValidation';

const partnerRoutes = Router();
partnerRoutes.post(
	'/',
	catchErrors(isAtLeastAdmin),
	catchErrors(isPartnerInfoValid),
	catchErrors(createPartner)
);
partnerRoutes.get('/', catchErrors(getPartners));
partnerRoutes.delete(
	'/:partnerId',
	catchErrors(doesPartnerExist),
	catchErrors(deletePartner)
);

export default partnerRoutes;
