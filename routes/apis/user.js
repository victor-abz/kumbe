import { Router } from 'express';
import {
  getUsers,
  createNewUser,
  loginUser,
  signupUser,
} from '../../controllers/user';
import { catchErrors } from '../../middlewares/app';
import { isAuthenticated } from '../../middlewares/auth';

const userRoutes = Router();

userRoutes.get('/', isAuthenticated, catchErrors(getUsers));
userRoutes.post('/', catchErrors(createNewUser));
userRoutes.post('/login', catchErrors(loginUser));
userRoutes.post('/signup', catchErrors(signupUser));

export default userRoutes;
