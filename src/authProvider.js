import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

let username = '';

export default (type, params) => {
  // when a user tries to log in
  if (type === AUTH_LOGIN) {
    const { username: providedUsername } = params;
    // localStorage.setItem('username', username);
    username = providedUsername;
    return Promise.resolve();
  }

  // when a user tries to logout
  if (type === AUTH_LOGOUT) {
    // const { username } = params;
    // localStorage.removeItem('username', username);
    username = '';
    return Promise.resolve();
  }

  // when the API throws an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      // localStorage.removeItem('username');
      username = '';
      return Promise.reject();
    }
    return Promise.resolve();
  }

  // when a user navigates to a new location
  if (type === AUTH_CHECK) {
    // return localStorage.getItem('username')
    return username !== '' ? Promise.resolve() : Promise.reject();
  }

  return Promise.reject('Unknown Method');
};
