import * as utils from './utils';

export default function(opts) {
  return new Promise((resolve, reject) => {
    if (utils.isSupport.globalFetch) {
      const init = {};

      init.method = opts.method.toUpperCase();
      init.mode = opts.cross ? 'cors' : 'same-origin';
      init.credentials = opts.credential ? 'include' : 'same-origin';

      if (opts.data) {

        // only post can have body, and send the body content type
        const requestData = utils.getRequestData(opts.method, opts.data);
        if (requestData.contentType) {
          init.headers = {
            'Content-Type': requestData.contentType
          };
        }

        // if has custom headers
        if (opts.headers) {
          Object.assign(init.headers, opts.headers);
        }

        // only post can send data
        if (opts.method === 'post') {
          init.body = opts.data;
        } else {

          // others use query
          opts.url = utils.combineUrlQuery(opts.url, requestData.data);
        }
      }

      const timerTrackID = window.setTimeout(() => {
        reject(utils.throwError('timeout', `${opts.timeout}s`));
      }, opts.timeout * 1e3 + 50); // with some buffer

      const doFetch = fetch(opts.url, init)
        .then((res) => {
          window.clearTimeout(timerTrackID);

          let result;
          if (opts.resultType === 'response') {
            result = res;
          } else if (opts.resultType === 'json') {
            result = res.json();
          } else {
            result = res.text();
          }

          resolve(result);
        })
        .catch((err) => {
          window.clearTimeout(timerTrackID);

          reject(utils.throwError('request'), err);
        });
    } else {
      reject(utils.throwError('notSupport', 'GlobalFetch'));
    }
  });
};
