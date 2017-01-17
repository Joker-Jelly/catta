(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["request"] = factory();
	else
		root["request"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export noop */
/* harmony export (binding) */ __webpack_require__.d(exports, "f", function() { return has; });
/* unused harmony export assign */
/* unused harmony export serialize */
/* harmony export (immutable) */ exports["d"] = combineUrlQuery;
/* harmony export (immutable) */ exports["c"] = getRequestData;
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return ERROR; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return initOpts; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return isSupport; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*------------------------------------------------------------*/
/* Const */

var MODULE_NAME = 'Deft-Request';

var ENCTYPE = {
  'simple': 'application/x-www-form-urlencoded',
  'multipart': 'multipart/form-data',
  'text': 'text/plain'
};

var DEFAULT_OPTIONS = {
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
  return Object.keys(obj).map(function (key) {
    var value = obj[key];

    return func(value, key);
  });
}

/* outer */
var noop = function noop() {};

var has = function has(obj, path) {
  return path.split('.').every(function (prop) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty(prop)) {
      obj = obj[prop];
      return true;
    }
  });
};

var assign = function () {
  if (typeof Object.assign != 'function') {
    return function (target) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var result = Object(target);

      for (var _len = arguments.length, varArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        varArgs[_key - 1] = arguments[_key];
      }

      varArgs.forEach(function (nextSource) {
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (has(nextSource, nextKey)) {
              result[nextKey] = nextSource[nextKey];
            }
          }
        }
      });
      return result;
    };
  } else {
    return Object.assign;
  }
}();

(function () {
  if (typeof window.Promise !== 'function') {
    (function () {
      var resolved = function resolved() {
        this.onResolved.apply(this, arguments);
      };

      var rejected = function rejected() {
        this.onRejected.apply(this, arguments);
      };

      window.Promise = function () {
        function _class(func) {
          _classCallCheck(this, _class);

          this.onResolved = this.onRejected = noop;
          func(resolved.bind(this), rejected.bind(this));
        }

        _class.prototype.then = function then(onResolved) {
          this.onResolved = onResolved;
        };

        _class.prototype.catch = function _catch(onRejected) {
          this.onRejected = onRejected;
        };

        return _class;
      }();
    })();
  }
})();

/*------------------------------------------------------------*/

function serialize(data, prevKeySet) {
  if (!data) {
    return;
  }

  var resultSet = _mapObject(data, function (value, key) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      var prevKeySetTemp = prevKeySet ? [].concat(prevKeySet) : [];
      prevKeySetTemp.push(key);
      return serialize(value, prevKeySetTemp);
    } else {

      // encode value
      value = encodeURIComponent(value);
      if (prevKeySet) {
        var deepKey = prevKeySet[0] + '[' + prevKeySet.slice(1).join('][') + '][' + key + ']';

        return escape(deepKey) + '=' + value;
      } else {
        return key + '=' + value;
      }
    }
  });

  return resultSet.join('&');
};

function combineUrlQuery(url, params) {
  var hasParam = /\?/.test(url);

  params.forEach(function (param) {
    if (param === undefined) return;

    if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
      _mapObject(param, function (value, key) {
        if (!hasParam) {
          url += '?' + key + '=' + value;
          hasParam = true;
        } else {
          url += '&' + key + '=' + value;
        }
      });
    } else {
      if (!hasParam) {
        url += '?' + param;
        hasParam = true;
      } else {
        url += '&' + param;
      }
    }
  });

  return url;
};

