import ACT from './consts';

export function login(...args) {
  return {
    type: ACT.AUTH.LOGIN,
    args,
  };
}

export function logout(...args) {
  return {
    type: ACT.AUTH.LOGOUT,
    args,
  };
}

export function setAuthState(pld) {
  return {
    type: ACT.AUTH.SETAUTHSTATE,
    pld,
  };
}

export function saveLoginUser(pld) {
  return {
    type: ACT.AUTH.SAVELOGINUSER,
    pld,
  };
}

export function removeLoginUser() {
  return {
    type: ACT.AUTH.REMOVELOGINUSER,
  };
}

export function refreshToken(pld) {
  return {
    type: ACT.AUTH.RERESHTOKEN,
    pld,
  };
}

export function changeLoginForm(pld) {
  return {
    type: ACT.AUTH.LOGINFORM.CHGED,
    pld,
  };
}

export function checkFailed(pld) {
  return {
    type: ACT.AUTH.LOGINFAILED,
    pld,
  };
}

export function cleanMsg() {
  return {
    type: ACT.AUTH.LOGINFORM.CLEANMSG,
  };
}
