import { serverResponse } from '../helpers';

export const getUsers = (req, res) => {
  return serverResponse(res, 200, 'Working');
};
export const loginUser = (req, res) => {
  return serverResponse(res, 200, 'Welcome user');
};
export const signupUser = (req, res) => {
  return serverResponse(res, 200, 'Thanks for sign up');
};
export const createNewUser = (req, res) => {
  return serverResponse(res, 201, 'User has created');
};
