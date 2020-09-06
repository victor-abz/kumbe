import { Validator, serverResponse, QueryHelper, getLang } from '../helpers';
import { Category, Blog } from '../models';
import { translate } from '../config';

const categoryDb = new QueryHelper(Category);
const blogDb = new QueryHelper(Blog);
export const isCategoryValid = (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('category');

  if (!error) return next();
  return serverResponse(res, 400, error);
};
export const isBlogInfoValid = (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('blog');

  if (!error) return next();
  return serverResponse(res, 400, error);
};
export const doesCategoryExist = async (req, res, next) => {
  const categoryIdOrSlug = req.params.categoryId || req.body.categoryId;
  if (categoryIdOrSlug) {
    const attribute = isNaN(categoryIdOrSlug) ? 'slug' : 'id';
    const category = await categoryDb.findOne({
      [attribute]: categoryIdOrSlug
    });
    if (category) {
      req.params.categoryId = category.id;
      req.body.categoryId = category.id;
      return next();
    }
  }
  if (req.method === 'POST' && !categoryIdOrSlug) return next();
  const lang = getLang(req);
  const message = translate[lang].dataNotFound('Category');
  return serverResponse(res, 404, message);
};
export const doesBlogExist = async (req, res, next) => {
  const blogIdOrSlug = req.params.blogId || req.body.blogId;
  if (blogIdOrSlug) {
    const attribute = isNaN(blogIdOrSlug) ? 'slug' : 'id';
    const blog = await blogDb.findOne({
      [attribute]: blogIdOrSlug
    });
    if (blog) {
      req.params.blogId = blog.id;
      req.body.blogId = blog.id;
      return next();
    }
  }
  if (req.method === 'POST' && !blogIdOrSlug) return next();
  const lang = getLang(req);
  const message = translate[lang].dataNotFound('Blog');
  return serverResponse(res, 404, message);
};
