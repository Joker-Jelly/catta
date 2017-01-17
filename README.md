## deft-request
deft-request is a simple request client for browser
Support Fetch, AJAX, JSONP and even custom your own adapter.

- Very easy to use

- Support auto-detect browser to choice adapter

- Uniform options and usage for each adapter

- Custom own adapter

- light weight, less then 3KB (min + gzip)

  ​


## Usage

### Install First

```shell
# local install
npm install deft-request --save
```



### Then import to your project

```javascript
// With ES6 - *Recommend*
import request from 'deft-request';

request.default('./data/simple.json').then(function (res) {
  console.log(res);
});
```

```javascript
// With CommonJS
const request = require('deft-request');

request.default('./data/simple.json').then(function (res) {
  console.log(res);
});
```

```html
<!-- And also with <script> in HTML - *Not Recommend* -->
<script src="./node_modules/deft-request/dist/request.js"></script>
<script>
  request.default('./data/simple.json').then(function (res) {
    console.log(res);
  });
</script>
```



## Options

### Common Options

|            | Description                           |             Type             |   Fetch   |   AJAX    |   JSONP   |
| ---------- | :------------------------------------ | :--------------------------: | :-------: | :-------: | :-------: |
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
import request from 'deft-request';

request('./data/simple.json').then(function (res) {
  console.log(res);
});
```



#### With Options

```javascript
import request from 'deft-request';

request({
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



### Custom adapter

A custom adapter is just an object, that has `detector` and `processor` function.More detail see [mtop adapter example](https://github.com/Joker-Jelly/deft-request/blob/master/lib/custom/mtop.js)

```javascript
import {globalConfig, customAdapter} from 'deft-request';
import mtopAdapter from 'deft-request/lib/custom/mtop';

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