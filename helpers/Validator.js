import Joi from 'joi';
import { ValidatorKeys } from './ValidatorKeys';

export class Validator extends ValidatorKeys {
  constructor(data) {
    super();
    this.data = data;
  }

  validateInput(type, action) {
    let validationKeys = null;
    switch (type) {
      case 'user':
        validationKeys = this.getAuthKeys(action);
        break;
      default:
        break;
    }
    const schema = Joi.object(validationKeys);
    return schema.validate(this.data);
  }
  getErrorMessage(error) {
    const errors = [];
    const errorsSent = error.details;

    for (let i = 0; i < errorsSent.length; i += 1) {
      errors.push(errorsSent[i].message.split('"').join(''));
    }
    return errors[0];
  }
}
