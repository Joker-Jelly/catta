/**
 * mtop
 */
import {includes} from './core';
import mtop from '@ali/lib-mtop';

export default {
  detector(opts) {
    return includes(opts.target, 'mtop.');
  },
  processor(opts) {
    return mtop.request({
      api: opts.target,
      v: opts.v || '1.0',
      data: opts.data,
      ecode: 0,
      timeout: opts.timeout * 1e3 + 50
    });
  }
};