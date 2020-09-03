import Joi from 'joi';

export class ValidatorKeys {
  getAuthKeys(action) {
    const login = {
      email: Joi.string().email(),
      username: Joi.string(),
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
      names: Joi.string().required(),
      phone: Joi.string().required(),
      username: Joi.string().required()
    };
  }
}
