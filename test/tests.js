import catta, {ajax, jsonp, fetch, globalConfig, customAdapter} from '../index';
const expect = chai.expect;

describe('Basic Test', () => {

  it('Has deault request func', () => {
    expect(catta).to.be.a('function');
  });

  it('Has request funcs', () => {
    expect(catta.fetch).to.be.a('function');
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
    const resource = require('./data/simple.json');

    // simple
    catta('./data/simple.json').then(function (res) {
      expect(res).to.be.deep.equal(resource);
      done();
    });

  });

  it('using ajax with post', (done) => {
    const resource = require('./data/complex.json');

    catta('./data/complex.json', {
      data: {
        a: '1',
        b: {
          c: {
            d: [1,2,3]
          }
        }
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
    catta('./data/text.txt', {
      resultType: 'response',
      type: 'fetch',
      withCookie: false
    })
    .then(function (res) {
      expect(res).to.be.an.instanceof(Response);
      done();
    });
  });

  it('custom header', (done) => {
    catta('./data/complex.json', {
      headers: {
        'Content-Type': 'appliction/json'
      }
    })
    .then(function (res) {
      expect(res).to.be.an.instanceof(Object);
      done();
    });
  });

  it('using fetch, send form data with post', (done) => {
    catta('http://wthrcdn.etouch.cn/weather_mini', {
      type: 'jsonp',
      data: {
        city: '北京'
      },
      resultType: 'json'
    })
    .then((res) => {
      expect(res).to.be.an.instanceof(Object);
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
      expect(err).to.be.equal('[Timeout Error]: the request has been take over given time');
      done();
    });

  });

});