/**
 * Request client for browser.
 * Support Fetch, AJAX, JSONP and even custom your own adapter
 *
 * @author jelly
 */

import { assign, initOpts, isSupport } from './lib/core';

import _ajax from './lib/ajax';
import _fetch from './lib/fetch';
import _jsonp from './lib/jsonp';

/*------------------------------------------------------------*/

const CUSTOM_ADAPTER_MAP = {};

/*------------------------------------------------------------*/

/**
 * Request client that has all adapter capability
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
export default function(opts) {
  opts = initOpts(opts);

  // first priority: claim type
  if (opts.type === 'ajax') {
    return _ajax(opts);
  } else if (opts.type === 'jsonp') {
    return _jsonp(opts);
  } else if (opts.type === 'fetch') {
    return _fetch(opts);
  }

  // second priority: custom adapter
  for (const name in CUSTOM_ADAPTER_MAP) {
    const adapter = CUSTOM_ADAPTER_MAP[name];

    if (adapter.detector(opts)) {
      return adapter.processor(opts);
    }
  }

  // third priority: fetch -> ajax
  if (isSupport.globalFetch) {
    return _fetch(opts);
  } else {
    return _ajax(opts);
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
  initOpts(opts, true);

};

/**
 * Only make AJAX request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
export function ajax(opts) {
  return _ajax(opts);
}

/**
 * Only make JSONP request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
export function jsonp(opts) {
  return _jsonp(opts);
}

/**
 * Only make Fetch request
 * @param  {Object} opts - request options
 * @return {Promise} - request promise
 */
export function fetch(opts) {
  return _fetch(opts);
}