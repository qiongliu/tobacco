/**
 * 用于渲染 Marker 和 Text
 * 因为 Marer 和 Text 都是 point 类型，切数据格式都是 Array 或 Object
 * 只有 style 不一样，需要单独设置
 */
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';

import { getDataType, isValidData } from '../utils/util';
const TYPE = 'point';

export default {
  methods: {
    _load () {
      if (!isValidData(this.data)) { return false; }
      this.render(TYPE, this._getSource(this._getFeatures(this.data)));
    },
    _getFeatures (data) {
      let feature;
      let features = [];
      if (getDataType(data) === 'Object') {
        data = [data];
      }
      data.forEach(val => {
        feature = new Feature(new Point([+val.lon, +val.lat]).transform('EPSG:4326', 'EPSG:3857'));
        feature.set('attr', val);
        feature.set('vid', this.vid);
        feature.set('style', this._getStyle(val));
        features.push(feature);
      });

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
