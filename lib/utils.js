/*------------------------------------------------------------*/
/* Const */

const PROJECT_NAME = 'Catta';

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
  credential: true
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

function _upperFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1);
}

const _IIFE = func => func();

/* outer */
export const noop = function() {};

// error msg set
export const throwError = _IIFE(() => {

  // error msg config
  const errors = {
    request: 'the request was failed, please confirm remote origin is correct',
    timeout: timeout => `the request has been take over given time (${timeout})`,
    uploadFile: `Can't upload file without FormData support`,
    notSupport: feature => `Current browser do not support ${feature}`
  }

  return (name, ...param) => {
    const errMsg = _isFunction(errors[name]) ? errors[name](...param) : errors[name];
    const errObj = {
      name,
      message: `[${PROJECT_NAME}][${_upperFirstChar(name)} Error]: ${errMsg}`
    };

    return errObj;
  }
});

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
  if(params){
    url += (!/\?/.test(url) ? '?' : '&') + serialize(params);
  }

  return url;
};

export function getRequestData(method, originData) {
  if (originData instanceof HTMLFormElement) {
    if (!isSupport.formData) {
      throw new Error(utils.throwError('notSupport', 'FormData').message);
      return {};
    }

    return {
      data: new FormData(originData)
    }
  } else if (typeof originData === 'object') {
    return {
      contentType: ENCTYPE.form,
      data: method === 'post' ? serialize(originData) : originData
    }
  }

  return {
    contentType: ENCTYPE.text,
    data: originData
  }
};

/*------------------------------------------------------------*/
/* Config */

// initial opts
export const initOpts = function(url, opts={}, isOverwriteDefault = false) {

  // check if browser support promise
  if(!isSupport.promise){
    throw new Error(throwError('notSupport', 'Promise').message);
  }

  if (typeof url === 'string') {
    opts.url = url;
  }

  if (typeof url === 'object') {
    opts = url;
  }

  if (!isOverwriteDefault) {
    return Object.assign({}, DEFAULT_OPTIONS, opts);
  } else {
    return Object.assign(DEFAULT_OPTIONS, opts);
  }
};

export const isSupport = {
  promise: _isFunction(window.Promise),
  globalFetch: _isFunction(window.fetch),
  formData: _isFunction(window.FormData)
};