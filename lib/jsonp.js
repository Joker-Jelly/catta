import * as utils from './utils';

export default function(opts) {
  return new Promise((resolve, reject) => {
    // jsonp random id
    const jsonpOpts = opts.jsonp || {};

    const randomSeed = String(Math.random()).replace('.', '');
    const id = jsonpOpts.callbackName || `jsonp${randomSeed}`;
    const url = opts.url;
    const rootElement = document.body || document.head;

    /*------------------------------------------------------------*/
    const el = document.createElement('script');

    // data parse and set
    el.src = utils.combineUrlQuery(url, Object.assign({ callback: id }, opts.data));

    el.onerror = () => {
      reject(utils.throwError('request'));

      // clear timer to prevent error
      window.clearTimeout(timerTrackID);
    };

    // send jsonp request
    rootElement.appendChild(el);

    /*------------------------------------------------------------*/

    // clear temp func and element
    const clear = function() {
      window[id] = utils.noop;
      rootElement.removeChild(el);
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
