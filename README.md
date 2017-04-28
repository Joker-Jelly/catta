![forthebadge](http://forthebadge.com/images/badges/uses-js.svg) ![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)

## catta
catta is a simple request client for browser
Support Fetch, AJAX, JSONP and even custom your own adapter.
[中文文档-请点我](https://github.com/Joker-Jelly/catta/blob/master/README-zhCN.md)

- Very easy to use

- Support auto-detect browser to choice adapter

- Uniform options and usage for each adapter

- Custom own adapter

- light weight, less then 2.3KB (min + gzip)



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

catta('./data/simple.json').then(function (res) {
  console.log(res);
});
```

```javascript
// With CommonJS
const catta = require('catta');

catta('./data/simple.json').then(function (res) {
  console.log(res);
});
```

```html
<!-- And also with <script> in HTML - *Not Recommend* -->
<script src="./node_modules/catta/dist/catta.js"></script>
<script>
  catta('./data/simple.json').then(function (res) {
    console.log(res);
  });
</script>
```



## Options

### Common Options

|            | Description                           |                 Type                  |   Fetch   | AJAX |   JSONP   |
| ---------- | :------------------------------------ | :-----------------------------------: | :-------: | :--: | :-------: |
| url        | request url                           |                string                 |     v     |  v   |     v     |
| type       | restrict request type                 |        { fetch, ajax, jsonp }         |     —     |  —   |     —     |
| method     | request method                        | { **get** , post, put, delete, head } |     v     |  v   |     x     |
| data       | the data send to server               |  string/Object/Form Element **[3]**   |     v     |  v   |     v     |
| timeout    | throw timeout error after **seconds** |                number                 | ! **[1]** |  v   | ! **[1]** |
| resultType | the type of result                    |     { **text**, json, response }      |     v     |  v   | ! **[2]** |
| headers    | custom headers                        |           Headers / Object            |     v     |  v   |     x     |

**v**  Supported      **!** Partial Supported      **×** Not Supported

1. Fetch and JSONP request can't be abort, current timeout is just throw timeout error
2. *response* option can't work with jsonp
3. Only support form element with formData



## Examples

#### Simple

```javascript
import catta from 'catta';

catta('./data/simple.json').then(function (res) {
  console.log(res);
});
```



#### With Options

```javascript
import catta from 'catta';

catta({
  target: './data/complex.json',
  data: {
    page: 5,
    count: 20
  },
  timeout: 2, 
  type: 'ajax'
})
.then(res => console.log(res))
.catch(err => console.log(err));
```



#### Only use Fetch / AJAX / JSONP

```javascript
import {ajax} from 'catta';

ajax('./data/simple.json').then(function (res) {
  console.log(res);
});
```



#### Custom headers

```javascript
import catta from 'catta';

catta('./data/complex.json', {
  headers: {
    'Content-Type': 'appliction/json'
  }
})
.then(function (res) {
  console.log(res);
});
```



### Custom adapter

A custom adapter is just an object, that has `detector` and `processor` function.More detail see [mtop adapter example](https://github.com/Joker-Jelly/catta/blob/master/lib/custom/mtop.js)

```javascript
import catta from 'catta';
import mtopAdapter from 'catta/lib/custom/mtop';

// set global config, it will work for each request
catta.globalConfig({
  timeout: 10
});

// set mtop adapter
catta.customAdapter('mtop', mtopAdapter);
```



## Attention

- Auto-detect adapter logic
  - Specific `options.type`
  - Each custom adapter
  - Support fetch ? fetch : ajax



## License

MIT License