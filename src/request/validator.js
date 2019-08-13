/* eslint-disable */
/**
 * 数据有效性验证
 *
 * @param result 通过 axios 请求接口返回的数据对象.
 */
export let isEmptyObject = function (obj) {
  for (let name in obj) {
    return false;
  }
  return true;
};

export let validator = (result) => {
  if (result.status === 200 && result.data) {
    if (result.data.data) {
      if (result.data.data) {
        return result.data.data;
      } else {
        return new Error('暂无数据');
      }
    } else {
      if (result.data.errorCode) {
        return new Error();
      } else {
        return true;
      }
    }
  } else {
    return new Error();
  }
};

export let returnPromise = (data) => {
  if (data instanceof Error) {
    console.warn(data.message);
    return Promise.reject(data);
  }
  return Promise.resolve(data);
};

export default (result) => {
  return returnPromise(validator(result));
};
