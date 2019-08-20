import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';

let basicStrokeStyle = function (options) {
  return new Stroke({
    color: options.strokeColor,
    width: options.strokeWidth,
    lineDash: options.lineDash,
    lineCap: options.lineCap || 'round'
  });
};
let basicFillStyle = function (options) {
  return new Fill({
    color: options.fillColor
  });
};
let basicIconStyle = function (options) {
  return new Icon({
    src: options.src,
    crossOrigin: 'Anonymous',
    anchor: options.offset,
    // anchorXUnits: 'pixels',
    // anchorYUnits: 'pixels',
    color: options.color,
    rotation: options.rotation, // rotation 为弧度，不是角度，角度转弧度公式：角度 * Math.PI / 180
    opacity: 1,
    anchorOrigin: options.origin,
    scale: options.scale
  });
};
let basicTextStyle = function (options) {
  return new Text({
    text: options.text,
    textAlign: options.align,
    opacity: 1,
    offsetX: options.offsetX,
    offsetY: options.offsetY,
    // backgroundFill: '#f00',
    // TODO 写 Text.vue 的时候修改以下两项
    fill: basicFillStyle({ fillColor: options.textColor }),
    stroke: options.textStroke ? basicStrokeStyle({
      strokeColor: options.textStroke,
      strokeWidth: options.textStroke ? (options.strokeWidth || 1) : 0
    }) : null
  });
};

export function createMarkerStyle (options = {}) {
  return new Style({
    image: basicIconStyle(options),
    text: basicTextStyle(options)
  });
};
export function createTextStyle (options = {}) {
  return new Style({
    text: basicTextStyle(options)
  });
};
export function createVectorStyle (options = {}) {
  return new Style({
    image: new Icon({
      src: options.iconImage,
      crossOrigin: 'anonymous',
      color: options.iconColor,
      scale: options.iconScale,
      opacity: 1
    }),
    stroke: basicStrokeStyle(options),
    fill: basicFillStyle(options),
    text: basicTextStyle(options)
  });
};
export function createLineStyle (options = {}) {
  return new Style({
    stroke: basicStrokeStyle(options)
  });
};

export function createdTyphoonLineStyle (color, lineDash) {
  return new Style({
    stroke: new Stroke({
      color: color || '#000',
      width: 2,
      lineDash: lineDash
    })
  });
};

export function createdTyphoonCircleStyle (fillColor) {
  return new Style({
    image: new Circle({
      fill: new Fill({
        color: fillColor || '#fff'
      }),
      stroke: new Stroke({
        color: '#000',
        width: 1
      }),
      radius: 5
    })
  });
};

export function createdTyphoonHaloStyle (fillColor, strokeColor) {
  return new Style({
    stroke: new Stroke({
      color: strokeColor || '#ffffff',
      width: 1
    }),
    fill: new Fill({
      color: fillColor || 'rgba(255,0,0,0.8)',
      opacity: 0.6
    })
  });
};

let fill = new Fill({
  color: 'rgba(255,255,255,0.4)'
});
let stroke = new Stroke({
  color: '#3399CC',
  width: 1.25
});

export default new Style({
  fill,
  stroke,
  image: new Circle({
    fill,
    stroke,
    radius: 5
  })
});
