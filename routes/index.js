import express, { Router } from 'express';
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
import { passportStrategy, socialAuthCallBack } from '../controllers/user';

const routes = Router();

routes.get('/', (req, res) => {
	const lang = getLang(req);
	return serverResponse(res, 200, translate[lang].welcomeMesg);
});
routes.use(monitorDevActions);
/**
 * APIs Version 1
 */
routes.use('/v1', catchErrors(setLanguage), apiRoutes);
/**
 * Social auth routes
 */
routes.get('/:strategy/auth', validateStrategy, passportStrategy);
routes.get('/:strategy/auth/callback', validateStrategy, socialAuthCallBack);
/**
 * Static resources
 */
routes.use('/res/audios', express.static(process.env.AUDIOS_ZONE));
routes.use('/res/images', express.static(process.env.IMAGES_ZONE));
routes.use('/res/blogs', express.static(process.env.BLOGS_ZONE));
routes.use('/res/profiles', express.static(process.env.PROFILES_ZONE));
routes.use('/res/thumbnails', express.static(process.env.THUMBNAILS_ZONE));
/**
 * API not found
 */
routes.all('/*', route404);

export default routes;
