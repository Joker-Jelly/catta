import { initOpts, isSupport, ERROR } from './core';
import { getRequestData, combineUrlQuery } from './core';

export default function(opts) {
  opts = initOpts(opts);

  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          let result;

          if (opts.resultType === 'json') {
            result = JSON.parse(httpRequest.responseText);
          } else {
            result = httpRequest.responseText;
          }

          resolve(result);
        } else if (httpRequest.status === 0) {
          reject(ERROR.TIMEOUT);
        } else {
          reject(ERROR.REQUEST);
        }
      }
    };

    const requestData = getRequestData(opts.method, opts.data);

    if (opts.method === 'get' && requestData) {

      // others use query
      opts.target = combineUrlQuery(opts.target, [requestData.data]);

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
