const appName = process.env.APP_NAME || null;
export const kn = {
  welcomeMesg: `Murakaza neza kuri ${appName} platform`,
  notAuth: 'Ooh, Mubanze mukore login',
  notAdmin: 'Ibyo bigenewe administrator',
  notOwner: 'Ntabwo uri nyir igikorwa',
  notAdminOrOwner: 'Bikorwa na Administrator cyangwa nyira byo',
  notFound: 'Yoo, Ibyo mushaka ntibibashije kuboneka',
  success: 'Igikorwa cyagenze neza',
  serverError: 'Mube mwihangane cg muhamagare admin',
  usernameTaken: 'Iyi username ifitwe n undi',
  alreadyAuth: 'Singombwa gukora login',
  loginSuccess: (name) => `Murisanga ${name}, kuri ${appName} platform`,
  registerSuccess: (names) => `Murakoze, ${names}, kwiyandikisha`,
  userExists: '(Telefoni, email cg amazina) bikoreshwa n undi',
  invalidLogin: 'Amazina mwatanze siyo',
  invalidPwd: 'Ibanga muri gukoresha siryo',
  dataNotFound: (type) => `${type} ntibashishije kuboneka`
};
