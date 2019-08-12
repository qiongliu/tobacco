<!--
<template>
  <img :src="require('@/assets/images/typhoon/typhoon.gif')" class="typhoon-img">
</template>
-->
<script>
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
// import Overlay from 'ol/Overlay';
// import { transform } from 'ol/proj';
import { circular } from 'ol/geom/Polygon';

import ready from '../mixins/ready';
import render from '../mixins/render';
import beforeDestroy from '../mixins/beforeDestroy';
import { isValidData } from '../utils/util';
import { getLayerById } from '../utils/map';
import { createdTyphoonLineStyle, createdTyphoonCircleStyle, createdTyphoonHaloStyle } from '../utils/style';

const TYPE = 'typhoon';
// const overlayId = TYPE;

// TODO 绘制不同等级的风圈
export default {
  name: 'OlTyphoon',
  render () { return false; },
  mixins: [ready, render, beforeDestroy],
  data () {
    return {
      timer: null
    };
  },
  props: {
    vid: {
      type: String,
      required: true
    },
    name: String,
    data: {
      type: Object,
      required: true
    },
    colorMap: Object,
    forecaster: Object,
    noDataMode: {
      type: String,
      default: 'clean',
      validator: function (value) {
        return ['clean', 'keep', 'hidden'].indexOf(value) > -1;
      }
    },
    opacity: {
      type: Number,
      default: 1
    },
    zIndex: {
      type: Number,
      default: 9
    }
  },
  watch: {
    forecaster (newForecaster) {
      this._forecasterRefresh(newForecaster.name, newForecaster.checked);
    },
    data: {
      deep: true,
      handler  (newData) {
        let existLayer = getLayerById(this.vid, this.map.getLayers().getArray());
        if (!isValidData(newData)) {
          switch (this.noDataMode) {
            case 'clean':
              existLayer && this.map.removeLayer(existLayer);
              break;
            case 'hidden':
              existLayer && existLayer.setOpacity(0);
              break;
            case 'keep':
            default:
              break;
          }
          return false;
        }
        this._load();
      }
    }
  },
  methods: {
    _load () {
      if (!isValidData(this.data)) { return false; }
      this.render(TYPE, this._getSource());
      let features = this._getFeatures(this.data.points);

      var h = 0;
      var animation = () => {
        if (h === features.length) {
          this._rendered(features[h - 1], this.layer);
          clearInterval(this.timer);
          return;
        }
        this.layer.getSource().addFeature(features[h]);
        if (features[h].get('point')) {
          this._addWindHalo(features[h], this.layer);
        }
        h++;
      };
      clearInterval(this.timer);
      this.timer = setInterval(animation, 50);
    },
    _getSource () {
      return new VectorSource();
    },
    _getFeatures (points) {
      let features = [];
      let pointFeature;
      let lineFeature;
      let time;
      points.forEach((point, index) => {
        time = Date.parse(point.time);
        // 添加点数据
        pointFeature = new Feature(new Point([+point.lng, +point.lat]).transform('EPSG:4326', 'EPSG:3857'));
        pointFeature.setProperties(point);
        pointFeature.time = time;
        pointFeature.set('point', true);
        pointFeature.set('style', createdTyphoonCircleStyle(this._getPointColor(point.speed)));
        // 添加line 数据
        if (index > 0) {
          lineFeature = new Feature(new LineString([[+points[index - 1].lng, +points[index - 1].lat], [+point.lng, +point.lat]]).transform('EPSG:4326', 'EPSG:3857'));
          lineFeature.set('style', createdTyphoonLineStyle());
          lineFeature.time = time;
          features.push(lineFeature);
        }
        features.push(pointFeature);
      });
      return features;
    },
    // 根据风速设置颜色
    _getPointColor (speed) {
      let color = '#fff';
      if (+speed < 17.2) {
        color = '#22f432';
      } else if (+speed < 24.5 && +speed >= 17.2) {
        color = '#2276fb';
      } else if (+speed < 32.7 && +speed >= 24.5) {
        color = '#ecf030';
      } else if (+speed < 41.5 && +speed >= 32.7) {
        color = '#ecb132';
      } else if (+speed < 51 && +speed >= 41.5) {
        color = '#f08bf3';
      } else if (+speed >= 51) {
        color = '#ec2831';
      }
      return color;
    },
    // 添加风圈
    _addWindHalo (feature, layer) {
      let source = layer.getSource();
      let feature7 = source.getFeatureById('radius7') || new Feature();
      let feature10 = source.getFeatureById('radius10') || new Feature();
      let feature12 = source.getFeatureById('radius12') || new Feature();

      feature7.setId('radius7');
      source.addFeature(feature7);
      feature10.setId('radius10');
      source.addFeature(feature10);
      feature12.setId('radius12');
      source.addFeature(feature12);

      let properties = feature.getProperties();
      if (properties.radius7) {
        feature7.setGeometry(this._windHaloGeometry(properties.lng, properties.lat, properties.radius7));
        feature7.set('style', createdTyphoonHaloStyle('rgba(0, 176, 15, 0.3)', 'rgba(0, 176, 15, 0.8)'));
      } else {
        feature7.setGeometry(null);
      }
      if (properties.radius10) {
        feature10.setGeometry(this._windHaloGeometry(properties.lng, properties.lat, properties.radius10));
        feature10.set('style', createdTyphoonHaloStyle('rgba(248, 213, 0, 0.3)', 'rgba(248, 213, 0, 0.8)'));
      } else {
        feature10.setGeometry(null);
      }
      if (properties.radius12) {
        feature12.setGeometry(this._windHaloGeometry(properties.lng, properties.lat, properties.radius12));
        feature12.set('style', createdTyphoonHaloStyle('rgba(255, 0, 0, 0.3)', 'rgba(255, 0, 0, 0.8)'));
      } else {
        feature12.setGeometry(null);
      }
      // this._addTyphoon([+properties.lng, +properties.lat]);
    },
    // 台风动画结束之后
    _rendered (feature, layer) {
      // this._addWindHalo(feature, layer);
      if (feature.forecaster) { return false; }
      var forcastList = feature.getProperties().forecast;
      var features = layer.getSource().getFeatures();
      for (var j = features.length - 1; j >= 0; j--) {
        if (features[j].forecaster) {
          layer.getSource().removeFeature(features[j]);
        }
      }

      this._addeLandFeature(forcastList, layer.getSource());
    },
    // 登陆之后，不同机构的预测数据
    _addeLandFeature (forecasters, source) {
      let points;
      let linePoints;
      let pointFeature;
      let lineFeature;
      let features = [];
      let forecaster;

      for (var j = 0; j < forecasters.length; j++) {
        forecaster = forecasters[j];
        points = forecaster.forecastpoints;
        linePoints = [];
        points.forEach((point, index) => {
          // 添加点数据
          pointFeature = new Feature(new Point([+point.lng, +point.lat]).transform('EPSG:4326', 'EPSG:3857'));
          pointFeature.setProperties(point);
          pointFeature.forecaster = forecaster.tm;
          pointFeature.time = Date.parse(point.time);
          pointFeature.set('style', createdTyphoonCircleStyle(this._getPointColor(point.speed)));
          if (index !== 0) {
            features.push(pointFeature);
          }
          linePoints.push([+point.lng, +point.lat]);
        });
        // 添加line 数据
        lineFeature = new Feature(new LineString(linePoints).transform('EPSG:4326', 'EPSG:3857'));
        lineFeature.set('style', createdTyphoonLineStyle(this.colorMap[forecaster.tm] || '#fff', [5, 5]));
        lineFeature.forecaster = forecaster.tm;
        features.push(lineFeature);
      }
      source.addFeatures(features);
    },
    _windHaloGeometry (x, y, radius) {
      let sphereRadius = 6378137;
      var circle4326 = circular([+x, +y], +radius * 1000, 64, sphereRadius);
      var circle3857 = circle4326.transform('EPSG:4326', 'EPSG:3857');
      return circle3857;
    },
    _forecasterRefresh (name, bool) {
      var layers = this.map.getLayers().getArray();
      var features;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].get('type') === TYPE) {
          features = layers[i].getSource().getFeatures();
          for (let j = 0; j < features.length; j++) {
            if (features[j].forecaster === name) {
              if (bool) {
                let type = features[j].getGeometry().getType();
                switch (type) {
                  case 'Point':
                    features[j].set('style', createdTyphoonCircleStyle(this._getPointColor(+features[j].getProperties().speed)));
                    break;
                  case 'LineString':
                    features[j].set('style', createdTyphoonLineStyle(this.colorMap[features[j].forecaster] || '#fff', [5, 5]));
                    break;
                  default:
                    break;
                }
              } else {
                features[j].set('style', null);
              }
            }
          }
          layers[i].getSource().refresh();
        }
      }
    },
    removeTyphoonById (id) {
      if (!id) { return false; }
      let layer = getLayerById(id, this.map.getLayers().getArray());
      layer && this.map.removeLayer(layer);
      clearInterval(this.timer);
    }
    // 台风动态图片的 overlay
    // _addTyphoon (lonlat) {
    //   if (!lonlat || !lonlat.length) {
    //     return false;
    //   }
    //   lonlat = transform(lonlat, 'EPSG:4326', 'EPSG:3857');

    //   let markobj = this.map.getOverlayById(overlayId);
    //   if (markobj) {
    //     markobj.setPosition(lonlat);
    //     return false;
    //   }

    //   let typhoonOverlay = new Overlay({
    //     id: overlayId,
    //     position: lonlat,
    //     element: this.$el,
    //     offset: [-18, -20],
    //     stopEvent: false
    //   });
    //   this.map.addOverlay(typhoonOverlay);
    // }
  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>

</style>
