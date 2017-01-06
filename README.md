## Deft-Request
Deft-request is a simple request client for browser
Support Fetch, AJAX, JSONP and even custom your own adapter.

- Very easy to use
- Uniform options for each adapter
- Custom own adapter

```javascript
// Very Simple to use
const request = require('deft-request');

request('./data/simple.json').then(function (res) {
  console.log(res);
});
```



## Options

### Common Options

|            | Description                           |            Type             |   Fetch   |   AJAX    |   JSONP   |
| ---------- | :------------------------------------ | :-------------------------: | :-------: | :-------: | :-------: |
| type       | restrict request type                 |   { fetch, ajax, jsonp }    |     —     |     —     |     —     |
| method     | request method                        |     { **get** , post }      |     √     |     √     |     √     |
| timeout    | throw timeout error after **seconds** |           number            | ! **[1]** |     √     | ! **[1]** |
| resultType | the type of result                    |     { **text**, json }      |     √     | ! **[2]** | ! **[2]** |
| cross      | Whether can cross origin              |           boolean           |     √     |     √     |     √     |
| withCookie | Whether send cookie when cross origin |           boolean           |     √     |     √     |     √     |
| data       | the data send to server               | Object/Form Element **[3]** |     √     |     √     |     √     |

**√**  Supported      **!** Partial Supported      **×** Not Supported

1. Fetch and JSONP request can't be abort, current timeout is just throw timeout error
2. *response* option only work with fetch
3. Only support upload file with FormData



## Examples

#### Simple

```javascript
request('./data/simple.json').then(function (res) {
  console.log(res);
});
```



#### With Options

```javascript
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



## License

MIT License