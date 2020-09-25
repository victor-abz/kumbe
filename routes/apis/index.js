import express, { Router } from 'express';
import userRoutes from './user';
import categoryRoutes from './category';
import blogRoutes from './blog';
import tagRoutes from './tag';
import { uploadFile } from '../../middlewares/fileUploader';
import { validateStrategy } from '../../middlewares/app';
import { passportStrategy, socialAuthCallBack } from '../../controllers/user';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/blogs', blogRoutes);
apiRoutes.use('/tags', tagRoutes);
apiRoutes.post('/upload/:fileType', uploadFile);
/**
 * Social auth routes
 */
apiRoutes.get('/:strategy/auth', validateStrategy, passportStrategy);
apiRoutes.get('/:strategy/auth/callback', validateStrategy, socialAuthCallBack);
/**
 * Static resources
 */
apiRoutes.use('/res/songs', express.static(process.env.SONGS_ZONE));
apiRoutes.use('/res/blogs', express.static(process.env.BLOGS_ZONE));
apiRoutes.use('/res/cover-images', express.static(process.env.IMAGES_ZONE));

export default apiRoutes;
