<template>
  <div class="m-gis">
    <m-select class="nav" :data="navList" :value.sync="navValue" :size="['100px', '46px']"
      :activeBg="require('assets/img/gis/nav3-bg-active.png')"></m-select>
    <div class="sub-nav" v-show="navValue === 'realtime'">
      <el-checkbox-group v-model="realtimeCheckbox" size="mini" @change="subNavHandle">
        <div class="list">
          <el-checkbox-button label="station">自动站</el-checkbox-button>
          <el-radio-group v-model="stationRadio" stmpize="mini" v-show="realtimeCheckbox.indexOf('station') > -1">
            <el-radio-button label="tem">气温</el-radio-button>
            <el-radio-button label="rhu">湿度</el-radio-button>
            <el-radio-button label="win_s">风</el-radio-button>
            <el-radio-button label="prs">气压</el-radio-button>
            <el-radio-button label="pre_1h">降水</el-radio-button>
          </el-radio-group>
        </div>
        <div class="list">
          <el-checkbox-button label="radar">雷达</el-checkbox-button>
          <el-radio-group v-model="radarRadio" size="mini" @change="radarHandle"
            v-show="realtimeCheckbox.indexOf('radar') > -1">
            <el-radio-button label="base">基本反射率</el-radio-button>
            <el-radio-button label="group">组合反射率</el-radio-button>
          </el-radio-group>
        </div>
        <div class="list">
          <el-checkbox-button label="cloud">卫星云图</el-checkbox-button>
          <el-radio-group v-model="cloudRadio" size="mini" @change="cloudHandle"
            v-show="realtimeCheckbox.indexOf('cloud') > -1">
            <el-radio-button label="visible">可见光</el-radio-button>
            <el-radio-button label="infrared">红外</el-radio-button>
          </el-radio-group>
        </div>
      </el-checkbox-group>
    </div>
    <div class="sub-nav" v-show="navValue === 'forecast'">
      <el-checkbox-group v-model="forecastCheckbox" size="mini" @change="subNavHandle">
        <div class="list">
          <el-checkbox-button label="feature">要素</el-checkbox-button>
          <el-radio-group v-model="featureRadio" stmpize="mini">
            <el-radio-button label="tem">气温</el-radio-button>
            <el-radio-button label="pre_1h">降水</el-radio-button>
            <el-radio-button label="win_s">风</el-radio-button>
            <el-radio-button label="rhu">相对湿度</el-radio-button>
          </el-radio-group>
        </div>
        <div class="list">
          <el-checkbox-button label="type">展示方式</el-checkbox-button>
          <el-radio-group v-model="typeRadio" size="mini">
            <el-radio-button label="base">数据填值</el-radio-button>
            <el-radio-button label="group">数据填色</el-radio-button>
          </el-radio-group>
        </div>
      </el-checkbox-group>
    </div>
    <div class="sub-nav" v-show="navValue === 'short'">
      <el-checkbox-group v-model="shortCheckbox" size="mini" @change="subNavHandle">
        <div class="list">
          <el-checkbox-button label="short">短临数据</el-checkbox-button>
          <el-radio-group v-model="shortRadio" stmpize="mini">
            <el-radio-button label="radar">雷达回波</el-radio-button>
            <el-radio-button label="rain">强降雨</el-radio-button>
            <el-radio-button label="thunder">雷电</el-radio-button>
            <el-radio-button label="hail">冰雹</el-radio-button>
            <el-radio-button label="stormwind">大风</el-radio-button>
          </el-radio-group>
        </div>
      </el-checkbox-group>
    </div>
    <div class="sub-nav" v-show="navValue === 'risk'">
      <el-checkbox-group v-model="riskCheckbox" size="mini" @change="subNavHandle">
        <div class="list">
          <el-checkbox-button label="risk">风险区划</el-checkbox-button>
          <el-radio-group v-model="riskRadio" stmpize="mini" @change=riskHandle>
            <el-radio-button label="gh">干旱</el-radio-button>
            <el-radio-button label="lyy">连阴雨</el-radio-button>
            <el-radio-button label="dwdh">低温冻害</el-radio-button>
            <el-radio-button label="by">暴雨</el-radio-button>
            <el-radio-button label="gwrh">高温热害</el-radio-button>
            <el-radio-button label="index">气候适宜性指数</el-radio-button>
            <el-radio-button label="tobacco">烟草种植适宜度区划</el-radio-button>
            <el-radio-button label="zh">结合</el-radio-button>
          </el-radio-group>
        </div>
      </el-checkbox-group>
    </div>
    <div class="sub-nav" v-show="navValue === 'tobacco'">
      <el-checkbox-group v-model="tobaccoCheckbox" size="mini" @change="subNavHandle">
        <div class="list">
          <el-checkbox-button label="area">种植区</el-checkbox-button>
          <el-radio-group v-model="areaRadio" stmpize="mini">
            <el-radio-button label="sjq">实际区</el-radio-button>
            <el-radio-button label="ghq">规划区</el-radio-button>
          </el-radio-group>
        </div>
        <div class="list">
          <el-checkbox-button label="visual">可视化</el-checkbox-button>
          <el-radio-group v-model="visualRadio" stmpize="mini">
            <el-radio-button label="sjq">视频</el-radio-button>
            <el-radio-button label="ghq">遥感</el-radio-button>
          </el-radio-group>
        </div>
      </el-checkbox-group>
    </div>
    <div class="gis">
      <div class="form" v-show="navValue === 'warning'">
        <p class="f-title">预警发布</p>
        <div>
          <span>预警类型：</span>
          <m-select :data="warningTypeList" :size="['100px', '36px']" :value="form.warningType"></m-select>
        </div>
        <div class="warning-time">
          <span>预警时效：</span>
          <el-select v-model="form.warningTime" placeholder="请选择">
            <el-option v-for="item in warningTimeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>发布内容：</span>
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.textarea"></el-input>
        </div>
        <div>
          <span>发布对象：</span>
          <m-select :data="warningObjectList" :value="form.warningObject"></m-select>
        </div>
				<div class="btn">
					<el-button type="primary">发布</el-button>
				</div>
      </div>
      <ol-map :zoom="7.4" :center="[115.89, 27.28]">
        <ol-tile :vid="'base'"></ol-tile>
        <ol-vector :data="jiangxiBorder" :vid="'jiangxi'">
        </ol-vector>
        <ol-marker :data="station" :vid="'station'" :scale="0.8" :textOffset="[0, 20]" :zIndex="999"
          :bgImg="require('assets/img/gis/station.png')" :bgColor="variable['color-subMain']"
          @singleclick="stationHandle">
        </ol-marker>
        <ol-text :data="stationFeature" :vid="'stationFeature'" :scale="0.8" align="left" :offset="[16, 0]"
          :zIndex="999" @singleclick="stationHandle">
        </ol-text>
        <ol-image :data="radarImg" :extent="radarExtent" :vid="'radarImg'"></ol-image>
        <ol-image :data="cloudImg" :extent="cloudExtent" :vid="'cloudImg'"></ol-image>
        <ol-image :data="riskImg" :extent="riskExtent" :vid="'riskImg'"></ol-image>
      </ol-map>
    </div>
  </div>
