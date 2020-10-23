import helmet from 'helmet';
import { validateMax } from 'express-content-length-validator';
import { ACCEPTED_FILE_SIZE } from '../helpers';
//Here you can spoof any back end
const SPOOFED_SERVER = 'Phusion Passenger (mod_rails/mod_rack) 3.0.11';

export const security = (app) => {
	app.use(
		validateMax({
			max: ACCEPTED_FILE_SIZE,
			status: 400,
			message: 'File is too large, please stop it!'
		})
	);
	app
		.use(helmet({ contentSecurityPolicy: false }))
		.use(helmet.noSniff())
		.use(helmet.frameguard({ action: 'deny' }))
		.use(helmet.xssFilter())
		.use(helmet.hidePoweredBy({ setTo: SPOOFED_SERVER }))
		.use(helmet.dnsPrefetchControl({ allow: false }));
};
