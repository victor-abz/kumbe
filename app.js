import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import userAgent from 'express-useragent';
import { capture } from 'express-device';
import { sequelize } from './models';
import { localPassport, session, security, appSocket } from './config';
import { handleErrors } from './middlewares/app';
import routes from './routes';

dotenv.config();
localPassport();

sequelize
	.authenticate()
	.then(() => console.log('Database connected'))
	.catch((error) => {
		console.log(`DB configuration error: ${error.message}`);
		process.exit(1);
	});
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(userAgent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(capture());
app.use(session());

security(app);
/**
 * Initialize passport and session
 */
app.use(passport.initialize());
app.use(passport.session());
/**
 * App routes
 */
app.use(routes);
/**
 * Catch unexpected errors
 */
app.use(handleErrors);
/**
 * Connect socket
 */
appSocket(app);

export default app;
