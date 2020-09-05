import { Validator, serverResponse, QueryHelper, getLang } from '../helpers';
import { Category } from '../models';
import { translate } from '../config';

let categoryDb = new QueryHelper(Category);
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
