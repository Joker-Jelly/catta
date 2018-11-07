import DEFAULT_OPTIONS from './config';

/*------------------------------------------------------------*/
/* Const */

const PROJECT_NAME = 'Catta';

const ENCTYPE = {
  'form': 'application/x-www-form-urlencoded',
  'json': 'application/json',
  'multipart': 'multipart/form-data',
  'text': 'text/plain'
};

/*------------------------------------------------------------*/
/* Utils */

/* inner */
function _isFunction(obj) {
  return typeof obj === 'function';
}

function _isPlainObject(obj) {
  return typeof obj === 'object' && obj.constructor === Object;
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

function _serialize(params) {
  let result = '';

  _mapObject(params, (val, key) => {
    result += `${key}=${val}&`
  });

  return result.slice(0, -1);
}

/* outer */
export const noop = function() {};

// error msg set
export const throwError = _IIFE(() => {

  // error msg config
  const errors = {
    request: 'the request was failed, please confirm remote origin is correct',
    timeout: timeout => `the request has been take over given time (${timeout})`,
    abort: 'the request has been abort',
    loadScriptFail: err => `Fail to load script, ${err.target.src}`,
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

export function combineUrlQuery(url, params) {
  if(params){
    url += (!/\?/.test(url) ? '?' : '&') + _serialize(params);
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
      contentType: ENCTYPE.form,
      data: new FormData(originData)
    }
  } else if (_isPlainObject(originData)) {
    return {
      contentType: ENCTYPE.json,
      data: method === 'post' ? JSON.stringify(originData) : originData
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
export const initOpts = function(opts={}, isOverwriteDefault = false) {

  // check if browser support promise
  if(!isSupport.promise){
    throw new Error(throwError('notSupport', 'Promise').message);
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