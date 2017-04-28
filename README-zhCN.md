![forthebadge](http://forthebadge.com/images/badges/uses-js.svg) ![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)

## catta
catta 是一个轻量级的 Javascript 浏览器请求框架，支持 Fetch，AJAX，JSONP，甚至支持自定义的请求方式。

- 使用非常非常非常简单

- 支持自动检测浏览器来选择请求方式

- 统一各种请求方式的参数

- 支持自定义请求方式

- 体积很小，压缩后小于 2.3KB！

  ​


## 使用方式

### 安装

```shell
# 本地化安装
npm install catta --save
```



### 引入

```javascript
// ES6方式 - *推荐*
import catta from 'catta';

catta('./data/simple.json').then(function (res) {
  console.log(res);
});
```

```javascript
// CommonJS方式
const catta = require('catta');

catta('./data/simple.json').then(function (res) {
  console.log(res);
});
```

```html
<!-- <script> 标签引入HTML - *不推荐* -->
<script src="./node_modules/catta/dist/catta.js"></script>
<script>
  catta.default('./data/simple.json').then(function (res) {
    console.log(res);
  });
</script>
```



## Options

### Common Options

|            | Description |             Type             |   Fetch   |   AJAX    |   JSONP   |
| ---------- | :---------- | :--------------------------: | :-------: | :-------: | :-------: |
| target     | 限定请求方式      |            string            |     v     |     v     |     v     |
| type       | 限制请求方式      |    { fetch, ajax, jsonp }    |     —     |     —     |     —     |
| method     | 请求方法        |      { **get** , post }      |     v     |     v     |     v     |
| data       | 发送到服务端的数据   | Object/Form Element **[3]**  |     v     |     v     |     v     |
| timeout    | 请求超时时间      |            number            | ! **[1]** |     v     | ! **[1]** |
| resultType | 返回值类型       | { **text**, json, response } |     v     | ! **[2]** | ! **[2]** |
| headers    | 自定义请求头      |       Headers / Object       |     v     |     v     |     x     |

**v**  支持      **!** 部分支持      **×** 不支持

1. Fetch 和 JSONP 请求不支持提前终止，所以仅仅会在超时后报错，请求仍会继续
2. response 参数不支持 jsonp 请求
3. 仅通过 FormData 来支持 form element（即不支持 formData的浏览器，不支持 form element 参数类型）


## 示例

#### 最简单形式

```javascript
import catta from 'catta';

catta('./data/simple.json').then(function (res) {
  console.log(res);
});
```



#### 带参数的形式

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



#### 单独使用 Fetch / AJAX / JSONP

```javascript
import {ajax} from 'catta';

ajax('./data/simple.json').then(function (res) {
  console.log(res);
});
```



#### 自定义请求头

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



### 自定义请求方式

一个自定义的请求方式就是一个原生对象，对象含有 detector 和 processor 两个方法.更多细节参见 [mtop 请求方式示例](https://github.com/Joker-Jelly/catta/blob/master/lib/custom/mtop.js)

```javascript
import catta from 'catta';
import mtopAdapter from 'catta/lib/custom/mtop';

// 设置全局配置，这个配置会在每次请求时均生效
catta.globalConfig({
  timeout: 10
});

// 配置自定义请求方式 "mtop"
catta.customAdapter('mtop', mtopAdapter);
```



## 注意

- 自动选择请求方式的逻辑
  - 指定 `options.type`
  - 匹配到自定义请求方式
  - 如果支持 Fetch，则使用 fetch，否则降级为 ajax



## 许可

MIT License