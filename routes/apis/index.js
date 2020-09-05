import { Router } from 'express';
import userRoutes from './user';
import categoryRoutes from './category';
import blogRoutes from './blog';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/blogs', blogRoutes);

export default apiRoutes;
