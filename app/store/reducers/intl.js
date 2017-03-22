import { fromJS, Set } from 'immutable';

import ACT from '../actions/consts';
import RDC from './consts';

const initialState = fromJS({
  [RDC.INTL.LOCALE]: '',
  [RDC.INTL.MODULES]: null,
  [RDC.INTL.SPTLOCALES]: null,
  [RDC.INTL.KEY]: Math.random().toString(36).substr(2),
  [RDC.INTL.MSGS]: {},
});

export function intlRdc(state = initialState, { type, pld }) {
  // console.log(type, pld, state);
  switch (type) {
    case ACT.INTL.LOCALE.CHGED: {
      let s = state.get(RDC.INTL.MODULES);
      let newState = state;
      if (!s) {
        s = Set.of(pld.module);
        newState = newState.set(
        RDC.INTL.MSGS, { ...state.get(RDC.INTL.MSGS), ...pld.msgs });
      } else if (pld.module.indexOf(',') === -1) {
        s = s.add(pld.module);
        newState = newState.set(
        RDC.INTL.MSGS, { ...state.get(RDC.INTL.MSGS), ...pld.msgs });
      } else if (pld.module.indexOf(',') > -1) {
        newState = newState.set(
        RDC.INTL.MSGS, pld.msgs);
      }
      return newState.set(
        RDC.INTL.MODULES, s).set(
        RDC.INTL.LOCALE, pld.locale).set(
        RDC.INTL.KEY, Math.random().toString(36).substr(2));
    }
    case ACT.APP.INITED:
      return state.set(RDC.INTL.SPTLOCALES, pld.sptlocales);
    default:
      return state;
  }
}

export default [
];
