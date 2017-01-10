/**
 * mtop
 */
import mtop from '@ali/lib-mtop';

export default {
  detector(opts) {
    return opts.target.indexOf('mtop.') !== -1;
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