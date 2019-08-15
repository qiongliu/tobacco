// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import ElementUI from 'element-ui'
import openlayers from 'common/js/map'
import Echarts from 'vue-echarts'

import 'element-ui/lib/theme-chalk/index.css';
import 'common/iconfont/iconfont.css'
import 'common/css/index.scss'

import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/custom'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/datazoom'

Vue.use(openlayers)
Vue.use(ElementUI, {
  size: 'small'
});
Vue.component('v-chart', Echarts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
