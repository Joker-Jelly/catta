import * as utils from './utils';

export default function(opts) {
  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          let result;

          if (opts.resultType === 'json') {
            result = JSON.parse(httpRequest.responseText);
          } else if (opts.resultType === 'response') {
            result = httpRequest.response;
          } else {
            result = httpRequest.responseText;
          }

          resolve(result);
        } else if (httpRequest.status === 0) {
          reject(utils.ERROR.TIMEOUT);
        } else {
          reject(utils.ERROR.REQUEST);
        }
      }
    };

    const requestData = utils.getRequestData(opts.method, opts.data);

    if (opts.method === 'get' && requestData) {

      // others use query
      opts.url = utils.combineUrlQuery(opts.url, [requestData.data]);

    }

    httpRequest.open(opts.method.toUpperCase(), opts.url);

    // xhr support timeout
    httpRequest.timeout = opts.timeout * 1e3 + 50;

    // cross origin, send request with cookie
    httpRequest.withCredentials = opts.withCookie;

    if (requestData && requestData.contentType) {
      httpRequest.setRequestHeader('Content-Type', requestData.contentType);
    }

    // if has custom headers
    if (opts.headers) {
      Object.keys(opts.headers).each((key) => {
        httpRequest.setRequestHeader(key, opts.headers[key]);
      });
    }

    // only post can send data
    if (opts.method === 'post' && requestData) {
      httpRequest.send(requestData.data);
    } else {
      httpRequest.send();
    }
  });
};
