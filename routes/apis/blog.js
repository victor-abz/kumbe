import { Router } from 'express';
import { createBlog } from '../../controllers/blog';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
  isBlogInfoValid,
  doesCategoryExist
} from '../../middlewares/blogValidation';

const blogRoutes = Router();

blogRoutes.post(
  '/',
  catchErrors(isAtLeastAdmin),
  isBlogInfoValid,
  catchErrors(doesCategoryExist),
  catchErrors(createBlog)
);

export default blogRoutes;
