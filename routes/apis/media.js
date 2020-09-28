import { Router } from 'express';
import { createMedia, getMedias } from '../../controllers/media';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import { isMediaValid } from '../../middlewares/mediaValidation';

const mediaRoutes = Router();

mediaRoutes.post('/', isAtLeastAdmin, isMediaValid, catchErrors(createMedia));
mediaRoutes.get('/:mediaType', catchErrors(getMedias));

export default mediaRoutes;
