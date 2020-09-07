import { Blog, Category } from '../models';
import {
  serverResponse,
  QueryHelper,
  getLang,
  generateSlug,
  paginator
} from '../helpers';
import { translate } from '../config';
import { blogIncludes } from '../helpers/modelIncludes';

const categoryDb = new QueryHelper(Category);
const blogDb = new QueryHelper(Blog);

export const createCategory = async (req, res) => {
  const lang = getLang(req);
  req.body.slug = generateSlug(req.body.name);
  const newCategory = await categoryDb.create(req.body);

  return serverResponse(res, 201, translate[lang].success, newCategory);
};
export const createBlog = async (req, res) => {
  const lang = getLang(req);
  console.log('The file', req.file);
  // req.body.slug = generateSlug(req.body.title);
  // req.body.coverImage = req.file.filename;
  // req.body.userId = req.user.id;
  // const newBlog = await blogDb.create(req.body);

  return serverResponse(res, 201, translate[lang].success);
};
export const getBlogs = async (req, res) => {
  const lang = getLang(req);
  const { languageId } = req.body;
  const { category } = req.query;
  const { offset, limit } = paginator(req.query);
  let orderBy = [['createdAt', 'DESC']];
  let whereConditions = { languageId };
  if (category === 'sample') {
    orderBy = [['title', 'ASC']];
  }
  if (!isNaN(category)) {
    whereConditions = {
      languageId,
      categoryId: category
    };
  }
  const blogs = await blogDb.findAll(
    whereConditions,
    blogIncludes,
    orderBy,
    null,
    offset,
    limit
  );

  const message = translate[lang].success;
  return serverResponse(res, 200, message, blogs);
};
export const getOneBlog = async (req, res) => {
  const lang = getLang(req);
  const { blogId: id } = req.params;

  const blog = await blogDb.findOne({ id }, blogIncludes);
  const message = translate[lang].success;
  return serverResponse(res, 200, message, blog);
};
export const deleteBlog = async (req, res) => {
  const lang = getLang(req);
  const { blogId: id } = req.params;
  const message = translate[lang].success;

  await blogDb.delete({ id });
  return serverResponse(res, 200, message);
};
