import { fromJS } from 'immutable';

import ACT from '../actions/consts';
import RDC from './consts';

const initialState = fromJS({
  [RDC.AUTH.TOKEN]: '',
  [RDC.AUTH.USER]: null,
  [RDC.AUTH.LOGGEDIN]: false,
  [RDC.AUTH.LOGINFORM.I]: {
    [RDC.AUTH.LOGINFORM.ERROR]: null,
    [RDC.AUTH.LOGINFORM.USERNAME]: '',
    [RDC.AUTH.LOGINFORM.PWD]: '',
  },
});

export function authRdc(state = initialState, { type, pld }) {
  // console.log(type, pld, state);
  switch (type) {
    case ACT.AUTH.SETAUTHSTATE:
      return state.set(RDC.AUTH.LOGGEDIN, pld);
    case ACT.AUTH.SAVELOGINUSER:
      return state.set(RDC.AUTH.USER, pld.user).set(RDC.AUTH.TOKEN, pld.token); // {user,token}
    case ACT.AUTH.REMOVELOGINUSER:
      return state.set(RDC.AUTH.USER, null).set(RDC.AUTH.TOKEN, '');
    case ACT.AUTH.RERESHTOKEN:
      // payload is access token
      return state.set(RDC.AUTH.TOKEN, pld);
    case ACT.AUTH.LOGINFORM.CHGED:
      return state.update(RDC.AUTH.LOGINFORM.I, (item) => item.merge(pld));
    case ACT.AUTH.LOGINFAILED:
      return state.setIn([RDC.AUTH.LOGINFORM.I, RDC.AUTH.LOGINFORM.ERROR], pld);
    case ACT.AUTH.LOGINFORM.CLEANMSG:
      return state.setIn([RDC.AUTH.LOGINFORM.I, RDC.AUTH.LOGINFORM.ERROR], null);
    default:
      return state;
  }
}

export default [
];
