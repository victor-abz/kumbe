import Joi from 'joi';

export class ValidatorKeys {
  getAuthKeys(action) {
    const phoneReg = '^+[0-9]{2}(0)([0-9]{9}$';
    const login = {
      languageId: Joi.string(),
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
      languageId: Joi.string().required(),
      names: Joi.string().required(),
      phone: Joi.string().required(),
      username: Joi.string().required()
    };
  }
  getCategoryKeys() {
    return {
      name: Joi.string().required(),
      type: Joi.string(),
      languageId: Joi.string()
    };
  }
  getBlogKeys(action) {
    return {
      title: Joi.string().required(),
      coverImage: Joi.string(),
      content: Joi.string().required(),
      categoryId: Joi.string().required(),
      languageId: Joi.string().required(),
      tags: Joi.array().required(),
      isPublished: Joi.boolean()
    };
  }
  getTagKeys() {
    return {
      name: Joi.string().required(),
      color: Joi.string().required(),
      type: Joi.string().valid('blog', 'forum', 'media'),
      languageId: Joi.string()
    };
  }
  getMediaKeys(action) {
    const basicKeys = {
      title: Joi.string().required(),
      type: Joi.string().valid('audio', 'image', 'video').required(),
      mediaLink: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array(),
      languageId: Joi.string()
    };
    const moreKeys = {
      ...basicKeys,
      tags: Joi.array(),
      thumbnail: Joi.string().required()
    };
    return action === 'add' ? basicKeys : moreKeys;
  }
}
