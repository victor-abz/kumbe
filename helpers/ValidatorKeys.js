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
}
