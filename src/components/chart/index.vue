<template>
  <div class="m-chart">
    <v-chart :theme="theme" :options="options"></v-chart>
  </div>
</template>

<script>
	import { theme } from './config'
  export default {
    props: {
      options: {
        type: Object,
        default () {
          return {
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'line',
              data: [5, 20, 36, 10, 10, 20]
            }]
          }
        }
      }
		},
		data() {
			return {
				theme
			}
		}
  }
</script>

<style lang="scss" scoped>
  .m-chart {
    width: 100%;
    height: 100%;
  }

  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
