<template>
  <div class="m-forecast">
    <div class="time">
      <span>{{bjTime}}</span><span>北京时间</span>
    </div>
    <div class="forecast">
      <div class="f-gis-title">预报数据</div>
      <m-select :value="weatherFeature" :data="weatherFeatureList" class="feature-select" @click="featureSelectHandle">
      </m-select>
      <p class="f-gis-sub-title">{{stationName}}{{weatherFeature === 'prs' ? feature2Name[oldWeatherFeature] : feature2Name[weatherFeature]}}变化图</p>
      <div class="single-station-chart">
        <div>
          <span ref="future24" @click="future24Handle">未来24h</span>
          <el-date-picker v-model="singleStationTime" @change="onChangeSingleStationTime" type="datetimerange"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:00"
            value-format="yyyyMMddHH">
          </el-date-picker>
        </div>
        <m-chart :options="chartOptions" class="chart"></m-chart>
      </div>
    </div>
    <div class="warning">
      <div>
        <div class="f-gis-title">要素阈值预警列表</div>
      </div>
      <m-select class="feature-select" @click="warningSelectHandle" :value="warningType" :size="['100px', '36px']" :bg="require('assets/img/gis/nav4-bg.png')"
        :bgActive="require('assets/img/gis/nav4-bg-active.png')" :data="warningNav"></m-select>
      <ul class="table">
        <li v-for="(val, key) of warningList[warningType]" :key="val"><span>{{key}}</span><span>{{val}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    feature2Name,
    WIND_DIR,
    WIND_DIRECTION_CHINESE_NAME_MAP,
    DIRECTION_MAP
  } from 'config'
  import mChart from 'components/chart'
  import mSelect from 'components/select'
  import moment from 'moment'
  import {
    mapMutations,
    mapGetters
  } from 'vuex'
  import mixins from 'components/mixins'
  import Gis from 'request/gis'
  import {
    cimissName2micapsName
  } from './config'
  export default {
    components: {
      mSelect,
      mChart
    },
    mixins: [mixins],
    props: ['stationData'],
    data() {
      return {
        bjTime: '',
        singleStationTime: (() => {
          let range = [moment().format('YYYYMMDDHH'), moment().add(24, 'hours').format('YYYYMMDDHH')]
          return range;
        })(),
        warningNav: [],
        weatherFeatureList: [{
          label: '气温',
          value: 'tem'
        }, {
          label: '湿度',
          value: 'rhu'
        }, {
          label: '风',
          value: 'win_s'
        }, {
          label: '降水',
          value: 'pre_1h'
        }],
        chartOptions: {},
				feature2Name,
				warningType: '',
        warningList: [],
        oldWeatherFeature: ''
      }
    },
    created() {
      this.calculateBjTime()
			this.getWarning()
    },
    computed: {
      stationName() {
        let station = this.stationData.find(item => {
          return item.station_id === this.currentStationId
        })
        return station ? station.station_name : '';
			},
      micapsWeatherFeature() {
        return cimissName2micapsName[this.weatherFeature];
      },
      ...mapGetters(['currentStationId', 'weatherFeature'])
    },
    methods: {
      getWarning() {
				Gis.getWarning().then(res => {
					if (res === true) return;
					let tempWarningNav = []
					let tempWarningList = {}
					res.forEach(item => {
						tempWarningNav.push({
							label: item.border.element,
							value: item.border.element
						})

						let tempArea = []
						item.areas.forEach(subItem => {
							tempArea.push(subItem.name)
						})
						if (!tempWarningList[item.border.element]) {
							tempWarningList[item.border.element] = {}
							tempWarningList[item.border.element]['时期'] = item.border.timeName
							tempWarningList[item.border.element]['时间'] = item.border.timeInterval
							tempWarningList[item.border.element]['标准'] = item.border.standard
							tempWarningList[item.border.element]['报警区域'] = tempArea.join(',')
						}
					})
					this.warningNav = tempWarningNav
					this.warningType = tempWarningNav[0].value
					this.warningList = tempWarningList
				})
      },
      onChangeSingleStationTime() {
				this.renderSigleStationForecast()
				this.$refs.future24.className = ''
      },
      getWindDirectionSymbolByDegree(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        // var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return WIND_DIR[(val % 16)];
      },
      renderArrow(param, api) {
        let arrowSize = 18
        let point = api.coord([
          api.value(0),
          api.value(1)
        ]);
        return {
          type: 'path',
          shape: {
            pathData: 'M31 16l-15-15v9h-26v12h26v9z',
            x: -arrowSize / 2,
            y: -arrowSize / 2,
            width: arrowSize,
            height: arrowSize
          },
          rotation: DIRECTION_MAP[this.getWindDirectionSymbolByDegree(api.value(2))],
          position: point,
        };
      },
      renderSigleStationForecast() {
        this.showLoading()
        if (this.weatherFeature === 'prs') return this.hideLoading();
        Gis.getSigleStationForecast(this.currentStationId, this.micapsWeatherFeature, this.singleStationTime[0], this
          .singleStationTime[1]).then(res => {
          // console.log(res)
          if (this.weatherFeature === 'win_s') {
						let dataset = [
              ['time', 'win_s', 'win_d']
            ]
            Object.keys(res).forEach(item => {
              dataset.push([
                moment(item, 'YYYYMMDDHH').format('MM/DD/HH'),
								res[item][0].toFixed(2),
								res[item][1]
              ])
            })
            this.chartOptions = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                formatter: (params) => {
                  let str = `<p><span style="width:12px;height: 12px;margin-right: 4px;border-radius: 50%;display:inline-block;background-color:${params[0].color}"></span>${params[0].axisValue}</p>
                      <ul style="text-align: left;">
                        <li>风速:${params[0].data[1]}</li>
                        <li>风向:${WIND_DIRECTION_CHINESE_NAME_MAP[this.getWindDirectionSymbolByDegree(params[1].data[2])]}</li>
                      </ul>`
                  return str;
                }
              },
              yAxis: {},
              xAxis: {
                type: 'category'
              },
              dataset: {
                source: dataset
              },
              series: [{
                  type: 'line',
                  encode: {
                    x: 0,
                    y: this.weatherFeature
                  }
                },
                {
                  type: 'custom',
                  renderItem: this.renderArrow,
                  encode: {
                    x: 0,
                    y: this.weatherFeature
                  }
                }
              ]
            }
          } else {
            let dataset = [
              ['time', 'value']
            ]
            Object.keys(res).forEach(item => {
              dataset.push([
                moment(item, 'YYYYMMDDHH').format('MM/DD/HH'),
                res[item]
              ])
            })
            this.chartOptions = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              yAxis: {},
              xAxis: {
                type: 'category'
              },
              dataset: {
                source: dataset
              },
              series: {
                type: 'line',
                encode: {
                  x: 0,
                  y: 1
                }
              }
            }
          }
        }).finally(() => {
          this.hideLoading()
        })
      },
      calculateBjTime() {
        let now = moment()
        setInterval(() => {
          this.bjTime = now.add(1, 'seconds').format('HH:mm:ss')
        }, 1000)
      },
      featureSelectHandle(val) {
        this.setWeatherFeature(val)
        this.renderSigleStationForecast()
      },
      warningSelectHandle(val) {
				this.warningType = val
			},
			future24Handle() {
				this.$refs.future24.className = 'active'
				this.singleStationTime = [moment().format('YYYYMMDDHH'), moment().add(24, 'hours').format('YYYYMMDDHH')]
				this.renderSigleStationForecast()
			},
      ...mapMutations({
        'setWeatherFeature': 'SET_WEATHER_FEATURE'
      })
    },
    watch: {
      currentStationId() {
        this.renderSigleStationForecast()
      },
      weatherFeature(newVal, oldVal) {
        this.oldWeatherFeature = oldVal
        this.renderSigleStationForecast()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-forecast {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;

    .time {
      background: url(../../assets/img/gis/time-bg.png) no-repeat center center / 100% 100%;
      height: 106px;
      padding: $padding;
      box-sizing: border-box;
      display: flex;
      margin-top: 0;
      align-items: flex-end;
			justify-content: space-around;

      span:nth-child(1) {
        flex: 0 1 60%;
        font-size: 58px;
        color: $color-subMain;
        letter-spacing: 10px;
      }

      span:nth-child(2) {
        flex: 1;
        align-self: flex-end;
      }
    }

    .forecast {
      height: 426px;
      background: url(../../assets/img/gis/forecast-bg.png) no-repeat center center / 100% 100%;
      padding: $padding;
      display: flex;
      flex-flow: column;
			justify-content: space-around;
			box-sizing: border-box;
    }

    .single-station-chart {
      height: 260px;

      &>div {
        display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10px 0;
				& > span.active {
					color: $color-subMain;
				}
      }

      .chart {
        height: 220px;
      }
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 320px;
    }

    .warning {
      background: url(../../assets/img/gis/warning-bg.png) no-repeat center / 100% 100%;
      flex: 1;
      padding: $padding;
      display: flex;
      flex-flow: column;

      div:nth-child(2) {
        margin: 20px 0;
      }

      .table {
        border: 1px solid #3c5789;

        li {
          display: flex;
          border-bottom: 1px solid #3c5789;
          margin: 0 8px;
        }

        span {
          text-align: center;
          display: inline-block;
          line-height: 30px;
        }

        span:nth-child(1) {
          flex: 0 1 80px;
          border-right: 1px solid #3c5789;
        }

        span:nth-child(2) {
          flex: 1;
          color: $color-subMain;
        }
      }
    }
  }
</style>