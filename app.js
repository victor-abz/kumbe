import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import userAgent from 'express-useragent';
import socketIo from 'socket.io';
import { capture } from 'express-device';
import { sequelize } from './models';
import { localPassport, session, security, appSocket } from './config';
import { catchErrors, handleErrors } from './middlewares/app';
import routes from './routes';

dotenv.config();
localPassport();

sequelize
	.authenticate()
	.then(() => process.stdout.write('Database connected'))
	.catch((error) => {
		process.stdout.write(`DB configuration error: ${error.message}\n`);
		process.exit(1);
	});
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(userAgent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/build'));
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
app.use('/api', routes);
/**
 * Running the frontend
 */
app.get(
	'/*',
	catchErrors((req, res) => {
		return res.sendFile(path.resolve(__dirname + '/build', 'index.html'));
	})
);
/**
 * Catch unexpected errors
 */
app.use(handleErrors);
/**
 * Start express server
 */
const server = app.listen(port, () => {
	process.stdout.write(`Server is running on port: ${port}\n`);
});
/**
 * Connect socket
 */
global.io = socketIo(server);
global.io.on('connection', appSocket.connection);
