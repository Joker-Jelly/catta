import { noop, has, assign, initOpts, ERROR } from './core';
import { combineUrlQuery, getRequestData } from './core';

export default function(opts) {
  opts = initOpts(opts);

  return new Promise((resolve, reject) => {
    // jsonp random id
    const randomSeed = String(Math.random()).replace('.', '');
    const id = has(opts, 'jsonp.callbackFuncName') || 'jsonp' + randomSeed;
    const url = opts.target;
    const requestData = getRequestData('get', opts.data);
    const rootElement = document.body || document.head;

    /*------------------------------------------------------------*/
    const el = document.createElement('script');

    // data parse and set
    el.src = combineUrlQuery(url, [{ callback: id }, requestData && requestData.data]);

    el.onerror = () => {
      reject(ERROR.REQUEST);

      // clear timer to prevent error
      window.clearTimeout(timerTrackID);
    };

    // send jsonp request
    rootElement.appendChild(el);

    /*------------------------------------------------------------*/

    // timeout track
    const timerTrackID = window.setTimeout(() => {
      reject(ERROR.TIMEOUT);
    }, opts.timeout * 1e3 + 50); // with some buffer

    // callback func
    window[id] = function(...args) {

      // clear timer to prevent error
      window.clearTimeout(timerTrackID);

      resolve(...args);

      window[id] = undefined;
      rootElement.removeChild(el);
    };
  });
};
