/**
 * mtop
 */
import mtop from '@ali/lib-mtop';

export default {

  /**
   * Detect the options, whether current request is use this adapter
   * @param  {Object} opts - current request options
   * @return {boolean} - whether use this adapter
   */
  detector(opts) {
    return opts.url.indexOf('mtop.') !== -1;
  },

  /**
   * This adapter operations, if `detector` pass, then execute the processor
   * @param  {Object} opts - current request options
   * @return {Promise} - the processor promise
   */
  processor(opts) {
    return mtop.request({
      api: opts.url,
      v: opts.v || '1.0',
      data: opts.data,
      ecode: 0,
      timeout: opts.timeout * 1e3 + 50
    });
  }
};