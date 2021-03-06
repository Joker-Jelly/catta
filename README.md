![forthebadge](http://forthebadge.com/images/badges/uses-js.svg) 
![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)
![sizebadge](http://img.badgesize.io/Joker-Jelly/catta/master/dist/catta-min.js?compression=gzip)

## catta
catta is a simple request client for browser
Support Fetch, AJAX, JSONP and even custom your own adapter.
[中文文档-请点我](https://github.com/Joker-Jelly/catta/blob/master/README-zhCN.md)

- Dead simple to use
- Uniform options and usage for each adapter
- Support all modern browser (include IE 9+, with comp. version)
- Support auto-detect browser to choice adapter ([more detail](#other-notices))
- Custom own adapter
- light weight, core version less then 2 KB (min + gzip)




## Browser support

- `catta-min.js`
  - All modern browser, except IE
  - No any es6+ polyfill, just pure library
- `catta-min-comp.js`
  - All modern browser, IE 9+
  - Core library with **Promise** and **Object.assign** polyfill
  - No [**Formdata**](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) polyfill, send `{data: HTMLFormElement}` need IE 10+ to work
  - No [**Global Fetch**](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch) polyfill, if browser not support this feature, then it will downgrade to **AJAX**

Recommend to use the pure one, if your project already have those polyfill or no need IE Support.

## Usage

### Install First

```shell
# local install
npm install catta --save
```



### Then import to your project

```javascript
// With ES6 - *Recommend*
import catta from 'catta';

catta('http://some/url').then(function (res) {
  console.log(res);
});
```

```javascript
// With CommonJS
const catta = require('catta');

// or catta.ajax or catta.jsonp or catta.fetch
catta.default('http://some/url').then(function (res) {
  console.log(res);
});
```

```html
<!-- And also with <script> in HTML - *Not Recommend* -->
<script src="./node_modules/catta/dist/catta-min.js"></script>
<script>
  // or catta.ajax or catta.jsonp or catta.fetch
  catta.default('http://some/url').then(function (res) {
    console.log(res);
  });
</script>
```



## Options

### API

```javascript
  import {ajax, fetch, jsonp, getScript} from 'catta';

  /**
   * make fetch/ajax/jsonp/getScript request
   * @param {string} url - request url
   * @param {Object} options - request options
   * 
   */
  ajax(url, options);

  // fetch request
  fetch(url, options);

  // jsonp request
  jsonp(url, options);

  // getScript 
  getScript(url);
```

### Important Options

|         | Description             | Type                                     | Default | Fetch | AJAX | JSONP |
| :------ | :---------------------- | :--------------------------------------- | :-----: | :---: | :--: | :---: |
| **url** | request url             | string                                   |  null   |   v   |  v   |   v   |
| method  | request method          | string { get , post, put, delete, head } |  'get'  |   v   |  v   |   x   |
| data    | the data send to server | string/Object/Form Element **[3]**       |   {}    |   v   |  v   |   v   |



### Secondary Options

|            | Description                           | Type                          | Default |   Fetch   | AJAX |   JSONP   |
| ---------- | ------------------------------------- | ----------------------------- | :-----: | :-------: | :--: | :-------: |
| type       | restrict request type                 | string { fetch, ajax, jsonp, script } | 'auto'  |     —     |  —   |     —     |
| timeout    | throw timeout error after **seconds** | number                        |    3    | ! **[1]** |  v   | ! **[1]** |
| resultType | the type of result                    | { text, json, response }      |  text   |     v     |  v   | ! **[2]** |


**v**  Supported      **!** Partial Supported      **×** Not Supported

1. Fetch and JSONP request can't be abort, current timeout is just throw timeout error

2. *resultType* option can't work with jsonp, because the result must be executable javascript code

3. Only support form element with [**FormData feature**](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

   ​



### Special Options

|       | Property     | Description                              | Type    |
| ----- | ------------ | ---------------------------------------- | ------- |
| jsonp | callbackName | set custom callback name                 | string  |
| fetch | cross        | indicate whether request can cross-origin | boolean |
| ajax  | -            | -                                        | -       |



## Examples

#### Simple

```javascript
import catta from 'catta';

catta('http://some/url').then(function (res) {
  console.log(res);
});
```



#### With full Options

```javascript
import catta from 'catta';

catta('http://some/url', {
  type: 'jsonp',
  data: {
    page: 5,
    count: 20
  },
  timeout: 2,
  credential: false,
  cross: false,
  
  // sp. options
  jsonp: {
      callbackName: 'myCustomJSONP1'
  }
})
.then(res => console.log(res))
.catch(err => console.log(err));
```



#### Only use Fetch / AJAX / JSONP

```javascript
import {fetch} from 'catta';

// only use fetch
fetch('http://some/url', {
  data: {a:1}
}).then(function (res) {
  console.log(res);
});

```



#### Custom request headers

```javascript
import catta from 'catta';

catta('http://some/url', {
  headers: {
    'Content-Type': 'appliction/json'
  }
})
.then(function (res) {
  console.log(res);
});
```



### Overwrite global config

```javascript
import {globalConfig} from 'catta';

// set global config, it will work for each request
globalConfig({
  timeout: 10
});
```



### Custom adapter

A custom adapter is just an object, that has `detector` and `processor` function.This feature is use to make a wrapper to your special request, and let `catta` to handle it.More detail see [mtop adapter example](https://github.com/Joker-Jelly/catta/blob/master/lib/custom/mtop.js)

```javascript
import {customAdapter} from 'catta';
import mtopAdapter from 'catta/lib/custom/mtop';

// set mtop adapter
customAdapter('mtop', mtopAdapter);
```



## Other notices

- Auto-detect adapter logic
  - Specific `options.type`
  - Each custom adapter
  - Support fetch ? fetch : ajax



## License

MIT License
