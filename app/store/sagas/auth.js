import { takeLatest } from 'redux-saga';

import { forwardTo, log } from '../actions';
import { saveLoginUser, checkFailed, cleanMsg, setAuthState, removeLoginUser } from '../actions/auth';
import { createRequestSaga } from '../sagas';
import api from '../api/auth';
import APICONSTS from '../api/consts';
import ACT from '../actions/consts';

const loginWatcher = createRequestSaga({
  request: api.login,
  key: APICONSTS.REQKEY.LOGIN,
  success: [
    (data) => saveLoginUser(data),
    () => setAuthState(true),
    () => cleanMsg(),
    () => forwardTo('/dashboard'),
  ],
  failure: [
    (err) => log(err),
    () => setAuthState(false),
    (err) => checkFailed(err),
  ],
});

export const logoutWatcher = createRequestSaga({
  request: api.logout,
  key: APICONSTS.REQKEY.LOGOUT,
  success: [
    () => removeLoginUser(),
    () => setAuthState(false),
    (data, { args: [, locale] }) => forwardTo(`/login/${locale}`),
  ],
  failure: [
    () => setAuthState(false),
    (err) => log(err),
  ],
});

export default [
  function* asyncAuthWatcher() {
    yield [
      takeLatest(ACT.AUTH.LOGIN, loginWatcher), // eslint-disable-line  redux-saga/yield-effects
    ];
  },
];
