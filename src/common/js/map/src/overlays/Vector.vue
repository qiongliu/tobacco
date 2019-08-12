<script>
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/geom/Circle';
import { transform } from 'ol/proj';
import Feature from 'ol/Feature';

import { createVectorStyle } from '../utils/style';
import { isValidData, getDataType } from '../utils/util';
import ready from '../mixins/ready';
import render from '../mixins/render';
import reload from '../mixins/reload';
import beforeDestroy from '../mixins/beforeDestroy';

const TYPE = 'vector';

export default {
  name: 'OlVector',
  render () { return false; },
  mixins: [ready, render, reload, beforeDestroy],
  props: {
    vid: {
      type: String,
      required: true
    },
    name: String,
    data: {
      type: [Object, Array],
      required: true
    },
    styles: [Object, Array],
    strokeColor: {
      type: String,
      default: '#ffffff'
    },
    strokeWidth: {
      type: Number,
      default: 1.5
    },
    fillColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.1)'
    },
    text: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    textStroke: {
      type: String,
      default: '#000000'
    },
    iconImage: {
      type: String,
      default: require('../images/pin.png')
    },
    iconColor: {
      type: String,
      default: '#ffffff'
    },
    iconScale: {
      type: Number,
      default: 0.5
    },
    align: {
      type: String,
      default: 'center'
    },
    offset: {
      // 0: X，正值向左移动
      // 1: Y，正值向上移动
      type: Array,
      default: function () {
        return [0, 0];
      }
    },
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
      default: 2
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // TODO 使用 smooth 使曲线平滑
    // TODO 矢量图里的文字可能有多种颜色（e.g：高压是蓝色，低压是红色）
    // TODO 兼容其他投影，现在只支持 3857
    _load () {
      if (!isValidData(this.data)) { return false; }
      this.render(TYPE, this._getSource(this._getFeatures(this.data)));
    },
    _getFeatures (data) {
      let features;
      if (getDataType(data) === 'Array') {
        features = [];
        data.forEach(item => {
          let feature = new Feature(new Circle(transform([+item.lon, +item.lat], 'EPSG:4326', 'EPSG:3857'), +item.radius * 1000));
          feature.set('attr', item);
          feature.set('vid', this.vid);
          feature.set('style', this._getStyle());
          features.push(feature);
        });
      } else {
        features = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(data);
        features.forEach(feature => {
          feature.set('attr', data);
          feature.set('vid', this.vid);
          feature.set('style', this._getStyle(feature));
        });
      }
      return features;
    },
    _getSource (features) {
      return new VectorSource({features: features});
    },
    _getStyle (feature) {
      return this.styles || createVectorStyle({
        strokeColor: (feature && feature.getProperties().color) || this.strokeColor,
        strokeWidth: this.strokeWidth,
        fillColor: (feature && feature.getProperties().color) || this.fillColor,
        text: ((feature && feature.getProperties().val) || this.text) + '',
        textColor: this.textColor,
        textStroke: this.textStroke,
        align: this.align,
        offsetX: this.offset ? this.offset[0] : 0,
        offsetY: this.offset ? this.offset[1] : 0,
        iconImage: this.iconImage,
        iconColor: this.iconColor,
        iconScale: this.iconScale
      });
    }
  }
};
</script>
