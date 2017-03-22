import ACT from './consts';

export function localeChange(...args) {
  return {
    type: ACT.INTL.LOCALE.CHG,
    args,
  };
}

export function localeChanged(pld) {
  return {
    type: ACT.INTL.LOCALE.CHGED,
    pld,
  };
}
