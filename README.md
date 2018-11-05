# wangming-http

第一次尝试手写 ajax

## XMLHttpRequest

```js
const xhr = new XMLHttpRequest();
```

### 属性

继承了 `XMLHttpRequestEventTarget` 和 `EventTarget`的属性

1. `XMLHttpRequest.onreadystatechange`：当 `readystate` 发生变化时调用
2. `XMLHttpRequest.readyState`：返回一个无符号短整型，请求的状态码，**只读**
3. `XMLHttpRequest.response`：返回 `ArrayBuffer`、`Blob`、`Document`、`DOMString`，具体是哪种类型，取决去 `XMLHttpRequest.responseType` 的值，其中包含响应体 `body`，**只读**
4. `XMLHttpRequest.responseText`：返回一个 `DOMString`，该`DOMString`包含对请求的响应，如果请求未成功或尚未发送，则返回 `null`，**只读**
5. `XMLHttpRequest.responseType`：定义响应类型的枚举值
6. `XMLHttpRequest.responseURL`：返回响应的序列化 URL，如果 URL 为空，则返回空字符串， **只读**
7. `XMLHttpRequest.responseXML`：返回一个 `Document`，其中包含该请求的响应，如果请求未成功、尚未发送或者不能解析为 XML 或 HTML，则返回`null`， **只读**
8. `XMLHttpRequest.status`：返回请求响应的状态，无符号短整型，**只读**
9. `XMLHttpRequest.statusText`：返回`DOMString`，其中包含 HTTP 服务器返回的响应状态。与 `XMLHttpRequest.status` 不同的是，它包含响应状态的整个文本，如：`200 OK`
10. `XMLHttpRequest.timeout`：无符号长整型，表示该请求的最大请求时间（毫秒），超过该时间请求会自动结束
11. `XMLHttpRequest.upload`：返回一个`XMLHttpRequestUpload`对象，表示上传过程
12. `XMLHttpRequest.withCredentials`：Boolean 值，用来指定跨域的请求是否应该使用证书（如 cookie 或授权 header 头）。
    - 它指示了是否应该使用类似`cookie`、`authorization headers(头部授权)`或者 TLS 客户端证书这一类的资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求，在同一站点下使用`withCredentials`是*无效的*
