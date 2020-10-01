import { QueryHelper, serverResponse, Validator } from '../helpers';
import { Media } from '../models';

const mediaDb = new QueryHelper(Media);
export const isMediaValid = (req, res, next) => {
  let validator = new Validator(req.body);
  const error = validator.validateInput('media');

  if (!error) return next();
  return serverResponse(res, 400, error);
};
export const doesMediaExist = async (req, res, next) => {
  const { mediaId } = req.params;
  if (mediaId) {
    console.log('=====', mediaId);
    const media = await mediaDb.findOne({ title: mediaDb });

    if (media) {
      return next();
    }
  }
  const lang = getLang(req);
  const message = translate[lang].dataNotFound('Media');
  return serverResponse(res, 404, message);
};
