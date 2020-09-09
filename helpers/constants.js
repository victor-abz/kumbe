export const allowedLevels = [2, 3, 4];
export const hour = 3600000;
export const day = hour * 24;
export const week = day * 7;
export const getLang = (req) => req.acceptsLanguages('en', 'kn') || 'en';
export const allowedStrategies = ['google', 'facebook'];
