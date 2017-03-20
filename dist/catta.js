(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Catta"] = factory();
	else
		root["Catta"] = factory();
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.serialize = serialize;
exports.combineUrlQuery = combineUrlQuery;
exports.getRequestData = getRequestData;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
var noop = exports.noop = function noop() {};

var has = exports.has = function has(obj, path) {
  return path.split('.').every(function (prop) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty(prop)) {
      obj = obj[prop];
      return true;
    }
  });
};

var assign = exports.assign = function () {
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

        _createClass(_class, [{
          key: 'then',
          value: function then(onResolved) {
            this.onResolved = onResolved;
          }
        }, {
          key: 'catch',
          value: function _catch(onRejected) {
            this.onRejected = onRejected;
          }
        }]);

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
      var prevKeySetTemp = prevKeySet ? [].concat(_toConsumableArray(prevKeySet)) : [];
      prevKeySetTemp.push(key);
      return serialize(value, prevKeySetTemp);
    } else {

      // encode value
      value = encodeURIComponent(value);
      if (prevKeySet) {
        var deepKey = void 0;
        if (prevKeySet.length > 1) {
          deepKey = prevKeySet[0] + '[' + prevKeySet.slice(1).join('][') + '][' + key + ']';
        } else {
          deepKey = prevKeySet[0] + '[' + key + ']';
        }

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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = originData.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _step.value,
              name = _step$value.name,
              tagName = _step$value.tagName,
              type = _step$value.type,
              value = _step$value.value,
              files = _step$value.files,
              checked = _step$value.checked,
              selectedOptions = _step$value.selectedOptions;

          if (!name) {
            continue;
          }

          if (method === 'post' && type === 'file') {

            // partial support upload file with FormData
            throw new Error(ERROR.NOT_SUPPORT('FormData'));
            throw new Error(ERROR.UPLOAD_FILE);
          } else if (type === 'select-multiple' || type === 'select-one') {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = selectedOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var el = _step2.value;

                tmpData[name] = el.value;
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } else if (type === 'checkbox' || type === 'radio') {
            if (checked) {
              tmpData[name] = value;
            }
          } else if (tagName === 'INPUT') {
            tmpData[name] = value;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
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
var ERROR = exports.ERROR = {
  REQUEST: '[Request Error]: the request was failed, please confirm remote origin is correct',
  TIMEOUT: '[Timeout Error]: the request has been take over given time',

  /*------------------------------------------------------------*/
  UPLOAD_FILE: '[Upload File Error]: Can\'t upload file without FormData support',
  NOT_SUPPORT: function NOT_SUPPORT(feature) {
    return '[' + feature + ' Not Support]: your browser do not support ' + feature;
  }
};

// initial opts
var initOpts = exports.initOpts = function initOpts(opts) {
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

var isSupport = exports.isSupport = {
  globalFetch: _isFunction(window.fetch),
  formData: _isFunction(window.FormData)
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  opts = (0, _core.initOpts)(opts);

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
          reject(_core.ERROR.TIMEOUT);
        } else {
          reject(_core.ERROR.REQUEST);
        }
      }
    };

    var requestData = (0, _core.getRequestData)(opts.method, opts.data);

    if (opts.method === 'get' && requestData) {

      // others use query
      opts.target = (0, _core.combineUrlQuery)(opts.target, [requestData.data]);
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
};

var _core = __webpack_require__(0);

;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  opts = (0, _core.initOpts)(opts);

  return new Promise(function (resolve, reject) {
    if (_core.isSupport.globalFetch) {
      (function () {
        var init = {};

        init.method = opts.method.toUpperCase();
        init.mode = opts.cross ? 'cors' : 'same-origin';
        init.credentials = opts.withCookie ? 'include' : 'omit';

        if (opts.data) {

          // only post can have body
          var requestData = (0, _core.getRequestData)(opts.method, opts.data);

          if (requestData && requestData.contentType) {

            // custom headers has top priority
            init.headers = opts.headers || {
              'Content-Type': requestData.contentType
            };
          }

          // only post can send data
          if (opts.method === 'post') {
            init.body = requestData.data;
          } else {

            // others use query
            opts.target = (0, _core.combineUrlQuery)(opts.target, [requestData.data]);
          }
        }

        var timerTrackID = window.setTimeout(function () {
          reject(_core.ERROR.TIMEOUT);
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

          reject(_core.ERROR.REQUEST, err);
        });
      })();
    } else {
      reject(_core.ERROR.NOT_SUPPORT('GlobalFetch'));
    }
  });
};

var _core = __webpack_require__(0);

;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  opts = (0, _core.initOpts)(opts);

  return new Promise(function (resolve, reject) {
    // jsonp random id
    var randomSeed = String(Math.random()).replace('.', '');
    var id = (0, _core.has)(opts, 'jsonp.callbackFuncName') || 'jsonp' + randomSeed;
    var url = opts.target;
    var requestData = (0, _core.getRequestData)('get', opts.data);
    var rootElement = document.body || document.head;

    /*------------------------------------------------------------*/
    var el = document.createElement('script');

    // data parse and set
    el.src = (0, _core.combineUrlQuery)(url, [{ callback: id }, requestData && requestData.data]);

    el.onerror = function () {
      reject(_core.ERROR.REQUEST);

      // clear timer to prevent error
      window.clearTimeout(timerTrackID);
    };

    // send jsonp request
    rootElement.appendChild(el);

    /*------------------------------------------------------------*/

    // timeout track
    var timerTrackID = window.setTimeout(function () {
      reject(_core.ERROR.TIMEOUT);
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
};

var _core = __webpack_require__(0);

;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opts) {
  opts = (0, _core.initOpts)(opts);

  // first priority: claim type
  if (opts.type === 'ajax') {
    return (0, _ajax3.default)(opts);
  } else if (opts.type === 'jsonp') {
    return (0, _jsonp3.default)(opts);
  } else if (opts.type === 'fetch') {
    return (0, _fetch3.default)(opts);
  }

  // second priority: custom adapter
  for (var name in CUSTOM_ADAPTER_MAP) {
    var adapter = CUSTOM_ADAPTER_MAP[name];

    if (adapter.detector(opts)) {
      return adapter.processor(opts);
    }
  }

  // third priority: fetch -> ajax
  if (_core.isSupport.globalFetch) {
    return (0, _fetch3.default)(opts);
  } else {
    return (0, _ajax3.default)(opts);
  }
};

exports.customAdapter = customAdapter;
exports.globalConfig = globalConfig;
exports.ajax = ajax;
exports.jsonp = jsonp;
exports.fetch = fetch;

var _core = __webpack_require__(0);

var _ajax2 = __webpack_require__(1);

var _ajax3 = _interopRequireDefault(_ajax2);

var _fetch2 = __webpack_require__(2);

var _fetch3 = _interopRequireDefault(_fetch2);

var _jsonp2 = __webpack_require__(3);

var _jsonp3 = _interopRequireDefault(_jsonp2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*------------------------------------------------------------*/

/**
 * Request client for browser.
 * Support Fetch, AJAX, JSONP and even custom your own adapter
 *
 * @author jelly
 */

var CUSTOM_ADAPTER_MAP = {};

/*------------------------------------------------------------*/

/**
 * Request client that has all adapter capability
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */


/**
 * Custom your own adapter
 * Adapter is just a Object that have two prop. {detector, processor} in it
 *
 * @param  {String} name    - adapter name
 * @param  {Object} adapter - Adapter object
 */
function customAdapter(name, adapter) {
  CUSTOM_ADAPTER_MAP[name] = adapter;
};

/**
 * Set Global Config of the request client, that will affect all the request
 * @param  {Object} opts - the options set globally
 */
function globalConfig(opts) {

  // overwrite default global config, that will affect all request
  (0, _core.initOpts)(opts, true);
};

/**
 * Only make AJAX request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
function ajax(opts) {
  return (0, _ajax3.default)(opts);
}

/**
 * Only make JSONP request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
function jsonp(opts) {
  return (0, _jsonp3.default)(opts);
}

/**
 * Only make Fetch request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
function fetch(opts) {
  return (0, _fetch3.default)(opts);
}

/***/ })
/******/ ]);
});