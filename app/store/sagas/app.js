import { takeLatest } from 'redux-saga';

import ACT from '../actions/consts';
import APICONSTS from '../api/consts';
import api from '../api/app';
import { log } from '../actions';
import { inited } from '../actions/app';
import { createRequestSaga } from '../sagas';
import { logoutWatcher } from './auth';
import { getLocaleWatcher } from './intl';

export const appInitWatcher = createRequestSaga({
  request: api.init,
  key: APICONSTS.REQKEY.INITAPP,
  success: [
    (data) => inited(data),
  ],
  failure: [
    (err) => log(err),
  ],
});

const asyncWatchers = [
  function* asyncLanFetchWatcher() {
    yield [
      takeLatest(ACT.APP.INIT, appInitWatcher), // eslint-disable-line  redux-saga/yield-effects
    ];
  },
  function* asyncAuthWatcher() {
    yield [
      takeLatest(ACT.AUTH.LOGOUT, logoutWatcher), // eslint-disable-line  redux-saga/yield-effects
    ];
  },
  function* asyncLanFetchWatcher() {
    yield [
      takeLatest(ACT.INTL.LOCALE.CHG, getLocaleWatcher), // eslint-disable-line  redux-saga/yield-effects
    ];
  },
];

export default asyncWatchers;
