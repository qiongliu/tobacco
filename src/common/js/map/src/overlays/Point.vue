<script>
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';

import ready from '../mixins/ready';
import render from '../mixins/render';
import reload from '../mixins/reload';
import point from '../mixins/point';
import beforeDestroy from '../mixins/beforeDestroy';
import { isValidData } from '../utils/util';

export default {
  name: 'OlPoint',
  render () { return false; },
  mixins: [ready, render, point, reload, beforeDestroy],
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
    styles: [Object, Array],
    hoverStyles: [Object, Array],
    clickStyles: [Object, Array],
    cluster: Boolean,
    distance: {
      type: Number,
      default: 20
    },
    features: {},
    // data 没有数据时的配置参数：
    // clean：清除该图层后直接返回
    // keep：不清除图层保持原样直接返回
    // hidden: 不清除图层，但是将图层的 opacity 设置为0
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
      default: 4
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _load () {
      if (!isValidData(this.data)) { return false; }
      const TYPE = 'point';
      this.render(TYPE, this._getSource(this._getFeatures(this.data)));
    },
    _getFeatures (data) {
      let feature;
      let features = [];
      if (this.features) {
        features = this.features;
      } else {
        data.forEach(val => {
          feature = new Feature(new Point([+val.lon, +val.lat]).transform('EPSG:4326', 'EPSG:3857'));
          feature.set('attr', val);
          feature.set('vid', this.vid);
          feature.set('style', val.styles || this.styles);
          feature.set('hoverStyle', val.hoverStyles || this.hoverStyles || val.styles || this.styles);
          feature.set('clickStyle', val.clickStyles || this.clickStyles || val.styles || this.styles);
          features.push(feature);
        });
      }

      return features;
    },
    _getSource (features) {
      if (this.cluster) {
        this.source = new Cluster({
          distance: this.distance,
          source: new VectorSource({
            features: features
          })
        });
      } else {
        this.source = new VectorSource({features: features});
      }
      return this.source;
    }
  }
};
</script>
