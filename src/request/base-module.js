import HttpClientModule from 'axios-module';

let handleResult = function (result) {
  // 正常状态下，直接返回数据
  if (result && result.status < 400) {
    return result;
  }

  // 如果没有错误信息，则返回自定义的错误信息
  return {
    data: result && result.data ? result.data : {},
    status: result && result.status ? result.status : -404,
    statusText: result && result.statusText ? result.statusText : '其他错误'
  };
};

let httpRequest = function (request) {
  return request
    .then(response => {
      return Promise.resolve(handleResult(response));
    })
    .catch(error => {
      return Promise.reject(handleResult(error.response));
    });
};

class BaseModule {
  constructor () {
    this.$http = new HttpClientModule();
  }

  get (url, config = {}) {
    return httpRequest(this.$http.get(url, config));
  }

  post (url, data = undefined, config = {}) {
    return httpRequest(this.$http.post(url, data, config));
  }

  put (url, data = undefined, config = {}) {
    return httpRequest(this.$http.put(url, data, config));
  }

  delete (url, config = {}) {
    return httpRequest(this.$http.delete(url, config));
  }

  all (requests) {
    return Promise.resolve(this.$http.all(requests));
  }
}

export default BaseModule;