</template>

<script>
  import Gis from 'request/gis'
  import moment from 'moment'
  import {
    gisNav,
    tobaccoBorder,
    riskBorder,
    gwrhBorder
  } from './config'
  import {
    featureUnit
  } from 'config'
  import jiangxiBorder from 'assets/json/jiangxi'
  import mSelect from 'components/select'
  import {
    mapMutations,
    mapGetters
  } from 'vuex'
  const variable = require('../../common/css/variable.js')
  export default {
    components: {
      mSelect
    },
    props: ['stationData'],
    data() {
      return {
        navList: gisNav,
        navValue: 'realtime',
        jiangxiBorder,
        radio4: '',
        realtimeCheckbox: ['station'],
        radarRadio: 'group',
        cloudRadio: 'visible',
        forecastCheckbox: [],
        shortCheckbox: ['short'],
        riskCheckbox: ['risk'],
        tobaccoCheckbox: [],
        featureRadio: '',
        typeRadio: '',
        shortRadio: '',
        riskRadio: 'gh',
        areaRadio: '',
        visualRadio: '',
        variable,
        featureUnit,
        radarImg: '',
        radarExtent: [],
        riskImg: '',
        riskExtent: [],
        station: [],
        stationFeature: [],
        cloudImg: '',
        cloudExtent: [],
        warningTypeList: [{
            label: '低温冰冻',
            value: 'dwbd'
          },
          {
            label: '春季高温',
            value: 'cjgw'
          }
				],
				warningTimeList: [{
            label: '低温冰冻',
            value: 'dwbd'
          },
          {
            label: '春季高温',
            value: 'cjgw'
          }],
        warningObjectList: [{
            label: '低温冰冻',
            value: 'dwbd'
          },
          {
            label: '春季高温',
            value: 'cjgw'
          }
        ],
        form: {
          warningType: 'dwbd'
        }
      }
    },
    computed: {
      stationRadio: {
        set(val) {
          this.setWeatherFeature(val)
        },
        get() {
          return this.weatherFeature;
        }
      },
      ...mapGetters(['currentStationId', 'weatherFeature'])
    },
    methods: {
      renderStation() {
        if (this.realtimeCheckbox.indexOf('station') < 0) return;
        this.station = this.stationData.map(item => {
          return {
            lon: item.lon,
            lat: item.lat,
            text: item.station_name,
            textColor: item.textColor || item.station_id === this.currentStationId ? variable['color-active'] :
              variable['color-subMain'],
            bgColor: item.bgColor || item.station_id === this.currentStationId ? variable['color-active'] :
              variable['color-subMain'],
            attr: {
              ...item
            }
          }
        })
        this.stationFeature = this.stationData.map(item => {
          return {
            lon: item.lon,
            lat: item.lat,
            text: item[this.weatherFeature] + featureUnit[this.weatherFeature],
            textColor: item.textColor || item.station_id === this.currentStationId ? variable['color-active'] :
              variable['color-subMain'],
            attr: {
              ...item
            }
          }
        })
      },
      stationHandle(val) {
        let attr = val.selected[0].get('attr')
        this.setCurrentStationId(attr.attr.station_id)
        this.renderStation()
      },
      subNavHandle(val) {
        if (val.indexOf('station') < 0) {
          this.stationFeature = []
          this.station = []
        } else if (val.indexOf('station') > -1) {
          this.renderStation()
        }
        if (val.indexOf('radar') < 0) {
          this.radarImg = ''
        } else if (val.indexOf('radar') > -1) {
          this.renderRadar()
        }
        if (val.indexOf('cloud') < 0) {
          this.cloudImg = ''
        } else if (val.indexOf('cloud') > -1) {
          this.renderCloud()
        }
      },
      radarHandle() {
        this.renderRadar()
      },
      renderRadar() {
        if (this.radarRadio === 'group') {
          let now = moment()
          Gis.getRadar(now.format('YYYYMMDDHHmm'), now.add(1, 'hours').format('YYYYMMDDHHmm')).then(res => {
            let url = res.host + res.series[Object.keys(res.series)[0]]
            this.radarExtent = [res.bbox.maxlon, res.bbox.maxlat, res.bbox.minlon, res.bbox.minlat]
            this.radarImg = url
          })
        }
      },
      cloudHandle() {
        this.renderCloud()
      },
      renderCloud() {
        Gis.getCloud(this.cloudRadio, moment().subtract(1, 'hours').format('YYYYMMDDHHmm'), moment().format(
          'YYYYMMDDHHmm')).then(res => {
          let keys = Object.keys(res.values)
          let url = res.host + res.values[keys[keys.length - 1]]
          this.cloudExtent = [res.bbox.maxLon, res.bbox.maxLat, res.bbox.minLon, res.bbox.minLat]
          this.cloudImg = url
        })
      },
      riskHandle() {
        this.renderRisk()
			},
			renderRisk() {
				if (this.riskRadio === 'tobacco' || this.riskRadio === 'index') {
          this.riskExtent = [tobaccoBorder.maxlon, tobaccoBorder.maxlat, tobaccoBorder.minlon, tobaccoBorder.minlat]
        } else if (this.riskRadio === 'gwrh' || this.riskRadio === 'zh') {
          this.riskExtent = [gwrhBorder.maxlon, gwrhBorder.maxlat, gwrhBorder.minlon, gwrhBorder.minlat]
        } else {
          this.riskExtent = [riskBorder.maxlon, riskBorder.maxlat, riskBorder.minlon, riskBorder.minlat]
        }
        this.riskImg = require(`assets/img/risk/${this.riskRadio}.png`)
			},
			renderWarning() {

			},
      ...mapMutations({
        'setCurrentStationId': 'SET_CURRENT_STATIONID',
        'setWeatherFeature': 'SET_WEATHER_FEATURE',
      })
    },
    watch: {
      stationData() {
        this.renderStation()
      },
      weatherFeature() {
        this.renderStation()
			},
			navValue(newVal, oldVal) {
				switch(newVal) {
					case 'realtime':
						this.renderStation()
					break;
					case 'forecast':
					break;
					case 'short':
					break;
					case 'risk':
						this.renderRisk()
					break;
					case 'tobacco':
					break;
					case 'warning':
						this.renderWarning()
					break;
				}

				switch(oldVal) {
					case 'realtime':
						this.realtimeCheckbox = []
						this.stationFeature = []
						this.station = []
						this.radarImg = ''
						this.cloudImg = ''
					break;
					case 'forecast':
					break;
					case 'short':
					break;
					case 'risk':
						this.riskImg = ''
					break;
					case 'tobacco':
					break;
					case 'warning':
					break;
				}
			}
    },
  }
