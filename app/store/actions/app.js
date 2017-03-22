import ACT from './consts';

export function init(...args) {
  return {
    type: ACT.APP.INIT,
    args,
  };
}

export function inited(pld) {
  return {
    type: ACT.APP.INITED,
    pld,
  };
}
