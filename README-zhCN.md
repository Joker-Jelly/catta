![forthebadge](http://forthebadge.com/images/badges/uses-js.svg) ![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)

## catta
catta 是一个轻量级的 Javascript 浏览器请求框架，支持 Fetch，AJAX，JSONP，甚至支持自定义的请求方式。

- 使用非常非常非常简单
- 统一各种请求方式的参数
- 支持所有 “现代” 浏览器 (兼容版本可以支持 IE 9+)
- 支持自动检测浏览器来选择请求方式 ([自动检测逻辑](##Attention))
- 支持自定义请求方式
- 体积很小，压缩后小于 2.3KB！


## 浏览器支持情况

- `catta-min.js`: 
  - 所有现代浏览器
  - 没有额外的 ES6+ 特性兼容包引入，仅是纯净核心库
- `catta-min-comp.js`: 
  - 所有现代浏览器, 甚至是IE 9+
  - 核心库打包 **Promise** 和 **Object.assign** 兼容库
  - 没有 [**Formdata**](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) 兼容库, 如果需要通过 `{data: HTMLFormElement}` 提交数据，则需要 IE 10+
  - 没有 [**Global Fetch**](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch) 兼容库, 如果浏览器不支持, 则自动降级到 **AJAX**

推荐使用纯净核心库，如果你的项目中已经有这些 ES6+ 兼容库，或者你并不想支持 IE


## 使用方式

### 安装

```shell
# 本地化安装
npm install catta --save
```



### 引入

```javascript
// ES6方式 - *推荐*
import catta, {ajax} from 'catta';

catta('http://some/url').then(function (res) {
  console.log(res);
});
```

```javascript
// CommonJS方式
const catta = require('catta');

catta.default('http://some/url').then(function (res) {
  console.log(res);
});
```

```html
<!-- <script> 标签引入HTML - *不推荐* -->
<script src="./node_modules/catta/dist/catta-min.js"></script>
<script>
  catta.default('http://some/url').then(function (res) {
    console.log(res);
  });
</script>
```

## 其他

**其他内容参见 [英文文档](https://github.com/Joker-Jelly/catta/blob/master/README.md)，懒得翻译了... ^_^**

## 许可

MIT License