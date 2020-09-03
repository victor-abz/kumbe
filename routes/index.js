import { Router } from 'express';
import {
  monitorDevActions,
  route404,
  catchErrors,
  setLanguage
} from '../middlewares/app';
import apiRoutes from './apis';
import { serverResponse } from '../helpers';
import { translate } from '../config';

const routes = Router();

routes.get('/', (req, res) => {
  const headerLang = req.acceptsLanguages('en', 'kn') || 'kn';
  serverResponse(res, 200, translate[headerLang].welcomeMesg);
});
routes.use(monitorDevActions);
routes.use('/api', catchErrors(setLanguage), apiRoutes);
routes.all('*', route404);

export default routes;
