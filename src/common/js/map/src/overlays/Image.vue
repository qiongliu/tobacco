<script>
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { transformExtent } from 'ol/proj';

import ready from '../mixins/ready';
import reload from '../mixins/reload';
import beforeDestroy from '../mixins/beforeDestroy';

const TYPE = 'image';

export default {
  name: 'OlImage',
  render () { return false; },
  mixins: [ready, reload, beforeDestroy],
  props: {
    vid: {
      type: String,
      required: true
    },
    name: String,
    data: {
      type: String,
      required: true
    },
    extent: Array,
    type: {
      type: String,
      default: 'static'
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
      default: 1
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _load () {
      if (!this.data.length) { return false; }
      this.layer = new ImageLayer({
        id: this.vid,
        name: this.name,
        type: TYPE,
        massClear: this.massClear || true,
        source: this._getSource(this._getFeatures(this.data)),
        opacity: this.opacity,
        zIndex: this.zIndex
      });
      this.map.addLayer(this.layer);
    },
    _getFeatures (data) {
      return data;
    },
    _getSource (image) {
      return new Static({
        url: image,
        imageExtent: transformExtent(this.extent, 'EPSG:4326', 'EPSG:3857') // [minx, miny, maxx, maxy]
      });
    }
  }
};
</script>
