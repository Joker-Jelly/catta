import * as utils from './utils';
import getScript from './script';

export default function(url, opts) {
  opts = utils.initOpts(opts);

  return new Promise((resolve, reject) => {
    // jsonp random id
    const jsonpOpts = opts.jsonp || {};

    const randomSeed = String(Math.random()).replace('.', '');
    const id = jsonpOpts.callbackName || `jsonp${randomSeed}`;
    const rootElement = document.body || document.head;

    /*------------------------------------------------------------*/
    
    const scriptSrc = utils.combineUrlQuery(url, Object.assign({ callback: id }, opts.data));

    getScript(scriptSrc)
      .catch(() => {
        reject(utils.throwError('request'));

        // clear timer to prevent error
        window.clearTimeout(timerTrackID);
      });

    /*------------------------------------------------------------*/

    // clear temp func and element
    const clear = function() {

      // clear callback func, if it from random seed generate
      if (!jsonpOpts.callbackName) {
        window[id] = utils.noop;
      }

    };

    // timeout track
    const timerTrackID = window.setTimeout(() => {
      clear();
      reject(utils.throwError('timeout', `${opts.timeout}s`));
    }, opts.timeout * 1e3 + 50); // with some buffer

    // callback func
    window[id] = function(...args) {

      // clear timer to prevent error
      window.clearTimeout(timerTrackID);

      resolve(...args);

      clear();
    };
  });
};
