/**
 * Request client for browser.
 * Support Fetch, AJAX, JSONP and even custom your own adapter
 *
 * @author jelly
 */

import * as utils from './lib/utils';

import _ajax from './lib/ajax';
import _fetch from './lib/fetch';
import _jsonp from './lib/jsonp';
import _getScript from './lib/script';

/*------------------------------------------------------------*/

const CUSTOM_ADAPTER_MAP = {};

/*------------------------------------------------------------*/

/**
 * Request client that has all adapter capability
 * @param {string} url  - request url
 * @param {Object} opts - request options (for detail, see README)
 * @return {Promise} - request promise
 */
export default function(url, opts={}) {
  
  // first priority: claim type
  if (opts.type === 'ajax') {
    return _ajax(url, opts);
  } else if (opts.type === 'jsonp') {
    return _jsonp(url, opts);
  } else if (opts.type === 'fetch') {
    return _fetch(url, opts);
  } else if (opts.type === 'script') {
    return _getScript(url, opts);
  }

  // second priority: custom adapter
  for (const name in CUSTOM_ADAPTER_MAP) {
    const adapter = CUSTOM_ADAPTER_MAP[name];

    if (adapter.detector(opts)) {
      return adapter.processor(url, opts);
    }
  }

  // third priority: fetch -> ajax
  if (utils.isSupport.globalFetch) {
    return _fetch(url, opts);
  } else {
    return _ajax(url, opts);
  }

}

/**
 * Custom your own adapter
 * Adapter is just a Object that have two prop. {detector, processor} in it
 *
 * @param  {String} name    - adapter name
 * @param  {Object} adapter - Adapter object
 */
export function customAdapter(name, adapter) {
  CUSTOM_ADAPTER_MAP[name] = adapter;
};

/**
 * Set Global Config of the request client, that will affect all the request
 * @param  {Object} opts - the options set globally
 */
export function globalConfig(opts) {

  // overwrite default global config, that will affect all request
  utils.initOpts(opts, true);

};

export const ajax = _ajax;
export const jsonp = _jsonp;
export const fetch = _fetch;
export const getScript = _getScript;