function getRequestData(method, originData) {
  if (originData === undefined || originData === null) {
    return;
  } else if ((typeof originData === 'undefined' ? 'undefined' : _typeof(originData)) !== 'object') {
    return {
      contentType: ENCTYPE.text,
      data: originData
    };
  }

  if (originData instanceof HTMLFormElement) {

    // only post can send FormData
    if (isSupport.formData && method === 'post') {
      return {
        data: new FormData(originData)
      };
    } else {
      var tmpData = {};
      for (var _iterator = originData.elements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _ref2 = _ref,
            name = _ref2.name,
            tagName = _ref2.tagName,
            type = _ref2.type,
            value = _ref2.value,
            files = _ref2.files,
            checked = _ref2.checked,
            selectedOptions = _ref2.selectedOptions;

        if (!name) {
          continue;
        }

        if (method === 'post' && type === 'file') {

          // partial support upload file with FormData
          throw new Error(ERROR.NOT_SUPPORT('FormData'));
          throw new Error(ERROR.UPLOAD_FILE);
        } else if (type === 'select-multiple' || type === 'select-one') {
          for (var _iterator2 = selectedOptions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref3 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref3 = _i2.value;
            }

            var el = _ref3;

            tmpData[name] = el.value;
          }
        } else if (type === 'checkbox' || type === 'radio') {
          if (checked) {
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
var ERROR = {
  REQUEST: '[Request Error]: the request was failed, please confirm remote origin is correct',
  TIMEOUT: '[Timeout Error]: the request has been take over given time',

  /*------------------------------------------------------------*/
  UPLOAD_FILE: '[Upload File Error]: Can\'t upload file without FormData support',
  NOT_SUPPORT: function NOT_SUPPORT(feature) {
    return '[' + feature + ' Not Support]: your browser do not support ' + feature;
  }
};

// initial opts
var initOpts = function initOpts(opts) {
  var isOverwriteDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


  // single url
  if (typeof opts === 'string') {
    opts = {
      target: opts
    };
  }

  if (!isOverwriteDefault) {
    return assign({}, DEFAULT_OPTIONS, opts);
  } else {
    return assign(DEFAULT_OPTIONS, opts);
  }
};

var isSupport = {
  globalFetch: _isFunction(window.fetch),
  formData: _isFunction(window.FormData)
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);



/* harmony default export */ exports["a"] = function (opts) {
  opts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["a" /* initOpts */])(opts);

  return new Promise(function (resolve, reject) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          var result = void 0;

          if (opts.resultType === 'json') {
            result = JSON.parse(httpRequest.responseText);
          } else {
            result = httpRequest.responseText;
          }

          resolve(result);
        } else if (httpRequest.status === 0) {
          reject(__WEBPACK_IMPORTED_MODULE_0__core__["b" /* ERROR */].TIMEOUT);
        } else {
          reject(__WEBPACK_IMPORTED_MODULE_0__core__["b" /* ERROR */].REQUEST);
        }
      }
    };

    var requestData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["c" /* getRequestData */])(opts.method, opts.data);

    if (opts.method === 'get' && requestData) {

      // others use query
      opts.target = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* combineUrlQuery */])(opts.target, [requestData.data]);
    }

    httpRequest.open(opts.method.toUpperCase(), opts.target);

    // xhr support timeout
    httpRequest.timeout = opts.timeout * 1e3 + 50;

    // cross origin, send request with cookie
    httpRequest.withCredentials = opts.withCookie;

    if (requestData && requestData.contentType) {
      httpRequest.setRequestHeader('Content-Type', requestData.contentType);
    }

    // only post can send data
    if (opts.method === 'post' && requestData) {
      httpRequest.send(requestData.data);
    } else {
      httpRequest.send();
    }
  });
};;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);



/* harmony default export */ exports["a"] = function (opts) {
  opts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["a" /* initOpts */])(opts);

  return new Promise(function (resolve, reject) {
    if (__WEBPACK_IMPORTED_MODULE_0__core__["e" /* isSupport */].globalFetch) {
      (function () {
        var init = {};

        init.method = opts.method.toUpperCase();
        init.mode = opts.cross ? 'cors' : 'same-origin';
        init.credentials = opts.withCookie ? 'include' : 'omit';

        if (opts.data) {

          // only post can have body
          var requestData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["c" /* getRequestData */])(opts.method, opts.data);

          if (requestData && requestData.contentType) {
            init.headers = {
              'Content-Type': requestData.contentType
            };
          }

          // only post can send data
          if (opts.method === 'post') {
            init.body = requestData.data;
          } else {

            // others use query
            opts.target = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* combineUrlQuery */])(opts.target, [requestData.data]);
          }
        }

        var timerTrackID = window.setTimeout(function () {
          reject(__WEBPACK_IMPORTED_MODULE_0__core__["b" /* ERROR */].TIMEOUT);
        }, opts.timeout * 1e3 + 50); // with some buffer

        var doFetch = fetch(opts.target, init).then(function (res) {
          window.clearTimeout(timerTrackID);

          var result = void 0;
          if (opts.resultType === 'response') {
            result = res;
          } else if (opts.resultType === 'json') {
            result = res.json();
          } else {
            result = res.text();
          }

          resolve(result);
        }).catch(function (err) {
          window.clearTimeout(timerTrackID);

          reject(__WEBPACK_IMPORTED_MODULE_0__core__["b" /* ERROR */].REQUEST, err);
        });
      })();
    } else {
      reject(__WEBPACK_IMPORTED_MODULE_0__core__["b" /* ERROR */].NOT_SUPPORT('GlobalFetch'));
    }
  });
};;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);



