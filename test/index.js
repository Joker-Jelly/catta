import request from '../dist/index';

window.request = request;

// simple
request('./data/simple.json').then(function (res) {
  console.log('[Test Suite - Basic]: \n', res);
});

// using fetch
request({
  target: './data/text.txt',
  resultType: 'response',
  type: 'fetch',
  withCookie: false
})
.then(function (res) {
  console.log('[Test Suite - Request Text]: \n', res);
});

// using ajax
request({
  target: './data/complex.json',
  data: {
    a: '1'
  },
  type: 'ajax',
  withCookie: false
})
.then(function (res) {
  console.log('[Test Suite - With Ajax]: \n', res);
});

// using jsonp
request({
  target: 'http://wthrcdn.etouch.cn/weather_mini',
  type: 'jsonp',
  data: {
    city: '北京'
  },
  resultType: 'text'
})
.then(function (res) {
  console.log('[Test Suite - With JSONP]: \n', res);
});

// timeout error
request({
  target: './data/text.txt',
  resultType: 'text',
  timeout: 0
})
.catch(e => console.log('[Test Suite - Error]: \n', e));