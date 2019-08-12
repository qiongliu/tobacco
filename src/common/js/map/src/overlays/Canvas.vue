<script>
import ImageLayer from 'ol/layer/Image';
import ImageCanvasSource from 'ol/source/ImageCanvas';
import { transform } from 'ol/proj';

import ready from '../mixins/ready';
import reload from '../mixins/reload';
import beforeDestroy from '../mixins/beforeDestroy';

const TYPE = 'canvas';

export default {
  name: 'OlCanvas',
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
      default: 4
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
    _getFeatures (image) {
      var canvasFunction = (extent, resolution, pixelRatio, size, projection) => {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var canvasWidth = size[0];
        var canvasHeight = size[1];
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);

        // Canvas extent is different than map extent, so compute delta between
        // left-top of map and canvas extent.
        var mapExtent = this.map.getView().calculateExtent(this.map.getSize());
        var canvasOrigin = this.map.getPixelFromCoordinate([extent[0], extent[3]]);
        var mapOrigin = this.map.getPixelFromCoordinate([mapExtent[0], mapExtent[3]]);
        var delta = [mapOrigin[0] - canvasOrigin[0], mapOrigin[1] - canvasOrigin[1]];

        // draw a wedge
        let drawCanvas = () => {
          var points = [[117, 39], [118, 39], [118, 38.5], [117, 38.5]];
          for (let i = 0; i < points.length; i++) {
            points[i] = transform(points[i], 'EPSG:4326', 'EPSG:3857');
          }

          var pixels = [];
          for (let i = 0; i < points.length; i++) {
            pixels[i] = this.map.getPixelFromCoordinate(points[i]);
            pixels[i][0] += delta[0];
            pixels[i][1] += delta[1];
          }

          var beauty = new Image();
          beauty.src = image; // 'http://images.cnblogs.com/cnblogs_com/html5test/359114/r_test.jpg';
          beauty.onload = function () {
            context.save();
            context.moveTo(pixels[0][0], pixels[0][1]);
            context.lineTo(pixels[1][0], pixels[1][1]);
            context.lineTo(pixels[2][0], pixels[2][1]);
            context.lineTo(pixels[3][0], pixels[3][1]);
            context.drawImage(beauty, pixels[0][0], pixels[0][1]);
            context.closePath();
            context.lineWidth = 2;
            context.stroke();
            context.restore();
          };
        };

        drawCanvas();

        return canvas;
      };
      return canvasFunction;
    },
    _getSource (canvasFunction) {
      return new ImageCanvasSource({
        canvasFunction: canvasFunction
      });
    }
  }
};
</script>
