import { Blog, Category } from '../models';
import { serverResponse, QueryHelper, getLang, generateSlug } from '../helpers';
import { translate } from '../config';

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
  req.body.slug = generateSlug(req.body.title);
  req.body.userId = req.user.id;
  const newBlog = await blogDb.create(req.body);

  return serverResponse(res, 201, translate[lang].success, newBlog);
};
