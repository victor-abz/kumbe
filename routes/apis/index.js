import { Router } from 'express';
import userRoutes from './user';
import categoryRoutes from './category';
import blogRoutes from './blog';
import tagRoutes from './tag';
import { uploadFile } from '../../middlewares/fileUploader';
import { catchErrors } from '../../middlewares/app';
import mediaRoutes from './media';
import questionRoutes from './question';
import productRoutes from './product';
import partnerRoutes from './partner';
import manageRouter from './manage';
import analyticsRoutes from './analytics';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/blogs', blogRoutes);
apiRoutes.use('/tags', tagRoutes);
apiRoutes.use('/medias', mediaRoutes);
apiRoutes.use('/questions', questionRoutes);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/partners', partnerRoutes);
apiRoutes.use('/manage/faqs', manageRouter);
apiRoutes.use('/analytics', analyticsRoutes);
apiRoutes.post('/upload/:fileType', catchErrors(uploadFile));

export default apiRoutes;
