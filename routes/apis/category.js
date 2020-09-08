import { Router } from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
} from '../../controllers/blog';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
  isCategoryValid,
  doesCategoryExist
} from '../../middlewares/blogValidation';

const categoryRoutes = Router();

categoryRoutes.post(
  '/',
  isAtLeastAdmin,
  isCategoryValid,
  catchErrors(createCategory)
);
categoryRoutes.get('/', catchErrors(getCategories));
categoryRoutes.patch(
  '/:categoryId',
  isAtLeastAdmin,
  catchErrors(doesCategoryExist),
  isCategoryValid,
  catchErrors(updateCategory)
);
categoryRoutes.delete(
  '/:categoryId',
  isAtLeastAdmin,
  catchErrors(doesCategoryExist),
  catchErrors(deleteCategory)
);

export default categoryRoutes;
