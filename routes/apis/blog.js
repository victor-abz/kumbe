import { Router } from 'express';
import {
  createBlog,
  getBlogs,
  getOneBlog,
  deleteBlog
} from '../../controllers/blog';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
  isBlogInfoValid,
  doesCategoryExist,
  doesBlogExist,
  areTagsValid
} from '../../middlewares/blogValidation';
import { upload } from '../../middlewares/fileUploader';

const blogRoutes = Router();

blogRoutes.post(
  '/',
  catchErrors(isAtLeastAdmin),
  catchErrors(isBlogInfoValid),
  catchErrors(areTagsValid),
  catchErrors(doesCategoryExist),
  catchErrors(createBlog)
);
blogRoutes.get('/', catchErrors(getBlogs));
blogRoutes.get('/:blogId', catchErrors(doesBlogExist), catchErrors(getOneBlog));
blogRoutes.delete(
  '/:blogId',
  catchErrors(doesBlogExist),
  catchErrors(deleteBlog)
);

export default blogRoutes;
