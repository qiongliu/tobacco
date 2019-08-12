<template>
  <canvas v-show="data && data.length" class="fliud"></canvas>
</template>

<script>
import Overlay from 'ol/Overlay';
import { transformExtent } from 'ol/proj';
import { Windy } from '../utils/windy';

import ready from '../mixins/ready';
import { isValidData } from '../utils/util';

export default {
  name: 'OlFluid',
  mixins: [ready],
  data () {
    return {
      overlay: null,
      fluid: null
    };
  },
  props: {
    vid: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      require: true
    },
    offset: {
      type: Array,
      default: function () {
        return [0, 0];
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    stopEvent: {
      type: Boolean,
      default: true
    },
    noDataMode: {
      type: String,
      default: 'clean',
      validator: function (value) {
        return ['clean', 'keep', 'hidden'].indexOf(value) > -1;
      }
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.mapComponent.$on('moveend', () => {
      this._redraw();
    });
  },
  watch: {
    data (newData) {
      let existOverlay = this.map.getOverlayById(this.vid);
      if (!isValidData(newData)) {
        switch (this.noDataMode) {
          case 'clean':
            existOverlay && this.map.removeOverlay(existOverlay);
            break;
          case 'hidden':
            if (existOverlay) {
              this.$el.style.opacity = 0;
            }
            break;
          case 'keep':
          default:
            break;
        }
        return false;
      }

      if (existOverlay) {
        this.fluid.resetdata(newData); // 重置数据
        this.$el.style.opacity = 1;
      } else {
        this._load();
      }
    }
  },
  methods: {
    _load () {
      if (!isValidData(this.data)) { return false; }
      var viewbbox = this.map.getView().calculateExtent(this.map.getSize());
      this.overlay = new Overlay({
        id: this.vid,
        element: this.$el,
        position: [viewbbox[0], viewbbox[3]],
        offset: this.offset,
        stopEvent: this.stopEvent
      });
      this.overlay.set('id', this.vid);
      this.overlay.set('massClear', this.massClear);
      this.map.addOverlay(this.overlay);
      this._initWindy();
      this._redraw();
    },
    _initWindy () {
      this.fluid = new Windy({
        canvas: this.$el,
        data: this.data,
        config: { // config 为设置画布内的样式参数，可以不设置，取默认值，但是 config 这个属性必须存在
          VELOCITY_SCALE: 0.01, // scale for wind velocity (completely arbitrary--this value looks nice)
          INTENSITY_SCALE_STEP: 50, // step size of particle intensity color scale   no
          MAX_WIND_INTENSITY: 24, // wind velocity at which particle intensity is maximum (m/s)
          MAX_PARTICLE_AGE: 50, // max number of frames a particle is drawn before regeneration
          PARTICLE_LINE_WIDTH: 1, // line width of a drawn particle
          PARTICLE_MULTIPLIER: 1 / 460, // particle count scalar (completely arbitrary--this values looks nice)
          PARTICLE_REDUCTION: 0.25, // reduce particle count to this much of normal for mobile devices
          FRAME_RATE: 10, // desired milliseconds per frame
          BOUNDARY: 0.45,
          colors: [
            'rgba(255, 255, 255, 0.4)',
            'rgba(200, 255, 255, 0.4)',
            'rgba(0, 255, 255, 0.4)',
            'rgba(0, 255, 0, 0.4)',
            'rgba(255, 255, 0,0.4)',
            'rgba(255, 200, 0, 0.4)',
            'rgba(255, 140, 0, 0.4)',
            'rgba(255, 100, 0, 0.4)',
            'rgba(255, 0, 0, 0.4)',
            'rgba(255, 0, 150, 0.4)',
            'rgba(255, 0, 200, 0.4)',
            'rgba(200, 0, 255, 0.4)'
          ]
        }
      });
    },
    _redraw () {
      let existOverlay = this.map.getOverlayById(this.vid);
      if (!existOverlay || !this.fluid) { return false; }
      this.fluid.stop();
      var mapsize = this.map.getSize();
      var bboxview = this.map.getView().calculateExtent(mapsize);
      existOverlay.setPosition([bboxview[0], bboxview[3]]);
      this.$el.width = mapsize[0];
      this.$el.height = mapsize[1];
      var extent = transformExtent(bboxview, 'EPSG:3857', 'EPSG:4326');
      this.fluid.start([[0, 0], mapsize], mapsize[0], mapsize[1], [
        [extent[0], extent[1]],
        [extent[2], extent[3]]
      ]);
    }
  },
  beforeDestroy () {
    if (this.fluid) {
      this.fluid.stop();
      this.fluid = null;
    }
    this.map && this.overlay && this.map.removeOverlay(this.overlay);
  }
};
</script>
<style scoped>
</style>
