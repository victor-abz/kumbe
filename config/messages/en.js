const appName = process.env.APP_NAME || 'the';
export const en = {
  welcomeMesg: `Welcome to ${appName} platform`,
  notAuth: 'Ooh, the system does not know you',
  notAdmin: 'This action is for admin',
  notOwner: 'This action is for owner',
  notAdminOrOwner: 'This action is for admin or owner',
  notFound: 'Oops, you seem lost',
  success: 'Successfuly done',
  serverError: 'Service not available',
  usernameTaken: 'The username has taken',
  alreadyAuth: 'You are already authenticatred',
  loginSuccess: (names) => `Welcome ${names}`,
  registerSuccess: (names) => `Thank you, ${names}, for registering`
};
