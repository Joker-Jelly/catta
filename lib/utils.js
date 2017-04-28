/*------------------------------------------------------------*/
/* Const */

// error msg set
export const ERROR = {
  REQUEST: '[Request Error]: the request was failed, please confirm remote origin is correct',
  TIMEOUT: '[Timeout Error]: the request has been take over given time',

  /*------------------------------------------------------------*/
  UPLOAD_FILE: `[Upload File Error]: Can't upload file without FormData support`,
  NOT_SUPPORT: feature => `[${feature} Not Support]: your browser do not support ${feature}`
};

const ENCTYPE = {
  'form': 'application/x-www-form-urlencoded',
  'json': 'application/json',
  'multipart': 'multipart/form-data',
  'text': 'text/plain'
};

const DEFAULT_OPTIONS = {
  method: 'get',
  type: '',
  timeout: 3,
  resultType: 'json',
  cross: true,
  withCookie: true
};

/*------------------------------------------------------------*/
/* Utils */

/* inner */
function _isFunction(obj) {
  return typeof obj === 'function';
}

function _mapObject(obj, func) {
  return Object.keys(obj).map((key) => {
    const value = obj[key];

    return func(value, key);
  });
}

/* outer */
export const noop = function() {};

export const has = (obj, path) => path.split('.').every((prop) => {
  if (typeof obj === 'object' && obj.hasOwnProperty(prop)) {
    obj = obj[prop];
    return true;
  }
});

export const assign = function(target, ...varArgs) {
  let result = Object(target);
  varArgs.forEach((nextSource) => {
    if (nextSource != null) {
      for (let nextKey in nextSource) {
        if (has(nextSource, nextKey)) {
          result[nextKey] = nextSource[nextKey];
        }
      }
    }
  });
  return result;
};

/*------------------------------------------------------------*/

export function serialize(data, prevKeySet) {
  if (!data) {
    return;
  }

  const resultSet = _mapObject(data, (value, key) => {
    if (typeof value === 'object') {
      const prevKeySetTemp = prevKeySet ? [...prevKeySet] : [];
      prevKeySetTemp.push(key);
      return serialize(value, prevKeySetTemp);
    } else {

      // encode value
      value = encodeURIComponent(value);
      if (prevKeySet) {
        let deepKey;
        if (prevKeySet.length > 1) {
          deepKey = `${prevKeySet[0]}[${prevKeySet.slice(1).join('][')}][${key}]`;
        } else {
          deepKey = `${prevKeySet[0]}[${key}]`;
        }

        return `${escape(deepKey)}=${value}`;
      } else {
        return `${key}=${value}`;
      }

    }
  });

  return resultSet.join('&');
};

export function combineUrlQuery(url, params) {
  let hasParam = /\?/.test(url);

  params.forEach((param) => {
    if (param === undefined) return;

    if (typeof param === 'object') {
      _mapObject(param, (value, key) => {
        if (!hasParam) {
          url += `?${key}=${value}`;
          hasParam = true;
        } else {
          url += `&${key}=${value}`;
        }
      });
    } else {
      if (!hasParam) {
        url += `?${param}`;
        hasParam = true;
      } else {
        url += `&${param}`;
      }
    }

  });

  return url;
};

export function getRequestData(method, originData) {
  if (originData instanceof HTMLFormElement) {
    return {
      data: new FormData(originData)
    }
  } else if (typeof originData === 'object') {
    return {
      contentType: ENCTYPE.form,
      data: serialize(originData)
    }
  } else {
    return {
      contentType: ENCTYPE.text,
      data: originData
    }
  }
};

/*------------------------------------------------------------*/
/* Config */

// initial opts
export const initOpts = function(url, opts={}, isOverwriteDefault = false) {
  if (url) {
    opts.url = url;
  }

  if (!isOverwriteDefault) {
    return assign({}, DEFAULT_OPTIONS, opts);
  } else {
    return assign(DEFAULT_OPTIONS, opts);
  }
};

export const isSupport = {
  globalFetch: _isFunction(window.fetch),
  formData: _isFunction(window.FormData)
};
