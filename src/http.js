(function(window) {
	const request = new XMLHttpRequest();

	const defaultOptions = {
		body: null,
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		responseType: 'json'
	};

	function Http(url, options = {}) {
		const newOptions = { ...defaultOptions, ...options };
		const { method, body, headers, responseType } = newOptions;
		const DONE = XMLHttpRequest.DONE;
		return new Promise((resolve, reject) => {
			request.onload = function() {
				if (request.readyState === DONE && request.status === 200) {
					const response = {
						status: request.status,
						statusText: request.statusText,
						data: request.response,
						timestamp: Date.now()
					};
					resolve(response);
				} else {
					request.onerror();
				}
			};
			request.onerror = function() {
				const response = {
					status: request.status,
					statusText: request.statusText,
					data: request.response,
					timestamp: Date.now()
				};
				reject(response);
			};
			request.open(method, url);
			for (const [header, value] of Object.entries(headers)) {
				request.setRequestHeader(header, value);
			}
			request.responseType = responseType;
			request.send(body);
		});
	}

	window.Http = Http;
})(window);
