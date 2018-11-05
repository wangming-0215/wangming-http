(function(window) {
	const Http = window.Http;

	const button = document.querySelector('#button');
	button.addEventListener('click', () => {
		Http('https://api.github.com/user/wangming-0215')
			.then(console.log)
			.catch(console.log);
	});
})(window);
