![forthebadge](http://forthebadge.com/images/badges/uses-js.svg) ![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)

## catta
catta is a simple request client for browser
Support Fetch, AJAX, JSONP and even custom your own adapter.
[中文文档-请点我](https://github.com/Joker-Jelly/catta/blob/master/README-zhCN.md)

- Very easy to use

- Support auto-detect browser to choice adapter

- Uniform options and usage for each adapter

- Custom own adapter

- light weight, less then 3KB (min + gzip)



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

|            | Description                           |             Type             |   Fetch   |   AJAX    |   JSONP   |
| ---------- | :------------------------------------ | :--------------------------: | :-------: | :-------: | :-------: |
| target     | request url                           |            string            |     v     |     v     |     v     |
| type       | restrict request type                 |    { fetch, ajax, jsonp }    |     —     |     —     |     —     |
| method     | request method                        |      { **get** , post }      |     v     |     v     |     v     |
| data       | the data send to server               | Object/Form Element **[3]**  |     v     |     v     |     v     |
| timeout    | throw timeout error after **seconds** |            number            | ! **[1]** |     v     | ! **[1]** |
| resultType | the type of result                    | { **text**, json, response } |     v     | ! **[2]** | ! **[2]** |
| cross      | Whether can cross origin              |           boolean            |     v     |     v     |     v     |
| withCookie | Whether send cookie when cross origin |           boolean            |     v     |     v     |     v     |

**v**  Supported      **!** Partial Supported      **×** Not Supported

1. Fetch and JSONP request can't be abort, current timeout is just throw timeout error
2. *response* option only work with fetch
3. Only support upload file with FormData



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
  type: 'ajax',
  cross: true,
  withCookie: false
})
.then(res => console.log(res))
.catch(err => console.log(err));
```



#### Only use Fetch / AJAX / JSONP

```javascript
import catta, {ajax} from 'catta';

catta.ajax('./data/simple.json').then(function (res) {
  console.log(res);
});

// same as

ajax('./data/simple.json').then(function (res) {
  console.log(res);
});
```



### Custom adapter

A custom adapter is just an object, that has `detector` and `processor` function.More detail see [mtop adapter example](https://github.com/Joker-Jelly/catta/blob/master/lib/custom/mtop.js)

```javascript
import {globalConfig, customAdapter} from 'catta';
import mtopAdapter from 'catta/lib/custom/mtop';

// set global config, it will work for each request
globalConfig({
  timeout: 10
});

// set mtop adapter
customAdapter('mtop', mtopAdapter);
```



## Attention

- Auto-detect adapter logic
  - Specific `options.type`
  - Each custom adapter
  - Support fetch ? fetch : ajax



## License

MIT License