</script>

<style lang="scss" scoped>
  .m-gis {
    display: flex;
    flex-flow: column;
    position: relative;

    .gis {
      position: relative;
      flex: 1;
      background: linear-gradient(0deg, rgba(19, 61, 130, 1) 0%);
    }

    .nav {
      flex: 0 1 50px;
      width: 80%;
    }

    .form {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
			height: 100%;
			box-sizing: border-box;
      background: linear-gradient(0deg, rgba(19, 61, 130, 1) 0%);
			z-index: 9;
			padding: $padding;
			& > div {
				margin: 40px 0;
				display: flex;
				align-items: center;
				& > span {
					flex: 0 1 100px;
				}
				& > div {
					flex: 0 1 70%;
				}
			}
			
			.btn {
				justify-content: center;
				button {
					width: 200px;
				}
			}
			.warning-time {
				width: 400px;
			}
    }

    .slide-enter,
    .slide-leave-to {
      width: 0;
    }

    .slide-enter-active,
    .slide-leave-active {
      transition: width .1s;
      width: auto;
    }

    .sub-nav {
      position: absolute;
      top: 60px;
      left: 20px;
      z-index: 9;

      &>div {
        display: flex;
        flex-flow: column;
      }
    }
  }
</style>

<style lang="scss">
  .m-gis {
    .sub-nav {
      label {
        margin-bottom: 10px;
      }
    }

    .list {
      display: flex;
      width: max-content;
    }

    .el-radio-group {
      height: 26px;
      margin-left: 20px;
      background: rgba(142, 98, 98, 0.2);
      overflow: hidden;
    }

    .el-checkbox-button__inner {
      width: 80px !important;
      border: none !important;
      color: #fff;
      background: url(../../assets/img/gis/nav5-bg.png) no-repeat center center / 100% 100%;
    }

    .is-checked .el-checkbox-button__inner {
      border: none;
      box-shadow: none !important;
      background: url(../../assets/img/gis/nav5-bg-active.png) no-repeat center center / 100% 100%;
    }

    .el-radio-button__inner {
      background: none;
      border: none !important;
      box-shadow: none !important;
      color: #fff;
    }

    .is-active .el-radio-button__inner {
      background: none;
      border: none !important;
      box-shadow: none !important;
      color: $color-subMain;
    }

    .el-checkbox-group {
      width: 0;
    }
  }
</style>