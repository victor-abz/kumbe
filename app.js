import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import userAgent from 'express-useragent';
import { capture } from 'express-device';
import { sequelize } from './models';
import { localPassport, session, security } from './config';
import { handleErrors } from './middlewares/app';
import routes from './routes';

dotenv.config();
localPassport(passport);

const port = process.env.PORT || 3000;
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
app.use('/songs', express.static(process.env.SONGS_ZONE));
app.use('/images', express.static(process.env.IMAGES_ZONE));
app.use('/cover-images', express.static(process.env.BLOGS_ZONE));
/**
 * Catch unexpected errors
 */
app.use(handleErrors);
/**
 * Start express server
 */
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
