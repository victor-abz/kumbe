import { Router } from 'express';
import {
  monitorDevActions,
  route404,
  catchErrors,
  setLanguage,
  validateStrategy
} from '../middlewares/app';
import apiRoutes from './apis';
import { serverResponse, getLang } from '../helpers';
import { translate } from '../config';

const routes = Router();

routes.get('/', (req, res) => {
  const lang = getLang(req);
  serverResponse(res, 200, translate[lang].welcomeMesg);
});
routes.use(monitorDevActions);
routes.use('/api', catchErrors(setLanguage), apiRoutes);
routes.all('*', route404);

export default routes;