/* harmony default export */ exports["a"] = function (opts) {
  opts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["a" /* initOpts */])(opts);

  return new Promise(function (resolve, reject) {
    // jsonp random id
    var randomSeed = String(Math.random()).replace('.', '');
    var id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["f" /* has */])(opts, 'jsonp.callbackFuncName') || 'jsonp' + randomSeed;
    var url = opts.target;
    var requestData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["c" /* getRequestData */])('get', opts.data);
    var rootElement = document.body || document.head;

    /*------------------------------------------------------------*/
    var el = document.createElement('script');

    // data parse and set
    el.src = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core__["d" /* combineUrlQuery */])(url, [{ callback: id }, requestData && requestData.data]);

    el.onerror = function () {
      reject(__WEBPACK_IMPORTED_MODULE_0__core__["b" /* ERROR */].REQUEST);

      // clear timer to prevent error
      window.clearTimeout(timerTrackID);
    };

    // send jsonp request
    rootElement.appendChild(el);

    /*------------------------------------------------------------*/

    // timeout track
    var timerTrackID = window.setTimeout(function () {
      reject(__WEBPACK_IMPORTED_MODULE_0__core__["b" /* ERROR */].TIMEOUT);
    }, opts.timeout * 1e3 + 50); // with some buffer

    // callback func
    window[id] = function () {

      // clear timer to prevent error
      window.clearTimeout(timerTrackID);

      resolve.apply(undefined, arguments);

      window[id] = undefined;
      rootElement.removeChild(el);
    };
  });
};;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_ajax__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_fetch__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_jsonp__ = __webpack_require__(3);
/**
 * Request client for browser.
 * Support Fetch, AJAX, JSONP and even custom your own adapter
 *
 * @author jelly
 */







/*------------------------------------------------------------*/

var CUSTOM_ADAPTER_MAP = {};

/*------------------------------------------------------------*/

/**
 * Request client that has all adapter capability
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
var request = function request(opts) {
  opts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_core__["a" /* initOpts */])(opts);

  // first priority: claim type
  if (opts.type === 'ajax') {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_ajax__["a" /* default */])(opts);
  } else if (opts.type === 'jsonp') {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_jsonp__["a" /* default */])(opts);
  } else if (opts.type === 'fetch') {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_fetch__["a" /* default */])(opts);
  }

  // second priority: custom adapter
  for (var name in CUSTOM_ADAPTER_MAP) {
    var adapter = CUSTOM_ADAPTER_MAP[name];

    if (adapter.detector(opts)) {
      return adapter.processor(opts);
    }
  }

  // third priority: fetch -> ajax
  if (__WEBPACK_IMPORTED_MODULE_0__lib_core__["e" /* isSupport */].globalFetch) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_fetch__["a" /* default */])(opts);
  } else {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_ajax__["a" /* default */])(opts);
  }
};

/**
 * Custom your own adapter
 * Adapter is just a Object that have two prop. {detector, processor} in it
 *
 * @param  {String} name    - adapter name
 * @param  {Object} adapter - Adapter object
 */
request.customAdapter = function (name, adapter) {
  CUSTOM_ADAPTER_MAP[name] = adapter;
};

/**
 * Set Global Config of the request client, that will affect all the request
 * @param  {Object} opts - the options set globally
 */
request.globalConfig = function (opts) {

  // overwrite default global config, that will affect all request
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_core__["a" /* initOpts */])(opts, true);
};

/**
 * Only make AJAX request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
request.ajax = function (opts) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_ajax__["a" /* default */])(opts);
};

/**
 * Only make JSONP request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
request.jsonp = function (opts) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_jsonp__["a" /* default */])(opts);
};

/**
 * Only make Fetch request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
request.fetch = function (opts) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_fetch__["a" /* default */])(opts);
};

module.exports = request;

/***/ }
/******/ ]);
});