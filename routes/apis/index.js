import { Router } from 'express';
import userRoutes from './user';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);

export default apiRoutes;
