/*------------------------------------------------------------*/
/* Const */

const MODULE_NAME = 'Deft-Request';

const ENCTYPE = {
  'simple': 'application/x-www-form-urlencoded',
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

export const assign = (function() {
  if (typeof Object.assign != 'function') {
    return function (target, ...varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

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
  }else{
    return Object.assign;
  }
}());

export const includes = (function () {
  if (!String.prototype.includes) {
    return function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }else{
    return String.prototype.includes;
  }
}());

export function serialize(data, prevKeySet) {
  if(!data){
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
        const deepKey = `${prevKeySet[0]}[${prevKeySet.slice(1).join('][')}][${key}]`;

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
    if(param === undefined)return;

    if(typeof param === 'object'){
      _mapObject(param, (value, key) => {
        if(!hasParam){
          url += `?${key}=${value}`;
          hasParam = true;
        }else{
          url += `&${key}=${value}`;
        }
      });
    }else{
      if(!hasParam){
        url += `?${param}`;
        hasParam = true;
      }else{
        url += `&${param}`;
      }
    }

  });

  return url;
};

export function getRequestData(method, originData) {
  if(originData === undefined || originData === null){
    return;
  }else if(typeof originData !== 'object'){
    return {
      contentType: ENCTYPE.text,
      data: originData
    };
  }

  if (originData instanceof HTMLFormElement) {

    // only post can send FormData
    if(isSupport.formData && method === 'post'){
      return {
        contentType: ENCTYPE.multipart,
        data: new FormData(originData)
      }
    }else{
      const tmpData = {};
      for (const {name, tagName, type, value, files, checked, selectedOptions} of originData.elements) {
        if(!name){
          continue;
        }

        if (method === 'post' && type === 'file'){

          // partial support upload file with FormData
          throw new Error(ERROR.NOT_SUPPORT('FormData'));
          throw new Error(ERROR.UPLOAD_FILE);

        } else if (type === 'select-multiple' || type === 'select-one'){
          for (const el of selectedOptions) {
            tmpData[name] = el.value;
          }
        } else if (type === 'checkbox' || type === 'radio') {
          if(checked){
            tmpData[name] = value;
          }
        } else if (tagName === 'INPUT') {
          tmpData[name] = value;
        }
      }
      return {
        contentType: ENCTYPE.simple,
        data: serialize(tmpData)
      };
    }
  } else {
    return {
      contentType: ENCTYPE.simple,
      data: serialize(originData)
    };
  }
};

/*------------------------------------------------------------*/
/* Config */

// error msg set
export const ERROR = {
  REQUEST: '[Request Error]: the request was failed, please confirm remote origin is correct',
  TIMEOUT: '[Timeout Error]: the request has been take over given time',

  /*------------------------------------------------------------*/
  UPLOAD_FILE: `[Upload File Error]: Can't upload file without FormData support`,
  NOT_SUPPORT: feature => `[${feature} Not Support]: your browser do not support ${feature}`
};

// initial opts
export const initOpts = function(opts, isOverwriteDefault = false) {

  // single url
  if(typeof opts === 'string'){
    opts = {
      target: opts
    };
  }

  if(!isOverwriteDefault){
    return assign({}, DEFAULT_OPTIONS, opts);
  }else{
    return assign(DEFAULT_OPTIONS, opts);
  }
};

export const isSupport = {
  globalFetch: _isFunction(window.fetch),
  formData: _isFunction(window.FormData)
}