import { api } from '../api';

export default {
  login(username, pwd) {
    let err = null;
    if (!username) {
      err = { code: '10000', msg: 'username can not be null!' };
      throw err;
    }

    if (!pwd) {
      err = { code: '10000', msg: 'pwd can not be null!' };
      throw err;
    }
    return api('/login', {
      method: 'POST',
      params: {
        username,
        pwd,
      },
    });
  },

  refreshToken(token) {
    return api('/refreshToken', {
      method: 'POST',
      params: {
        token,
      },
    });
  },

  logout(token) {
    return api('/logout', {
      method: 'POST',
      params: {
        token,
      },
    });
  },
};
