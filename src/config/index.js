export const jxBorder = {
  maxLon: 118.28,
  minLon: 113.34,
  maxLat: 30.04,
  minLat: 24.29
}

export const weatherFeature = [{
  label: '气温',
  value: 'tem'
}, {
  label: '湿度',
  value: 'rhu'
}, {
  label: '风',
  value: 'win_s'
}, {
  label: '气压',
  value: 'prs'
}, {
  label: '降水',
  value: 'pre_1h'
}]

export const feature2Name = {
  'tem': '气温',
  'rhu': '湿度',
  'win_s': '风',
  'prs': '气压',
  'pre_1h': '降水'
}

export const featureUnit = {
  tem: '˚C',
  rhu: '%',
  win_s: 'm/s',
  prs: 'pha',
  pre_1h: 'mm'
}

export const WIND_DIR = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
export const WIND_DIRECTION_CHINESE_NAME_MAP = {
  'N': '北',
  'NNE': '东北偏北',
  'NE': '东北',
  'ENE': '东北偏东',
  'E': '东',
  'ESE': '东南偏东',
  'SE': '东南',
  'SSE': '东南偏南',
  'S': '南',
  'SSW': '西南偏南',
  'SW': '西南',
  'WSW': '西南偏西',
  'W': '西',
  'WNW': '西北偏西',
  'NW': '西北',
  'NNW': '西北偏西',
}

export const DIRECTION_MAP = (() => {
  let directionMap = {}
  WIND_DIR.forEach((name, index) => {
    directionMap[name] = Math.PI / 8 * index;
  })
  return directionMap;
})()
