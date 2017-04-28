import * as utils from './utils';

export default function(opts) {
  return new Promise((resolve, reject) => {
    if (utils.isSupport.globalFetch) {
      const init = {};

      init.method = opts.method.toUpperCase();
      init.mode = opts.cross ? 'cors' : 'same-origin';
      init.credentials = opts.withCookie ? 'include' : 'omit';

      if (opts.data) {

        // only post can have body, and send the body content type
        const requestData = utils.getRequestData(opts.method, opts.data);
        if (requestData && requestData.contentType) {
          init.headers = {
            'Content-Type': requestData.contentType
          };
        }

        // if has custom headers
        if (opts.headers) {
          utils.assign(init.headers, opts.headers);
        }

        // only post can send data
        if (opts.method === 'post') {
          init.body = requestData.data;
        } else {

          // others use query
          opts.url = utils.combineUrlQuery(opts.url, [requestData.data]);
        }
      }

      const timerTrackID = window.setTimeout(() => {
        reject(utils.ERROR.TIMEOUT);
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

          reject(utils.ERROR.REQUEST, err);
        });
    } else {
      reject(utils.ERROR.NOT_SUPPORT('GlobalFetch'));
    }
  });
};
