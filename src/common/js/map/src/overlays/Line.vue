<script>
import Feature from 'ol/Feature';
import MultiLineString from 'ol/geom/MultiLineString';
import LineString from 'ol/geom/LineString';
import VectorSource from 'ol/source/Vector';

import { createLineStyle } from '../utils/style';
import ready from '../mixins/ready';
import render from '../mixins/render';
import reload from '../mixins/reload';
import beforeDestroy from '../mixins/beforeDestroy';

const TYPE = 'line';

export default {
  // TODO 增加支持描边
  name: 'OlLine',
  render () { return false; },
  mixins: [ready, render, reload, beforeDestroy],
  props: {
    vid: {
      type: String,
      required: true
    },
    name: String,
    data: {
      type: Array,
      required: true
    },
    lineColor: {
      type: String,
      default: '#ffffff'
    },
    lineDash: {
      type: Array,
      default: function () {
        return [0, 0, 0];
      }
    },
    lineCap: {
      type: String,
      default: 'round'
    },
    lineWidth: {
      type: Number,
      default: 1.5
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
      default: 3
    },
    styles: [Object, Array, Function],
    massClear: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _load () {
      if (!this.data.length) { return false; }
      this.render(TYPE, this._getSource(this._getFeatures(this.data)), this.styles);
    },
    _getFeatures (data) {
      let multi = data[0][0] && Array.isArray(data[0][0]);
      let features;
      if (multi) {
        features = new Feature(new MultiLineString(data).transform('EPSG:4326', 'EPSG:3857'));
      } else {
        features = new Feature(new LineString(data).transform('EPSG:4326', 'EPSG:3857'));
      }
      features.attr = data;
      features.set('attr', data);
      features.set('vid', this.vid);
      features.set('style', this._getStyle());

      return [features];
    },
    _getSource (features) {
      return new VectorSource({features: features});
    },
    _getStyle () {
      return this.styles || createLineStyle({
        strokeColor: this.lineColor,
        strokeWidth: this.lineWidth,
        lineDash: this.lineDash,
        lineCap: this.lineCap
      });
    }
  }
};
</script>
