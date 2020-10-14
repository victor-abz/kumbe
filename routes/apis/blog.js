import { Router } from 'express';
import {
	createBlog,
	getBlogs,
	getOneBlog,
	deleteBlog,
	updateBlog,
	publishBlog,
	createComment,
	getComments,
	approveComment
} from '../../controllers/blog';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin, isAuthenticated } from '../../middlewares/auth';
import {
	isBlogInfoValid,
	doesCategoryExist,
	doesBlogExist,
	areTagsValid,
	isCommentValid,
	doesCommitExist
} from '../../middlewares/blogValidation';

const blogRoutes = Router();

blogRoutes.post(
	'/',
	catchErrors(isAtLeastAdmin),
	catchErrors(isBlogInfoValid),
	catchErrors(areTagsValid),
	catchErrors(doesCategoryExist),
	catchErrors(createBlog)
);
blogRoutes.patch(
	'/:blogId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesBlogExist),
	catchErrors(isBlogInfoValid),
	catchErrors(areTagsValid),
	catchErrors(doesCategoryExist),
	catchErrors(updateBlog)
);
blogRoutes.put(
	'/publish/:blogId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesBlogExist),
	catchErrors(isBlogInfoValid),
	catchErrors(publishBlog)
);
blogRoutes.get('/', catchErrors(getBlogs));
blogRoutes.get('/:blogId', catchErrors(doesBlogExist), catchErrors(getOneBlog));
blogRoutes.delete(
	'/:blogId',
	catchErrors(doesBlogExist),
	catchErrors(deleteBlog)
);
blogRoutes.post(
	'/:blogId/comments',
	catchErrors(isAuthenticated),
	catchErrors(doesBlogExist),
	isCommentValid,
	catchErrors(createComment)
);
blogRoutes.get(
	'/:blogId/comments',
	catchErrors(doesBlogExist),
	catchErrors(getComments)
);
blogRoutes.get(
	'/:blogId/comments',
	catchErrors(doesBlogExist),
	catchErrors(getComments)
);
blogRoutes.get('/comments/all', catchErrors(getComments));
blogRoutes.patch(
	'/comments/:commentId/approve',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesCommitExist),
	catchErrors(approveComment)
);

export default blogRoutes;
