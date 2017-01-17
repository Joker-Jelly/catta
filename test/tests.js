const deftRequest = require('../index');
const request = deftRequest.default;
const expect = chai.expect;

describe('Basic Test', () => {

  it('Has deault request func', () => {
    expect(deftRequest.default).to.be.a('function');
  });

  it('Has request funcs', () => {
    expect(deftRequest).to.be.include.keys('fetch', 'ajax', 'jsonp');
    expect(deftRequest.fetch).to.be.a('function');
    expect(deftRequest.ajax).to.be.a('function');
    expect(deftRequest.jsonp).to.be.a('function');

  });

  it('Has globalConfig', () => {
    expect(deftRequest.globalConfig).to.be.a('function');
  });

  it('Has customAdapter', () => {
    expect(deftRequest.customAdapter).to.be.a('function');
  });

});

describe('Request Test', () => {

  it('simple, default use fetch', (done) => {
    const resource = require('./data/simple.json');

    // simple
    request('./data/simple.json').then(function (res) {
      expect(res).to.be.deep.equal(resource);
      done();
    });

  });

  it('using ajax', (done) => {
    const resource = require('./data/complex.json');

    request({
      target: './data/complex.json',
      data: {
        a: '1'
      },
      type: 'ajax',
      withCookie: false
    })
    .then(function (res) {
      expect(res).to.be.deep.equal(resource);
      done();
    });
  });

  it('using jsonp', (done) => {
    const resource = require('./data/complex.json');

    // using jsonp
    request({
      target: 'http://wthrcdn.etouch.cn/weather_mini',
      type: 'jsonp',
      data: {
        city: 'Beijing'
      },
      resultType: 'json'
    })
    .then(function (res) {
      expect(res).to.be.an('object');
      done();
    });
  });


  it('using fetch, result is response', (done) => {
    request({
      target: './data/text.txt',
      resultType: 'response',
      type: 'fetch',
      withCookie: false
    })
    .then(function (res) {
      expect(res).to.be.an.instanceof(Response);
      done();
    });
  });

});

describe('Special Request Test', () => {

  it('timeout error', (done) => {

    // timeout error
    request({
      target: 'http://wthrcdn.etouch.cn/weather_mini',
      type: 'jsonp',
      resultType: 'json',
      timeout: 0
    })
    .catch((err) => {
      expect(err).to.be.equal('[Timeout Error]: the request has been take over given time');
      done();
    });

  });

});