import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import { sequelize } from './models';
import { translate, localPassport, session } from './config';
import { handleErrors } from './middlewares/app';

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session());

/**
 * Initialize passport and session
 */
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).json({ message: translate['en'].welcomeMesg });
});
/**
 * Catch unexpected errors
 */
app.use(handleErrors);
/**
 * Start express server
 */
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
