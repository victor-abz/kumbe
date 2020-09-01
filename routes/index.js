import { Router } from 'express';
import { monitorDevActions, route404 } from '../middlewares/app';
import apiRoutes from './apis';
import { serverResponse } from '../helpers';
import { translate } from '../config';

const routes = Router();

routes.get('/', (req, res) => {
  serverResponse(res, 200, translate['en'].welcomeMesg);
});
routes.use(monitorDevActions);
routes.use('/api', apiRoutes);
routes.all('*', route404);

export default routes;
