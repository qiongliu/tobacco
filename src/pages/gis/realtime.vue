<template>
  <div class="m-realtime">
    <div class="weather">
      <span class="weather-icon"><img :src="require('assets/img/weather/weather00.png')" alt=""></span>
      <div class="detail">
        <div>
          <span class="state">晴</span>
          <span>12-20˚C</span>
        </div>
        <div>
          <span>02/19 2019</span>
          <span>农历正月十五</span>
          <span>星期二</span>
        </div>
      </div>
    </div>
    <div class="realtime">
      <p class="f-gis-title">
        实时数据
      </p>
      <m-select :value="weatherFeature" class="feature-select" @click="selectHandle"></m-select>
      <p class="f-gis-sub-title">
        各站点气温要素信息
      </p>
      <div class="date">
        <span ref="allStationNewBtn" @click="allStationNewHandle">最新</span>
        <el-date-picker v-model="allStationTime" ref="allStationTime" @change="allStationTimeChange"
          format="yyyy-MM-dd HH:00" value-format="yyyyMMddHH" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="all-station-chart">
        <ul>
          <li v-for="(item,index) of allStationData" :key="index"><span>{{item.station_name}}</span>
            <el-progress class="progress" :show-text="false" :percentage="calculateScale(item[weatherFeature])">
            </el-progress><span>{{item[weatherFeature]}} {{featureUnit[weatherFeature]}}</span>
          </li>
        </ul>
      </div>
      <div class="single-station">
        <p>{{stationName}}{{feature2Name[weatherFeature]}}变化趋势</p>
        <div class="single-station-time">
          <div class="week-24">
            <span :class="weekOr24 === '24' ? 'active' : ''" @click="weekOr24Handle('24')">24h</span>
            <span>|</span>
            <span :class="weekOr24 === 'week' ? 'active' : ''" @click="weekOr24Handle('week')">最近一周</span>
          </div>
          <el-date-picker v-model="singleStationTime" @change="onChangeSingleStationTime" type="datetimerange"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:00"
            value-format="yyyyMMddHH">
          </el-date-picker>
        </div>
        <m-chart class="single-station-chart" :options="chartOptions"></m-chart>
      </div>
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
  import mSelect from 'components/select'
  import mChart from 'components/chart'
  import moment from 'moment'
  import Gis from 'request/gis'
  import {
    featureUnit
  } from 'config'
  import {
    mapMutations,
    mapGetters
  } from 'vuex'
  import mixins from 'components/mixins'
  export default {
    components: {
      mSelect,
      mChart
    },
    mixins: [mixins],
    data() {
      return {
        allStationTime: moment().format('YYYYMMDDHH'),
        singleStationTime: (() => {
          let range = [moment().subtract(24, 'hours').format('YYYYMMDDHH'), moment().format('YYYYMMDDHH')]
          return range;
        })(),
        allStationData: [],
        weekOr24: '24',
        featureUnit,
        chartOptions: null,
        feature2Name
      }
    },
    created() {
      this.getAllStations()
      this.setWeatherFeature('tem')
    },
    computed: {
      stationName() {
				let station = this.allStationData.find(item => {
					return item.station_id === this.currentStationId
				})
				return station ? station.station_name : '';
			},
      ...mapGetters(['currentStationId', 'weatherFeature'])
    },
    methods: {
      getAllStations() {
        this.showLoading()
        Gis.getAllStations(this.allStationTime).then(res => {
            if (res === true) return;
            this.calculateFeatureMaxValue(res)
            this.allStationData = res
            this.setCurrentStationId(res[0].station_id)
            this.$emit('setRealtimeData', res)
          })
          .finally(() => {
            this.hideLoading()
          })
      },
      calculateFeatureMaxValue(data) {
        this.featureMaxValue = {}
        let tempArr = {
          rhu: [],
          prs: [],
          win_s: [],
          tem: [],
          pre_1h: []
        }
        data.forEach(item => {
          Object.keys(item).forEach(feature => {
            if (tempArr[feature]) tempArr[feature].push(item[feature])
          })
        })
        Object.keys(tempArr).forEach(item => {
          tempArr[item].sort((a, b) => {
            return a - b
          })
        })
        Object.keys(tempArr).forEach(item => {
          this.featureMaxValue[item] = tempArr[item][tempArr[item].length - 1]
        })
      },
      calculateScale(data) {
        return data * 100 / (this.featureMaxValue[this.weatherFeature] * 1.2) || 0;
      },
      selectHandle(val) {
        this.setWeatherFeature(val)
        this.renderSigleStationRealtime()
      },
      weekOr24Handle(val) {
        this.weekOr24 = val
        if (val === '24') {
          this.singleStationTime = [moment().subtract(24, 'hours').format('YYYYMMDDHH'), moment().format('YYYYMMDDHH')]
        } else if (val === 'week') {
          this.singleStationTime = [moment().subtract(7, 'days').format('YYYYMMDDHH'), moment().format('YYYYMMDDHH')]
        }
        this.renderSigleStationRealtime()
      },
      allStationTimeChange(val) {
        this.getAllStations()
        this.$refs.allStationNewBtn.className = ''
      },
      onChangeSingleStationTime() {
        this.weekOr24 = ''
        this.renderSigleStationRealtime()
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
          api.value(5)
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
          rotation: DIRECTION_MAP[this.getWindDirectionSymbolByDegree(api.value(6))],
          position: point,
        };
      },
      renderSigleStationRealtime() {
        this.showLoading()
        Gis.getSigleStationRealtime(this.currentStationId, this.singleStationTime[0], this.singleStationTime[1]).then(
            res => {
              let dataset = [
                ['time', 'tem', 'rhu', 'prs', 'pre_1h', 'win_s', 'win_d']
              ]
              res.forEach(item => {
                dataset.push([
                  moment(item.datetime, 'YYYYMMDDHH').format('MM/DD/HH'),
                  item.tem,
                  item.rhu,
                  item.prs,
                  item.pre_1h,
                  item.win_s,
                  item.win_d
                ])
              })
              if (this.weatherFeature === 'win_s') {
                this.chartOptions = {
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    },
                    formatter: (params) => {
                      let str = `<p><span style="width:12px;height: 12px;margin-right: 4px;border-radius: 50%;display:inline-block;background-color:${params[0].color}"></span>${params[0].axisValue}</p>
                      <ul style="text-align: left;">
                        <li>风速:${params[0].data[5]}</li>
                        <li>风向:${WIND_DIRECTION_CHINESE_NAME_MAP[this.getWindDirectionSymbolByDegree(params[1].data[6])]}</li>
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
                      y: this.weatherFeature
                    }
                  }
                }
              }
            })
          .finally(() => {
            this.hideLoading()
          })
      },
      allStationNewHandle() {
        this.allStationTime = moment().format('YYYYMMDDHH')
        this.$refs.allStationNewBtn.className = 'active'
        this.getAllStations()
      },
      ...mapMutations({
        'setCurrentStationId': 'SET_CURRENT_STATIONID',
        'setWeatherFeature': 'SET_WEATHER_FEATURE'
      })
    },
    watch: {
      currentStationId(newVal) {
        this.renderSigleStationRealtime()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-realtime {
    display: flex;
    flex-flow: column;

    .weather {
      background: url(../../assets/img/gis/weather-bg.png) no-repeat center center / 100% 100%;
      height: 106px;
      padding: $padding;
      box-sizing: border-box;
      display: flex;
      margin-top: 0;
      align-items: center;
    }

    .weather-icon {
      flex: 0 1 90px;
      width: 90px;
      height: 90px;
      margin-right: 10px;
    }

    .detail {
      flex: 1;
      display: flex;
      flex-flow: column;
      justify-content: center;

      &>div {
        margin: 12px;
      }

      div:nth-child(1) {
        font-size: $font-size-bigger;
      }

      div:nth-child(2) {
        font-size: $font-size-large;
        color: $color-subMain;

        span {
          margin: 0 6px;
        }
      }
    }

    .realtime {
      background: url(../../assets/img/gis/real-bg.png) no-repeat center center / 100% 100%;
      padding: $padding;
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
    }

    .date {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &>span {
        font-size: $font-size;
        &.active {
          color: $color-subMain;
        }
      }
    }

    .all-station-chart {
      padding-bottom: 8px;

      ul {
        height: 200px;
        overflow-y: auto;
      }

      li {
        margin: 8px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          flex: 0 1 80px;
          font-size: $font-size;
        }

        span:nth-child(1) {
          text-align: center;
        }

        span:nth-child(3) {
          text-align: right;
        }
      }

      .progress {
        flex: 1;
      }
    }

    .single-station {
      background-color: #102c59;
      padding: 10px;
      box-sizing: border-box;

      p {
        font-size: $font-size-large;
      }
    }

    .single-station-time {
      display: flex;
      margin: $margin 0;
      justify-content: space-between;
      align-items: center;

      .week-24 {
        cursor: pointer;
        font-size: $font-size;
      }

      .active {
        color: $color-subMain;
      }

      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 320px;
      }
    }

    .single-station-chart {
      height: 170px;
    }
  }
</style>