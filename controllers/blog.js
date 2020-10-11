import { validate } from 'uuid';
import { Blog, Category, Tag, BlogTag } from '../models';
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
const tagDb = new QueryHelper(Tag);
const blogTagDb = new QueryHelper(BlogTag);

export const createCategory = async (req, res) => {
  const lang = getLang(req);
  req.body.slug = generateSlug(req.body.name);
  const { name, slug, type = 'blog', languageId } = req.body;
  const newCategory = await categoryDb.findOrCreate(
    { name, type, languageId },
    { slug }
  );

  return serverResponse(res, 201, translate[lang].success, newCategory);
};
export const getCategories = async (req, res) => {
  const lang = getLang(req);
  const { languageId } = req.body;
  const { categoryType = 'blog' } = req.query;
  const categories = await categoryDb.findAll({
    languageId,
    type: categoryType
  });
  return serverResponse(res, 200, translate[lang].success, categories);
};
export const updateCategory = async (req, res) => {
  const lang = getLang(req);
  let { slug, name, categoryId: id } = req.body;
  slug = generateSlug(name);
  await categoryDb.update({ slug, name }, { id });

  return serverResponse(res, 201, translate[lang].success);
};
export const deleteCategory = async (req, res) => {
  let { categoryId: id } = req.body;
  let { accessCount } = req.session;
  const lang = getLang(req);
  if (!accessCount || accessCount < 3) {
    req.session.accessCount = accessCount ? accessCount + 1 : 1;
    req.session.save();
    const message = translate[lang].delRemainCount(req.session.accessCount);

    return serverResponse(res, 409, message, req.session.accessCount);
  }
  await categoryDb.delete({ id });
  req.session.accessCount = 0;
  req.session.save();
  return serverResponse(res, 201, translate[lang].success);
};
export const createBlog = async (req, res) => {
  const lang = getLang(req);
  req.body.slug = generateSlug(req.body.title);
  req.body.userId = req.user.id;
  const newBlog = await blogDb.create(req.body);
  const blogTags = req.body.tags.map((tagId) => ({
    tagId,
    blogId: newBlog.id
  }));
  await blogTagDb.bulkCreate(blogTags);

  return serverResponse(res, 201, translate[lang].success);
};
export const updateBlog = async (req, res) => {
  const lang = getLang(req);
  const { blogId: id } = req.params;
  const { tags } = req.body;
  if (req.body.title) {
    req.body.slug = generateSlug(req.body.title);
  }

  await blogDb.update(req.body, { id });
  /**
   * Delete all tags first
   * Then 
   * Save the tags sent fron client
   */
  if(tags.length){
    await blogTagDb.delete({blogId:id})
    const blogTags = tags.map((tagId) => ({tagId, blogId: id}));
    await blogTagDb.bulkCreate(blogTags);
  }

  return serverResponse(res, 200, translate[lang].success);
};
export const publishBlog = async (req, res)=>{
  const lang = getLang(req);
  const {isPublished, blogId} = req.body

  await blogDb.update({isPublished}, {id:blogId})

  const message = translate[lang].success;
  return serverResponse(res, 200, message);
}
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
  if (validate(category)) {
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
export const createTag = async (req, res) => {
  let { name, color, languageId, type = 'blog' } = req.body;
  const lang = getLang(req);

  const newTag = await tagDb.findOrCreate(
    { name, languageId, type },
    { color }
  );
  const message = translate[lang].success;
  return serverResponse(res, 200, message, newTag);
};
export const getTags = async (req, res) => {
  const lang = getLang(req);
  const { languageId } = req.body;
  let { tagType = 'blog' } = req.query;

  const tags = await tagDb.findAll({ languageId, type: tagType });

  const message = translate[lang].success;
  return serverResponse(res, 200, message, tags);
};
