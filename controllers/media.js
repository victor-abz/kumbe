import { translate } from '../config';
import { getLang, QueryHelper, serverResponse } from '../helpers';
import { Media } from '../models';

const mediaDb = new QueryHelper(Media);
export const createMedia = async (req, res) => {
  const newMedia = await mediaDb.create(req.body);

  const lang = getLang(req);
  const message = translate[lang].success;
  return serverResponse(res, 201, message, newMedia);
};

export const getMedias = async (req, res) => {
  const mediaTypes = ['image', 'audio', 'video'];
  const { mediaType } = req.params;
  let conditions = { type: mediaType };
  if (!mediaTypes.includes(mediaType) || mediaType === 'all') {
    conditions = null;
  }
  const medias = await mediaDb.findAll(conditions, null, [
    ['createdAt', 'DESC']
  ]);

  const lang = getLang(req);
  const message = translate[lang].success;
  return serverResponse(res, 200, message, medias);
};
