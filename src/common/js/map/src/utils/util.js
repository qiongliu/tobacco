const typeList = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol'];
let class2type = {};
let toString = class2type.toString;
typeList.forEach(name => {
  class2type[`[object ${name}]`] = name;
});

export const isEmptyObject = function (obj) {
  for (let name in obj) {
    return false;
  }
  return true;
};

export const getDataType = data => {
  return class2type[toString.call(data)];
};

// 检测地图子组件通过 props 接收的数据是否有效
export const isValidData = (data) => {
  // 目前（2018/03/01）overlays 和 layers 接受的数据类型只有 Object、Array 和 String 三种
  // 如果有更多数据类型则需要扩展
  switch (getDataType(data)) {
    case 'Object':
      return !isEmptyObject(data);
    case 'Array':
    case 'String':
      return !!data.length;
    default:
      return false;
  }
};
