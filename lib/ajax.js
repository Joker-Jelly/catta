import * as utils from './utils';

export default function(url, opts) {
  opts = utils.initOpts(opts);

  const httpRequest = new XMLHttpRequest();

  return new Promise((resolve, reject) => {

    // register callback func.
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
        } else {
          reject(utils.throwError('request'));
        }
      }
    };
    httpRequest.onabort = () => reject(utils.throwError('abort'));
    httpRequest.ontimeout = () => reject(utils.throwError('timeout', `${opts.timeout}s`));

    const requestData = utils.getRequestData(opts.method, opts.data);

    if (opts.method === 'get') {

      // others use query
      url = utils.combineUrlQuery(url, requestData.data);

    }

    httpRequest.open(opts.method.toUpperCase(), url);

    /*------------------------------------------------------------*/

    // xhr support timeout
    httpRequest.timeout = opts.timeout * 1e3 + 50;

    // cross origin, send request with cookie
    httpRequest.withCredentials = opts.credential;

    if (requestData.contentType) {
      httpRequest.setRequestHeader('Content-Type', requestData.contentType);
    }

    // if has custom headers
    if (opts.headers) {
      Object.keys(opts.headers).forEach((key) => {
        httpRequest.setRequestHeader(key, opts.headers[key]);
      });
    }

    /*------------------------------------------------------------*/

    // only post can send data
    if (opts.method === 'post') {
      httpRequest.send(requestData.data);
    } else {
      httpRequest.send();
    }
  });
};
