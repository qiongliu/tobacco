import VectorLayer from 'ol/layer/Vector';

import { getSingleFeature } from '../utils/map';
import defaultStyle from '../utils/style';

export default {
  data () {
    return {
      layer: null
    };
  },
  methods: {
    render (type, source, style) {
      this.layer = new VectorLayer({
        id: this.vid,
        name: this.name,
        type: type,
        massClear: this.massClear,
        source: source,
        opacity: this.opacity,
        zIndex: this.zIndex,
        style: style || (feature => {
          return getSingleFeature(feature).get('style') || defaultStyle;
        })
      });
      this.map.addLayer(this.layer);
    }
  }
};
