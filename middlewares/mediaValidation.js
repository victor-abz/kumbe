import { validate } from 'uuid';
import { translate } from '../config';
import { getLang, QueryHelper, serverResponse, Validator } from '../helpers';
import { Media } from '../models';

const mediaDb = new QueryHelper(Media);
export const isMediaValid = (req, res, next) => {
  const action = req.method === 'POST' ? 'add' : 'edit';
  let validator = new Validator(req.body);
  const error = validator.validateInput('media', action);

  if (!error) return next();
  return serverResponse(res, 400, error);
};
export const doesMediaExist = async (req, res, next) => {
  const { mediaId } = req.params;
  if (mediaId && validate(mediaId)) {
    const media = await mediaDb.findOne({ id: mediaId });
    if (media) {
      return next();
    }
  }
  const lang = getLang(req);
  const message = translate[lang].dataNotFound('Media');
  return serverResponse(res, 404, message);
};
