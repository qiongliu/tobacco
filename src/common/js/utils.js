//2018020306 --> 2018/02/03 06:00:00
export function formatDate(date, sep) {
  if (!date) return
  sep = sep || '/'
  let year = date.substr(0, 4)
  let month = date.substr(4, 2)
  let day = date.substr(6, 2)
  let hour = date.substr(8, 2)
  let minute = date.substr(10, 2)
  minute = minute ? minute : '00'
  let second = date.substr(12, 2)
  second = second ? second : '00'
  return year + sep + month + sep + day + ' ' + hour + ':' + minute + ':' + second
}

//对象是否为空
export const isEmptyObject = function(obj) {
  for (let name in obj) {
    return false;
  }
  return true;
};

//顺序执行
export const orderIndex = function(arr, val) {
  return new Promise((resolve, reject) => {
    let len = arr.length
    arr.some((v, i) => {
      if (val === v || val === '') {
        if (i === len - 1) i = -1;
        resolve(arr[i + 1])
        return true;
      }
    })
  })
};

const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

export function calculateChartFontSize(size) {
  let dpr = window.devicePixelRatio
  if (dpr == 1) {
    return Math.round(size / 2)
  } else if (dpr == 2) {
    return size
  } else if (dpr === 2.5) {
    return Math.round(size * 2.5 / 2)
  } else if (dpr === 2.75) {
    return Math.round(size * 2.75 / 2)
  } else if (dpr === 3) {
    return Math.round(size * 3 / 2)
  } else if (dpr === 4) {
    return Math.round(size * 4 / 2)
  }
};

export function calculateScale(scale) {
  let dpr = window.devicePixelRatio
  if (dpr == 1) {
    return scale / 2
  } else if (dpr == 2) {
    return scale
  } else if (dpr === 2.5) {
    return scale * 2.5 / 2
  } else if (dpr === 2.75) {
    return scale * 2.75 / 2
  } else if (dpr === 3) {
    return scale * 3 / 2
  } else if (dpr === 4) {
    return scale * 4 / 2
  }
};

export function calculateLegend(legend, value) {
  let res = null
  legend.some((item) => {
    if (item.num > value) {
      res = item
      return true
    }
  })
  return res
}

export function dateFormat(time) {
  if (!time) return '无';
  let year = time.substr(0, 4);
  let month = time.substr(4, 2);
  let day = time.substr(6, 2);
  let hour = time.substr(8, 2);
  let minute = time.substr(10, 2);
  minute = minute ? minute : '00';
  let second = time.substr(12, 2);
  second = second ? second : '00';
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function timestampToTime2(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return `${h}:${m}`;
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function sortTime(arr) {
  return arr.sort((a, b) => {
    return a - b
  })
}

export function calculateLevelColor(legend, value) {
  if (!legend) return;
  var color = legend[0].color;
  legend.some(function(item) {
    if (item.value >= value) {
      return true;
    }
    color = item.color;
  })
  return color;
}

export function calculateLevelColorForSpot(legend, level) {
  if (!legend) return;
  if (level <= 0) return;
  var color = legend[0].color;
  legend.some(function(item) {
    if (item.value >= level) {
      return true;
    }
    color = item.color;
  })
  return color;
}

// export function calculateLevelColor(type, level) {
//   var color = '';
//   Object.keys(type).some(function(k) {
//     if (type[k] >= level) {
//       color = k;
//       return true;
//     }
//   });
//   return color;
// }

export function todoubleByte(num) {
  return num < 10 ? `0${num}` : `${num}`
}

export function isIpad(){
  var ua = navigator.userAgent.toLowerCase();
  if(/ipad/i.test(ua))
  {
      return true;
  }
  else{
      return false;
  }
}

export function arr1to2(arr ,xSize) {
  let temp = [];
  let len = Math.ceil(arr.length / xSize);
  for (let i = 0; i < len; i++) {
    temp.push(arr.slice(i * xSize, (i + 1) * xSize))
  }
  return temp;
}

export function arr1to2ForXVertical(arr, xSize, ySize) {
  let temp = [];
  let index = 0;
  for (let j = 0; j < xSize; j++) {
    if (!temp[j]) {
      temp[j] = []
    }
    for (let i = 0; i < ySize; i++) {
      temp[j].push(arr[index++])
    }
  }
  return temp;
}

export function spotPrivate(arrayBuffer, SPOT_STEP = 0.25) {
  let dataView = new DataView(arrayBuffer)
  let metaLen = String.fromCharCode.call(null, dataView.getInt8(0)) + String.fromCharCode.call(null, dataView.getInt8(1))
  let metaStr = ''
  let data = []
  for (let i = 0; i < +metaLen; i++) {
    metaStr += String.fromCharCode.call(null, dataView.getInt8(i))
  }
  // console.log(metaLen)
  for (let i = +metaLen; i < arrayBuffer.byteLength; i+=2) {
    data.push(dataView.getInt16(i) / 10)
  }
  let metaArr = metaStr.split(';');
  // console.log(metaArr)
  let metaObj = {
    startLat: +metaArr[1],
    startLon: +metaArr[2],
    latStep: SPOT_STEP,
    lonStep: SPOT_STEP,
    xSize: +metaArr[3],
    ySize: +metaArr[4]
  }

  return  {
    ...metaObj,
    DS: arr1to2(data, metaObj.xSize)
  }
}

export function spotPrivateForFloat32(arrayBuffer, SPOT_STEP = 0.25, scale = 1) {
  let dataView = new DataView(arrayBuffer)
  let metaLen = String.fromCharCode.call(null, dataView.getInt8(0)) + String.fromCharCode.call(null, dataView.getInt8(1))
  let metaStr = ''
  let data = []
  for (let i = 0; i < +metaLen; i++) {
    metaStr += String.fromCharCode.call(null, dataView.getInt8(i))
  }
  // console.log(metaLen)
  for (let i = +metaLen; i < arrayBuffer.byteLength; i+=4) {
    data.push(dataView.getFloat32(i) * scale)
  }
  let metaArr = metaStr.split(';');
  // console.log(metaArr)
  //纬度数据去掉南北10度
  let metaObj = {
    startLat: +metaArr[1] - 10 * SPOT_STEP,
    startLon: +metaArr[2],
    latStep: SPOT_STEP,
    lonStep: SPOT_STEP,
    xSize: +metaArr[3],
    ySize: +metaArr[4]
  }
  let DS = arr1to2ForXVertical(data, metaObj.xSize, metaObj.ySize)
  DS.splice(0,10)
  DS.splice(-10,10)
  return  {
    ...metaObj,
    DS
  }
}