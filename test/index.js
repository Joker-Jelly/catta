import catta, {ajax, jsonp, fetch, globalConfig, customAdapter} from '../index';
const expect = chai.expect;

const REMOTE_TEXT_SERVER = 'http://127.0.0.1:3000';

describe('Basic Test', () => {

  it('Has deault request func', () => {
    expect(catta).to.be.a('function');
  });

  it('Has request funcs', () => {
    expect(fetch).to.be.a('function');
    expect(ajax).to.be.a('function');
    expect(jsonp).to.be.a('function');
  });

  it('Has globalConfig', () => {
    expect(globalConfig).to.be.a('function');
  });

  it('Has customAdapter', () => {
    expect(customAdapter).to.be.a('function');
  });

});

describe('Request Test', () => {

  it('simple, default use fetch', (done) => {
    const resource = require('./server/data/simple.json');

    // simple
    catta('./server/data/simple.json').then(function (res) {
      expect(res).to.be.deep.equal(resource);
      done();
    });

  });

  it('using ajax with post', (done) => {
    const resource = require('./server/data/complex.json');

    catta(REMOTE_TEXT_SERVER, {
      method: 'post',
      data: {
        type: 'complex'
      },
      type: 'ajax',
      credential: false
    })
    .then(function (res) {
      expect(res).to.be.deep.equal(resource);
      done();
    });
  });

  it('using jsonp', (done) => {
    const resource = require('./server/data/complex.json');

    // using jsonp
    catta('http://wthrcdn.etouch.cn/weather_mini', {
      type: 'jsonp',
      data: {
        city: '北京'
      },
      resultType: 'json'
    })
    .then(function (res) {
      expect(res).to.be.an('object');
      done();
    });
  });


  it('using fetch, result is response', (done) => {
    catta(REMOTE_TEXT_SERVER, {
      resultType: 'response',
      credential: false
    })
    .then(function (res) {
      expect(res).to.be.an.instanceof(Response);
      done();
    });
  });

  it('custom header', (done) => {
    catta(REMOTE_TEXT_SERVER, {
      method: 'post',
      data: {
        type: 'complex',
        to: 'string'
      },
      resultType: 'text',
      credential: false,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    .then(function (res) {
      expect(res).to.be.an('string');
      done();
    });
  });

  it('using fetch, via post, no cookie send', (done) => {
    const resource = require('./server/data/complex.json');

    fetch(REMOTE_TEXT_SERVER, {
      method: 'post',
      data: {
        type: 'complex'
      },
      resultType: 'json',
      credential: false
    })
    .then((res) => {
      expect(res).to.be.deep.equal(resource);
      done();
    })
  });

  it('using fetch, via post, send form data', () => {
    const $form = window['test-form'];
    fetch(REMOTE_TEXT_SERVER, {
      method: 'post',
      data: $form,
      resultType: 'json',
      credential: false
    })
    .then((res) => {
      expect(res).to.be.an('object');
      done();
    })
  });

});

describe('Special Request Test', () => {

  it('timeout error', (done) => {

    // timeout error
    catta('http://wthrcdn.etouch.cn/weather_mini', {
      type: 'jsonp',
      resultType: 'json',
      timeout: 0
    })
    .catch((err) => {
      expect(err).to.be.an('object');
      done();
    });

  });

});