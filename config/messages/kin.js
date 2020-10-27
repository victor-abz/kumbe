const appName = process.env.APP_NAME || null;
export const kin = {
	welcomeMesg: `Murakaza neza kuri ${appName} platform`,
	notAuth: 'Ooh, Mubanze mukore login',
	notAdmin: 'Ibyo bigenewe administrator',
	notOwner: 'Ntabwo uri nyir igikorwa',
	notAdminOrOwner: 'Bikorwa na Administrator cyangwa nyira byo',
	notFound: 'Yoo, Ibyo mushaka ntibibashije kuboneka',
	success: 'Igikorwa cyagenze neza',
	serverError:
		'Urubuga rushobora kuba ruri gukorerwa mentanance. Mube mwihangane cg muhamagare ADMIN',
	usernameTaken: 'Iyi username ifitwe n undi',
	alreadyAuth: 'Singombwa gukora login',
	loginSuccess: (name) => `Murisanga ${name}, kuri ${appName} platform`,
	registerSuccess: (names) => `Murakoze, ${names}, kwiyandikisha`,
	userExists: '(Telefoni, email cg amazina) bikoreshwa n undi',
	invalidLogin: 'Amazina mwatanze siyo',
	invalidPwd: 'Ibanga muri gukoresha siryo',
	dataNotFound: (type) => `${type} ntibashishije kuboneka`,
	dataExist: (type) => `${type} irahari`,
	fileError: 'Ntimwemerewe kuzamura file',
	notUploaded: 'File ntabwo yabaye uploaded',
	delRemainCount: (count) => `Harabura inshuro ${3 - count}!!`,
	invalidTag: 'Tags ntabwo zemewe',
	imageNotAllowed: 'Ikosa: Hemewe gusa ifoto zo mubwoko bwa (jpeg, jpg cg png)',
	audioNotAllowed: 'Ikosa: Hemewe gusa audio zo mu bwoko bwa (mp3, mpeg)',
	logoutMsg: `Murakoze gukoresha ${appName} platform`,
	invalidReply: 'Igisubizo kirabura',
	imageTypeSelect: 'Hitamo ubwoko bw ifoto(Comic cg Fact factory'
};
