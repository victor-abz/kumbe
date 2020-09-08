import { Router } from 'express';
import userRoutes from './user';
import categoryRoutes from './category';
import blogRoutes from './blog';
import tagRoutes from './tag';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/blogs', blogRoutes);
apiRoutes.use('/tags', tagRoutes);

export default apiRoutes;
