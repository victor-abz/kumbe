import { Router } from 'express';
import { createCategory } from '../../controllers/blog';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import { isCategoryValid } from '../../middlewares/blogValidation';

const categoryRoutes = Router();

categoryRoutes.post(
  '/',
  isAtLeastAdmin,
  isCategoryValid,
  catchErrors(createCategory)
);

export default categoryRoutes;
