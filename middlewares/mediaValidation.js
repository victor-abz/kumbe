import { serverResponse, Validator } from '../helpers';

export const isMediaValid = (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('media');

  if (!error) return next();
  return serverResponse(res, 400, error);
};
