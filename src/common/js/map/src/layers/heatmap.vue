<script>
import ready from '../mixins/ready';
import reload from '../mixins/reload';
import beforeDestroy from '../mixins/beforeDestroy';
import { getDataType, isValidData } from '../utils/util';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

// import KML from 'ol/format/KML.js';
import {Heatmap as HeatmapLayer} from 'ol/layer.js';
// import Stamen from 'ol/source/Stamen.js';
// import VectorSource from 'ol/source/Vector.js';

const TYPE = 'heatmap';

export default {
  name: 'OlHeatmap',
  render () { return false; },
  mixins: [ready, reload, beforeDestroy],
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
    blur: {
      type: Number,
      default: 16
    },
    radius: {
      type: Number,
      default: 12
    },
    shadow: {
      type: Number,
      default: 250
    },
    zIndex: {
      type: Number,
      default: 0
    },
    opacity: {
      type: Number,
      default: 1
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      layer: null
    };
  },
  watch: {
    blur (newBlur) {
      this.layer.setBlur(newBlur);
    },
    radius (newRadius) {
      this.layer.setRadius(newRadius);
    }
  },
  methods: {
    _load () {
      if (!isValidData(this.data)) { return false; }
      this.layer = new HeatmapLayer({
        id: this.vid,
        name: this.name,
        type: TYPE,
        massClear: this.massClear,
        opacity: this.opacity,
        zIndex: this.zIndex,
        source: this._getSource(this._getFeatures(this.data)),
        blur: this.blur,
        radius: this.radius
      });
      this.map.addLayer(this.layer);
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
        // feature.set('style', this._getStyle(val));
        features.push(feature);
      });

      return features;
    },
    _getSource (features) {
      this.source = new VectorSource({features: features});
      return this.source;
    }
    // _load () {
    //   this.layer = new HeatmapLayer({
    //     id: this.vid,
    //     name: this.name,
    //     type: TYPE,
    //     massClear: this.massClear,
    //     source: new VectorSource({
    //       url: 'http://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
    //       // url: 'http://60.205.111.35/2012_Earthquakes_Mag5.kml',
    //       format: new KML({
    //         extractStyles: false
    //       })
    //     }),
    //     blur: this.blur,
    //     radius: this.radius,
    //     shadow: this.shadow,
    //     zIndex: this.zIndex
    //   });
    //   this.layer.getSource().on('addfeature', function (event) {
    //     var name = event.feature.get('name');
    //     var magnitude = parseFloat(name.substr(2));
    //     event.feature.set('weight', magnitude - 5);
    //   });

    //   var raster = new TileLayer({
    //     source: new Stamen({
    //       layer: 'toner'
    //     })
    //   });

    //   this.map.addLayer(this.layer);
    //   this.map.addLayer(raster);
    // }
  }
};
</script>
