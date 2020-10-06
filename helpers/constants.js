export const allowedLevels = [2, 3, 4];
export const hour = 3600000;
export const day = hour * 24;
export const week = day * 7;
export const getLang = (req) => req.acceptsLanguages('en', 'kin') || 'en';
export const allowedStrategies = ['google', 'facebook', 'twitter'];
const MB = 1024 * 1024;
export const ACCEPTED_FILE_SIZE = 100 * MB; //100 mbs
