import { initOpts, isSupport, getRequestData, combineUrlQuery, ERROR } from './core';

export default function(opts) {
  opts = initOpts(opts);

  return new Promise((resolve, reject) => {
    if (isSupport.globalFetch) {
      const init = {};

      init.method = opts.method.toUpperCase();
      init.mode = opts.cross ? 'cors' : 'same-origin';
      init.credentials = opts.withCookie ? 'include' : 'omit';

      if (opts.data) {

        // only post can have body
        const requestData = getRequestData(opts.method, opts.data);
        init.headers = {
          'Content-Type': requestData.contentType
        };

        // only post can send data
        if (opts.method === 'post') {
          init.body = requestData.data;
        } else {

          // others use query
          opts.target = combineUrlQuery(opts.target, [requestData.data]);
        }
      }

      const timerTrackID = window.setTimeout(() => {
        reject(ERROR.TIMEOUT);
      }, opts.timeout * 1e3 + 50); // with some buffer

      const doFetch = fetch(opts.target, init)
        .then((res) => {
          window.clearTimeout(timerTrackID);

          if (opts.resultType === 'response') {
            resolve(res);
          } else if (opts.resultType === 'json') {
            resolve(res.json());
          } else {
            resolve(res.text());
          }
        })
        .catch((err) => {
          window.clearTimeout(timerTrackID);

          reject(ERROR.REQUEST, err);
        });
    } else {
      reject(ERROR.NOT_SUPPORT('GlobalFetch'));
    }
  });
};
