import Joi from 'joi';

export class ValidatorKeys {
  getAuthKeys(action) {
    const phoneReg = '^+[0-9]{2}(0)([0-9]{9}$';
    const login = {
      languageId: Joi.number(),
      username: Joi.string().required(),
      password: Joi.string().required()
    };
    const signUp = {
      ...login,
      phone: Joi.string().required(),
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string().valid('Male', 'Female').required()
    };
    return action === 'login' ? login : signUp;
  }
  getUserKeys() {
    return {
      languageId: Joi.number().required(),
      names: Joi.string().required(),
      phone: Joi.string().required(),
      username: Joi.string().required()
    };
  }
  getCategoryKeys() {
    return {
      name: Joi.string().required(),
      type: Joi.string(),
      languageId: Joi.number()
    };
  }
  getBlogKeys() {
    return {
      title: Joi.string().required(),
      coverImage: Joi.string(),
      content: Joi.string().required(),
      categoryId: Joi.number().required(),
      languageId: Joi.number().required(),
      tags: Joi.array().required(),
      isPublished: Joi.boolean()
    };
  }
  getTagKeys() {
    return {
      name: Joi.string().required(),
      color: Joi.string().required(),
      type: Joi.string().valid('blog', 'forum'),
      languageId: Joi.number()
    };
  }
}
