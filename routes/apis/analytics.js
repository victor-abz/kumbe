import { Router } from 'express';
import { getAnalytics, getAnalyticsGraph } from '../../controllers/analytics';
import { catchErrors } from '../../middlewares/app';


const analyticsRoutes = Router();

/**
 * Routes for fetching google analytics
 */
analyticsRoutes.get('/', catchErrors(getAnalytics));
analyticsRoutes.get('/graph', catchErrors(getAnalyticsGraph));

export default analyticsRoutes;
