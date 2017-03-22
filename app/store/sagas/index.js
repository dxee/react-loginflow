import invariant from 'invariant';
import warning from 'warning';
import { isEmpty } from 'lodash';
import { call, put, take, race, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import API_CONST from '../api/consts';
import authApi from '../api/auth';
import { checkStore } from '../index';
import {
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed,
  log,
} from '../actions';
import {
  refreshToken,
} from '../actions/auth';

function createAsynSaga(saga) {
  return function* main() {
    yield fork(saga);
  };
}

export function injectAsyncSagas(store, sagas, doValid) {
  if (doValid) {
    checkStore(store);
  }

  invariant(
    Array.isArray(sagas),
    'injectAsyncSagas: Expected `sagas` to be an array of generator functions'
  );

  warning(
    !isEmpty(sagas),
    '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
  );
  return sagas.map(createAsynSaga).map(store.runSaga);
}


export function createRequestSaga({ request, key, start, stop, success, failure, cancelled, timeout = API_CONST.TIMEOUT, canceltype }) {
  return function* m(action) {
    // console.log('Action come:', action);
    const args = action.args || [];
    const requestKey = (typeof key === 'function') ? key(...args) : key;
    if (start) {
      for (const actionCreator of start) {
        yield put(actionCreator());
      }
    }
    yield put(markRequestPending(requestKey));
    try {
      if (!request) {
        throw new Error('Api method not found!!!');
      }

      const raceOptions = {
        data: call(request, ...args),
        isTimeout: call(delay, timeout),
      };

      if (canceltype) {
        raceOptions.cancelRet = take(canceltype);
      }

      const { data, isTimeout, cancelRet } = yield race(raceOptions);  // eslint-disable-line redux-saga/no-yield-in-race

      if (isTimeout) {
        throw new Error(`Api method is timeout after ${timeout} ms!!!`);
      } else if (cancelRet) {
        if (cancelled) {
          for (const actionCreator of cancelled) {
            yield put(actionCreator(cancelRet, action));
          }
        }
        yield put(markRequestCancelled(cancelRet, requestKey));
      } else {
        // console.log('saga success:');
        let act = null;
        if (success) {
          for (const actionCreator of success) {
            act = actionCreator(data, action);
            yield put(act);
          }
        }
        act = markRequestSuccess(requestKey);
        yield put(act);
      }
    } catch (reason) {
      // console.log('Sgas error:', reason);
      const token = action.args[0];
      if (token && token.refreshToken) {
        yield put(log('Refreshing token... You should reload page for sure!'));
        const { token: newToken } = yield call(authApi.refreshToken, token.refreshToken);
        yield put(refreshToken(newToken));
      }

      if (failure) {
        for (const actionCreator of failure) {
          yield put(actionCreator(reason, action));
        }
      }
      yield put(markRequestFailed(reason, requestKey));
    } finally {
      if (stop) {
        for (const actionCreator of stop) {
          yield put(actionCreator(null, action));
        }
      }
    }
  };
}

