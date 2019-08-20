<template>
  <div class="g-farmload">
    <div class="left">
      <div class="farmload-calendar">
        <div class="feature">
          <div class="f-title">烟田日历</div>
          <div>
            <m-select :data="calendarNav"></m-select>
            <el-date-picker class="calendar-date" v-model="calendarDate" type="month" placeholder="选择月份"
              @change="calendarDateHandle">
            </el-date-picker>
            <span>最新时间</span>
          </div>
        </div>
        <p>颜色说明：<span class="f-blue">绿色</span>代表<span class="f-blue">有降水</span>；<span class="f-green">蓝色</span>代表<span
            class="f-green">1-3天无降水</span>；<span class="f-yellow">黄色</span>代表<span
            class="f-yellow">4-10天无降水</span>；<span class="f-orange">橙色</span>代表<span
            class="f-orange">11-20天无降水</span>；<span class="f-red">红色</span>代表<span class="f-red">20天以上无降</span></p>
        <p><span class="f-blue">今天有降水。/ </span><span class="f-green"> 截至目前，已有3天无降水。/ </span><span class="f-yellow">
            截至目前，已有5天无降水. /</span><span class="f-orange"> 截至目前，已有15天无降水。/ </span><span
            class="f-red">截至目前，已有25天无降水。</span></p>
        <div class="calendar">
          <calendar :month="calendarDate" :legend="calendarLegend" :data="calendarData"></calendar>
        </div>
      </div>
      <div class="period">
        <div class="f-title">作物生长周期</div>
        <div>
          <m-select :data="periodData" :size="['92px', '32px']"></m-select>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="information">
        <div>
					<div class="title-weather">
						<div class="f-title">烟田气象信息</div>
						<div class="weather">
							<div>
								<img :src="require('assets/img/weather/weather00.png')"
										alt=""><span>晴</span><span>12-20˚C</span>
							</div>
							<div>
								<div><img :src="require('assets/img/other/i-rain.png')"
										alt=""><span>0mm</span></div>
								<div><img :src="require('assets/img/other/i-rhu.png')"
										alt=""><span>30%</span></div>
								<div><img :src="require('assets/img/other/i-wind.png')"
										alt=""><span>东南 2m/s</span></div>
							</div>
						</div>
					</div>
          <div class="history24">
						<p class="title">过去24h信息</p>
            <el-tabs tab-position="left" v-model="historyTab">
              <el-tab-pane label="温度" name="tem">温度</el-tab-pane>
              <el-tab-pane label="降水" name="pre_1h">降水</el-tab-pane>
              <el-tab-pane label="风速" name="win_s">风速</el-tab-pane>
              <el-tab-pane label="湿度" name="rhu">湿度</el-tab-pane>
            </el-tabs>
          </div>
					<div>
						<p class="title">农场天气预报</p>
						<div class="days7">
							<p class="sub-title">7天天气预报</p>
							<ul>
								<li>
									<div>21日（今天）</div>
									<div></div>
									<div>30/21˚C</div>
									<div>南风 微风</div>
								</li>
							</ul>
						</div>
						<div class="hours12">
							<p class="sub-title">12h天气预报</p>
							<ul>
								<li>
									<div>01时</div>
									<div></div>
								</li>
							</ul>
							<m-chart></m-chart>
						</div>
						<div class="hours2">
							<p class="sub-title">2h分钟级降水预报</p>
							<div>
								<m-chart></m-chart>
								<p>一小时后一小时后一小时后一小时后一小时后一小时后一小时后一小时后一小时后</p>
							</div>
						</div>
					</div>
					<div class="suggest">
						<p class="title">农事建议</p>
						<div>
							<p>目前处于育苗期，无要素阈值预警， 建议今天可以进行浇水。</p>
							<ul>
								<li><span></span><span></span></li>
								<li><span></span><span></span></li>
								<li><span></span><span></span></li>
							</ul>
						</div>
          </div>
					<div class="attestation-feedback">
						<div class="attestation">
							<p class="title">气象认证</p>
							<a href="javascript:;">新增农业保险气象认证</a>
						</div>
						<div class="feedback">
							<p class="title">互动与反馈</p>
							<a href="javascript:;">新增反馈意见</a>
						</div>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import mSelect from 'components/select'
  import calendar from 'components/calendar'
	import Gis from 'request/gis'
	import mChart from 'components/chart'
  export default {
    components: {
      mSelect,
			calendar,
			mChart
    },
    data() {
      return {
        calendarNav: [{
          label: '气温',
          value: 'tem'
        }, {
          label: '湿度',
          value: 'rhu'
        }, {
          label: '风速',
          value: 'win_s'
        }, {
          label: '降水',
          value: 'pre_1h'
        }],
        calendarDate: new moment(),
        calendarData: [],
        calendarLegend: [],
        periodData: [{
          label: '平均温度',
          value: 'tem'
        }, {
          label: '均降水量',
          value: 'pre_1h'
        }, {
          label: '均日照数',
          value: 'sun'
        }, {
          label: '平均湿度',
          value: 'rhu'
				}],
				historyTab: 'tem'
      }
    },
    mounted() {

    },
    methods: {
      calendarDateHandle(val) {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .g-farmload {
    display: flex;
    height: calc(100% - 104px);

    .left {
      flex: 0 1 56%;
      display: flex;
      flex-flow: column;
      margin: 0 0 $margin $margin;
    }

    .right {
      flex: 0 1 44%;
      margin: 0 $margin $margin $margin;
    }

    .information {
      height: 100%;
			background: url(../../assets/img/other/calendar-bg.png) no-repeat center center / 100% 100%;
			padding: 20px;
		}
		.title-weather {
			display: flex;
			justify-content: space-between;
		}
		.weather {
			display: flex;
			& > div {
				align-items: center;
				display: flex;
			}
			div:nth-child(1) {
				margin-right: 20px;
				img {
					width: 44px;
				}
				span:nth-child(2) {
					margin: 0 8px;
				}
			}
			div:nth-child(2) {
				img {
					width: 44px;
				}
				div {
					display: flex;
					flex-flow: column;
					align-items: center;
					margin: 0 6px;
					font-size: $font-size;
				}
			}
		}
		.title {
			font-size: $font-size;
			color: $color-subMain;
			line-height: 32px;
		}

    .farmload-calendar {
      flex: 0 1 60%;
      background: url(../../assets/img/other/calendar-bg.png) no-repeat center center / 100% 100%;
      padding: $padding;
      display: flex;
      flex-flow: column;
      justify-content: space-around;

      .feature {
        display: flex;
        justify-content: space-between;

        &>div:nth-child(2) {
          display: flex;
          align-items: center;
        }
      }

      p {
        font-size: $font-size;
      }

      .calendar-date {
        margin: 0 6px;
      }
    }

    .period {
      flex: 1;
      margin-top: $margin;
      background: url(../../assets/img/other/calendar-bg.png) no-repeat center center / 100% 100%;
      padding: $padding;

    }
  }
</style>

<style lang="scss" scoped>
	.g-farmload {
		.el-tabs__item {
			color: #fff;
		}
	}
</style>
