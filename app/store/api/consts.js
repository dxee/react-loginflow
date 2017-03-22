// let host = 'http://172.26.3.83:3000/api';
let host = 'http://127.0.0.1:9090/dc';
// let host = 'http://127.0.0.1:8080/dc';
// let host = 'http://192.168.1.102:3000/api';
if (process.env.NODE_ENV === 'production') {
  host = 'xxx';
}

const API_CONST = {
  TIMEOUT: 9000,
  HOST: {
    ACT: host,
  },
  TOKEN: 'Access-Token',
  REQKEY: {
    INITAPP: 'initapp',
    GETLOCALE: 'getLocale',
    LOGIN: 'login',
    LOGOUT: 'logout',
    RERESHTOKEN: 'refreshToken',
  },
};

export default API_CONST;
