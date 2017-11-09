(function(window) {
  const Http = window.Http;
  const http = new Http();
  const button = document.querySelector('#button');
  button.addEventListener('click', () => {
    http
      .get('./test.json')
      .then(result => {
        console.log(result);
        return;
      })
      .catch(error => {
        console.log(error);
      });
  });
})(window);
