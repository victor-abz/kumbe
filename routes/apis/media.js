import { Router } from 'express';
import {
  createMedia,
  getMediaDetail,
  getMedias,
  updateMedia
} from '../../controllers/media';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import { areTagsValid } from '../../middlewares/blogValidation';
import {
  doesMediaExist,
  isMediaValid
} from '../../middlewares/mediaValidation';

const mediaRoutes = Router();

mediaRoutes.post(
  '/',
  isAtLeastAdmin,
  isMediaValid,
  catchErrors(areTagsValid),
  catchErrors(createMedia)
);
mediaRoutes.get(
  '/:mediaId',
  catchErrors(doesMediaExist),
  catchErrors(getMediaDetail)
);
mediaRoutes.patch(
  '/:mediaId',
  catchErrors(doesMediaExist),
  isMediaValid,
  catchErrors(updateMedia)
);
mediaRoutes.get('/', catchErrors(getMedias));

export default mediaRoutes;
