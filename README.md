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

### 方法

1. `XMLHttpRequest.abort()`：如果请求已经被发送，则立即中止请求
2. `XMLHttpRequest.getAllResponseHeaders()`：以字符串的形式返回所有用 CRLF 分隔的响应头，如果没有收到响应，则返回 `null`
3. `XMLHttpRequest.getResponseHeader()`：返回包含指定响应头的字符串，如果响应尚未收到，或者响应中不存在该报头，则返回 `null`
4. `XMLHttpRequest.open()`：初始化一个请求。该方法只能在 `JavaScript` 代码中使用，若要在 `native code` 中初始化请求，请使用 `openRequest()`
5. `XMLHttpRequest.overrideMimeType()`：重写由服务器返回的 MIME 类型
6. `XMLHttpRequest.send()`： 发送请求，如果请求是异步的（默认就是异步），那么该方法将在请求发送后立即返回
7. `XMLHttpRequest.setRequestHeader()`：设置 HTTP 请求头的值，必须在`open()`之后，`send()`之前调用`setRequestHeader()`

### 使用

创建一个`XMLHttpRequest`对象，打开链接，发送请求。当请求完成后，这个`XMLHttpRequest`对象就会包含一些有用的信息，比如：响应体，请求状态等等。

```js
function onLoad() {
	console.log(this.responseText);
}

const req = new XMLHttpRequest();
req.addEventListener('load', onLoad);
req.open('GET', 'http://www.example.org/example.txt');
req.send();
```

### 请求类型：同步请求和异步请求

`XMLHttpRequest.open()` 方法第三个参数决定了请求是异步`(true)`还是同步`(false)`，如果是`true`或者没有传参，则是异步请求。除了`Web Workers`，不要使用同步请求。

### 处理响应

`responseXML`和`responseText`

### 二进制数据

```js
const req = new XMLHttpRequest();
req.open('GET', url);
// retrieve data unprocessed as a binary string
req.overrideMimeType('text/plain; charset=x-user-defined');

// 发送和接收二进制数据
req.onload = function(e) {
	const arraybuffer = req.response;
};
req.open('GET', url);
req.responseType = 'arraybuffer';
req.send();
```

可以通过设置`XMLHttpRequest`对象的`responseType`属性来改变从服务器上返回的响应的数据类型，比如：`arraybuffer`，`blob`，`document`，`json`和`text`

```js
// 读取二进制图像文件
const req = new XMLHttpRequest();
req.open('GET', '/myfile.png');
req.responseType = 'arraybuffer';
req.onload = function(e) {
	const buffer = req.response; // 不是 responseText
	if (buffer) {
		const byteArray = new Uint8Array(buffer);
		for (let i = 0; i < byteArray.byteLength; i++) {
			// 对数组中每个字节进行操作
		}
	}
};
req.send(null);

// 将二进制文件读取为 Blob 类型的数据
const req = new XMLHttpRequest();
req.open('GET', url);
req.responseType = 'blob';
req.onload = function(e) {
	const blob = req.response;
};
req.send();

// 在老得浏览器中接受二进制数据
function load_binary_resource(url) {
	const req = new XMLHttpRequest();
	req.open('GET', url, false);
	// 重写默认的MIME类型，强制浏览器将响应当成纯文本文件来对待
	// 使用用户自定义的字符集，告诉浏览器不要去解析数据，直接返回未处理的字节码
	req.overrideMimeType('text/plain; charset=x-user-defined');
	req.send();
	if (req.status !== 200) return '';
	return req.responseText;
}

// 发送二进制文件 XMLHttpRequest对象`send()`方法，可以通过简单的传入一个`ArrayBuffer`
// `Blob`或者`File`对象来发送二进制数据
const req = new XMLHttpRequest();
req.open('POST', url, true);
req.onload = function(e) {
	// 上传完成后
};

req.send(new Blob('123'));

// 将类型数组作为二进制数据发送
// 512 字节的 8 比特整型数组
const myArray = new ArrayBuffer(512);
const longInt8View = new Uint8Array(myArray);
for (let i = 0; i < longInt8View.length; i++) {
	longInt8View[i] = i % 255;
}
const req = new XMLHttpRequest();
req.open('POST', url);
req.send(myArray);
```

### 检测进度 `progress` 事件

```js
const req = new XMLHttpRequest();

// 需要在请求调用`open()`之前添加事件监听，否则 progress 事件将不会被触发
req.addEventListener('progress', updateProgress, false);
req.addEventListener('load', transferComplete, false);
req.addEventListener('error', transferFailed, false);
req.addEventListener('abort', transferCanceled, false);

req.open();

// progress on transfers from the server to the client (downloads)
function updateProgress(evt) {
	if (evt.lengthComputable) {
		const percent = evt.loaded / evt.total;
	} else {
		// Unable to compute progress information since the total size is unknown
	}
}

function transferComplete(evt) {
	console.log('The transfer is complete.');
}

function transferFailed(evt) {
	console.log('An error occurred while transferring the file.');
}

function transferCanceled(evt) {
	console.log('The transfer has been canceled by the user.');
}
```
