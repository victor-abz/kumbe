import { Router } from 'express';
import { getAnalytics } from '../../controllers/analytics';
import { catchErrors } from '../../middlewares/app';


const analyticsRoutes = Router();

/**
 * Routes for fetching google analytics
 */
analyticsRoutes.get('/', catchErrors(getAnalytics));

export default analyticsRoutes;
