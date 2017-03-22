import 'whatwg-fetch';

import API_CONST from './consts';

function errorMessages(res) {
  return error(res.status, res.statusText, res.headers[API_CONST.TOKEN]);
}

function error(code, msg, token) {
  const rslt = {};
  rslt.code = code;
  rslt.msg = msg;
  rslt.token = token;
  return rslt;
}

function erroProxy(ero) {
  let rslt = {};
  if (ero.code) {
    rslt = ero;
  } else {
    rslt.code = '-1';
    rslt.msg = ero.message;
  }

  // console.log('Fetch error:', ero);
  throw rslt;
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  return Promise.reject(errorMessages(res));
}

function parseJSON(res) {
  return res.json().then((v) => {
    const json = v.vo ? v.vo : {};
    const token = res.headers.get(API_CONST.TOKEN);
    if (v.code) {
      return Promise.reject(error(v.code, v.msg, token));
    }
    // console.log('Fetch success:', json);
    json.token = token;
    return json;
  });
}

function setUriParam(keys, value, keyPostfix) {
  let keyStr = keys[0];

  keys.slice(1).forEach((key) => {
    keyStr += `[${key}]`;
  });

  if (keyPostfix) {
    keyStr += keyPostfix;
  }

  return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
  const array = [];

  if (object instanceof Array) {
    object.forEach((value) => {
      array.push(setUriParam(keys, value, '[]'));
    });
  } else if (object instanceof Object) {
    for (const key in object) {
      if ({}.hasOwnProperty.call(object, key)) {
        const value = object[key];
        array.push(getUriParam(keys.concat(key), value));
      }
    }
  } else if (object !== undefined) {
    array.push(setUriParam(keys, object));
  }

  return array.join('&');
}

function toQueryString(object) {
  const array = [];

  for (const key in object) {
    if ({}.hasOwnProperty.call(object, key)) {
      const str = getUriParam([key], object[key]);

      if (str !== '') {
        array.push(str);
      }
    }
  }

  return array.join('&');
}

export function api(url, options = {}, base = API_CONST.HOST.ACT) {
  let fullUrl = /^(?:https?)?:\/\//.test(url) ? url : base + url;
  let b;

  if (options.params) {
    if (options.method === 'GET') {
      fullUrl = `${fullUrl}?${toQueryString(options.params)}`;
    } else {
      b = JSON.stringify(options.params);
    }
  }

  const opts = {
    mode: 'cors',
    method: options.method ? options.method : 'POST',
    body: b,
    // credentials: 'include',
    headers: {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(fullUrl, opts)
    .then(checkStatus)
    .then(parseJSON)
    .catch(erroProxy);
}

export function authedApi(token, url, options = {}, base = API_CONST.HOST.ACT) {
  return api(url, {
    ...options,
    headers: {
      ...options.header,
      [API_CONST.TOKEN]: `${token}`,
    },
  }, base);
}
