import { Router } from 'express';
import { getTags, createTag } from '../../controllers/blog';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import { isTagValid } from '../../middlewares/blogValidation';

const tagRoutes = Router();

tagRoutes.post('/', isAtLeastAdmin, isTagValid, catchErrors(createTag));
tagRoutes.get('/', catchErrors(getTags));

export default tagRoutes;
