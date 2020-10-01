import { translate } from '../config';
import { getLang, QueryHelper, serverResponse } from '../helpers';
import { Media, MediaTag } from '../models';

const mediaDb = new QueryHelper(Media);
const mediaTagDb = new QueryHelper(MediaTag);
export const createMedia = async (req, res) => {
  const newMedia = await mediaDb.create(req.body);
  const mediaTags = req.body.tags.map((tagId) => ({
    tagId,
    mediaId: newMedia.id
  }));
  await mediaTagDb.bulkCreate(mediaTags);

  const lang = getLang(req);
  const message = translate[lang].success;
  return serverResponse(res, 201, message, newMedia);
};
export const updateMedia = async (req, res) => {
  const { mediaId: id } = req.params;
  const { tags } = req.body;
  await mediaDb.update(req.body, { id });

  if (tags && tags.length) {
    await Promise.all(
      tags.map(async (tag) => {
        await mediaTagDb.findOrCreate({ tagId: tag, mediaId: id });
      })
    );
  }

  const lang = getLang(req);
  const message = translate[lang].success;
  return serverResponse(res, 201, message, newMedia);
};

export const getMedias = async (req, res) => {
  const mediaTypes = ['image', 'audio', 'video'];
  const { mediaType } = req.query;
  let conditions = { type: mediaType };
  if (!mediaTypes.includes(mediaType) || mediaType === 'all') {
    conditions = null;
  }
  const attributes = { exclude: ['languageId', 'createdAt', 'updatedAt'] };
  const medias = await mediaDb.findAll(
    conditions,
    null,
    [['createdAt', 'DESC']],
    attributes
  );

  const lang = getLang(req);
  const message = translate[lang].success;
  return serverResponse(res, 200, message, medias);
};
