import { Router } from 'express';
import passport from 'passport';
import {
  monitorDevActions,
  route404,
  catchErrors,
  setLanguage
} from '../middlewares/app';
import apiRoutes from './apis';
import { serverResponse, getLang } from '../helpers';
import { translate } from '../config';
import { googleCallBack } from '../controllers/user';

const routes = Router();

routes.get('/', (req, res) => {
  const lang = getLang(req);
  serverResponse(res, 200, translate[lang].welcomeMesg);
});
routes.use(monitorDevActions);
routes.use('/api', catchErrors(setLanguage), apiRoutes);
routes.get(
  '/google/auth',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
routes.get('/google/auth/callback', googleCallBack);
routes.all('*', route404);

export default routes;
