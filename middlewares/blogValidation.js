import { validate } from 'uuid';
import { Validator, serverResponse, QueryHelper, getLang } from '../helpers';
import { Category, Blog, Tag } from '../models';
import { translate } from '../config';

const categoryDb = new QueryHelper(Category);
const blogDb = new QueryHelper(Blog);
const tagDb = new QueryHelper(Tag);
export const isCategoryValid = (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('category');

  if (!error) return next();
  return serverResponse(res, 400, error);
};
export const isBlogInfoValid = async (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('blog');

  if (error) return serverResponse(res, 400, error);
  return next();
};
export const areTagsValid = async (req, res, next) => {
  let tags = [];
  await Promise.all(
    req.body.tags.map(async (tag) => {
      const thisTag = await tagDb.findOne({ id: tag });
      if (thisTag) tags.push(tag);
    })
  );
  if (tags.length) {
    req.body.tags = tags;
    return next();
  }
  const lang = getLang(req);
  const message = translate[lang].invalidTag;
  return serverResponse(res, 404, message);
};
export const doesCategoryExist = async (req, res, next) => {
  const categoryIdOrSlug = req.params.categoryId || req.body.categoryId;
  if (categoryIdOrSlug) {
    const attribute = validate(categoryIdOrSlug) ? 'id' : 'slug';
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
    const attribute = validate(blogIdOrSlug) ? 'id' : 'slug';
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
export const isTagValid = async (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('tag');

  if (!error) return next();
  return serverResponse(res, 400, error);
};
