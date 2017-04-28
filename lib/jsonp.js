import * as utils from './utils';

export default function(opts) {
  return new Promise((resolve, reject) => {
    // jsonp random id
    const randomSeed = String(Math.random()).replace('.', '');
    const id = `jsonp${randomSeed}`;
    const url = opts.url;
    const requestData = utils.getRequestData('get', opts.data);
    const rootElement = document.body || document.head;

    /*------------------------------------------------------------*/
    const el = document.createElement('script');

    // data parse and set
    el.src = utils.combineUrlQuery(url, [{ callback: id }, requestData && requestData.data]);

    el.onerror = () => {
      reject(utils.ERROR.REQUEST);

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
      reject(utils.ERROR.TIMEOUT);

      clear();
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
