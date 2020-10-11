import { Router } from 'express';
import {
  getUsers,
  createNewUser,
  loginUser,
  signupUser,
  logoutUser,
  updateProfile,
  getUserProfile
} from '../../controllers/user';
import { catchErrors } from '../../middlewares/app';
import { isAuthenticated } from '../../middlewares/auth';
import {
  isLoginInfoValid,
  isSignUpInfoValid,
  isUpdateUserInfoValid
} from '../../middlewares/userValidation';

const userRoutes = Router();

userRoutes.get('/', isAuthenticated, catchErrors(getUsers));
userRoutes.post('/', catchErrors(createNewUser));
userRoutes.patch(
  '/update',
  isAuthenticated,
  catchErrors(isUpdateUserInfoValid),
  catchErrors(updateProfile)
);
userRoutes.get('/profile', isAuthenticated, getUserProfile);
userRoutes.post('/login', isLoginInfoValid, catchErrors(loginUser));
userRoutes.post('/signup', isSignUpInfoValid, catchErrors(signupUser));
userRoutes.use('/logout', logoutUser);

export default userRoutes;
