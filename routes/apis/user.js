import { Router } from 'express';
import {
	getUsers,
	createNewUser,
	loginUser,
	signupUser,
	logoutUser,
	updateProfile,
	getUserProfile,
	changeAccessLevel
} from '../../controllers/user';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin, isAuthenticated } from '../../middlewares/auth';
import {
	isLoginInfoValid,
	isSignUpInfoValid,
	isUpdateALevelValid,
	isUpdateUserInfoValid
} from '../../middlewares/userValidation';

const userRoutes = Router();

userRoutes.get('/', catchErrors(isAtLeastAdmin), catchErrors(getUsers));
userRoutes.post('/', catchErrors(createNewUser));
userRoutes.patch(
	'/update',
	isAuthenticated,
	catchErrors(isUpdateUserInfoValid),
	catchErrors(updateProfile)
);
userRoutes.post(
	'/update/:userId',
	isAtLeastAdmin,
	catchErrors(isUpdateALevelValid),
	catchErrors(changeAccessLevel)
);
userRoutes.get('/profile', isAuthenticated, getUserProfile);
userRoutes.post('/login', isLoginInfoValid, catchErrors(loginUser));
userRoutes.post('/signup', isSignUpInfoValid, catchErrors(signupUser));
userRoutes.use('/logout', logoutUser);

export default userRoutes;
