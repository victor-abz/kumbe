import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './models';
import { translate } from './config/messages';

dotenv.config();
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
app.get('/', (req, res) => {
  res.status(200).json({ message: translate['en'].welcomeMesg });
});
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
