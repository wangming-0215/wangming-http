(function(window) {
  const req = new XMLHttpRequest();

  function Http() {}

  Http.prototype.get = function(url = '') {
    return new Promise((resolve, reject) => {
      req.open('GET', url);
      req.onload = function() {
        onload(resolve, reject);
      };
      req.onerror = function() {
        onerror(reject);
      };
      req.send();
    });
  };

  function onload(resolve, reject) {
    if (req.status === 200) {
      resolve(req.response);
    } else {
      reject(new Error(req.statusText));
    }
  }

  function onerror(reject) {
    reject(new Error('Network error'));
  }

  window.Http = Http;
})(window);
