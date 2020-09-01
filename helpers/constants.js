export const allowedLevels = [2, 3, 4];
export const msgs = {
  NOT_AUTH: 'Ooh, the system does not know you',
  NOT_ADMIN: 'This action is for admin',
  NOT_OWNER: 'This action is for owner',
  ADMIN_OR_OWNER: 'This action is for admin or owner',
  CRUD_ACTION: (item, action) => `${item} has successfully ${action}`,
  NOT_FOUND: (item) => `${item} is not found`,
  ROUTE_NOT_FOUND: 'Oops, you seem lost',
};
export const hour = 3600000;
export const day = hour * 24;
export const week = day * 7;
