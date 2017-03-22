import { browserHistory } from 'react-router';

import ACT from './consts';

export function noop(explanation) {
  return {
    type: ACT.NOOP,
    pld: explanation,
  };
}
export function invokeCallback(callback, ...args) {
  return {
    type: ACT.INVOKECALLBACK,
    pld: callback && callback.call(null, ...args),
  };
}

export function log(data, type = 'log') {
  try {
    console[type]('Do log:', data); // eslint-disable-line no-console
  } catch (e) {} // eslint-disable-line no-empty
  return {
    type: ACT.LOG,
    pld: { data, type },
  };
}

export function forwardTo(location) {
  browserHistory.push(location);
  return noop(`Go to: ${location}`);
}

export function saveRefreshToken() {
}

export function markRequestPending(key) {
  return {
    type: ACT.MARKREQUEST.PENDING,
    meta: { key },
  };
}

export function markRequestSuccess(key) {
  return {
    type: ACT.MARKREQUEST.SUCCESS,
    meta: { key },
  };
}

export function markRequestCancelled({ type, reason }, key) {
  return {
    type: ACT.MARKREQUEST.CANCELLED,
    pld: `${type}: ${reason || 'called'}`,
    meta: { key },
  };
}


export function markRequestFailed(reason, key) {
  return {
    type: ACT.MARKREQUEST.FAILED,
    pld: reason,
    meta: { key },
  };
}
