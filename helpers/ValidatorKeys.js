import Joi from 'joi';

export class ValidatorKeys {
  getAuthKeys(action) {
    const login = {
      languageId: Joi.number(),
      username: Joi.string().required(),
      password: Joi.string().required()
    };
    const signUp = {
      ...login,
      phone: Joi.string().required(),
      username: Joi.string().required(),
      accessLevel: Joi.number().required(),
      names: Joi.string().required(),
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
}
