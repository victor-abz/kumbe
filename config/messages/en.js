const appName = process.env.APP_NAME || 'the';
export const en = {
	welcomeMesg: `Welcome to ${appName} platform`,
	notAuth: 'Ooh, the system does not know you',
	notAdmin: 'This action is for admin',
	notOwner: 'This action is for owner',
	notAdminOrOwner: 'This action is for admin or owner',
	notFound: 'Oops, you seem lost',
	success: 'Successfuly done',
	serverError:
		'Sorry the site might be in maintenanace, Try again or contact the site ADMIN',
	usernameTaken: 'The username has taken',
	alreadyAuth: 'You are already authenticatred',
	loginSuccess: (name) => `Welcome ${name}`,
	registerSuccess: (name) => `Thank you, ${name}, for registering`,
	userExists: 'Phone number, email or username has been taken',
	invalidLogin: 'Invalid user login info',
	invalidPwd: 'Invalid password',
	loginSuccess: (names) => `Welcome ${names}`,
	registerSuccess: (names) => `Thank you, ${names}, for registering`,
	dataNotFound: (type) => `${type} does not exist`,
	dataExist: (type) => `${type} has already been created`,
	fileError: 'Unknown file upload',
	notUploaded: 'File not uploaded',
	delRemainCount: (count) => `Remain ${3 - count} click(s)!`,
	invalidTag: 'Invalid tags',
	imageNotAllowed: 'Error: only (jpeg, jpg or png) images allowed',
	audioNotAllowed: 'Error: only (mp3, mpeg) audio allowed',
	logoutMsg: `Thank you for using ${appName}`,
	invalidReply: 'Invalid reply',
	imageTypeSelect: 'Select image type(Comic or Fact factory'
};
