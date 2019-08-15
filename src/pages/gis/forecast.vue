<template>
  <div class="m-forecast">
		<div class="time">
			<span>{{bjTime}}</span><span>北京时间</span>
		</div>
		<div class="forecast">
			<div class="f-gis-title">预报数据</div>
			<m-select class="feature-select" @click="featureSelectHandle"></m-select>
			<p class="f-gis-sub-title">西安站气温变化图</p>
			<div class="single-station-chart">
				<div>
					<span>未来24h</span>
					<el-date-picker v-model="singleStationTime" format="yyyy-MM-dd HH:00" value-format="yyyyMMddHH" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
				</div>
				<m-chart class="chart"></m-chart>
			</div>
		</div>
		<div class="warning">
			<div>
				<div class="f-gis-title">预报数据</div>
			</div>
			<m-select class="feature-select" @click="selectHandle" :bg="require('assets/img/gis/nav4-bg.png')" :bgActive="require('assets/img/gis/nav4-bg-active.png')" :data="warningBtn"></m-select>
			<ul class="table">
				<li><span>时期</span><span>育苗期</span></li>
				<li><span>时期</span><span>育苗期</span></li>
				<li><span>时期</span><span>育苗期</span></li>
				<li><span>时期</span><span>育苗期</span></li>
			</ul>
		</div>
  </div>
</template>

<script>
import mChart from 'components/chart'
import mSelect from 'components/select'
import moment from 'moment'
export default {
	components: {
		mSelect,
		mChart
	},
	data() {
		return {
			bjTime: '',
			singleStationTime: '',
			warningBtn: [
				{
					label: '低温冰冻',
					value: 'lower'
				},{
					label: '春季高温',
					value: 'high'
				}
			]
		}
	},
	created() {
		this.calculateBjTime()
	},
	methods: {
		calculateBjTime() {
			let now = moment()
			setInterval(() => {
				this.bjTime = now.add(1, 'seconds').format('HH:mm:ss')
			}, 1000)
		},
		featureSelectHandle() {

		},
		selectHandle() {

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
			}
			span:nth-child(2) {
				flex: 1;
				align-self: flex-end;
			}
		}
		.forecast {
			height: 426px;
			background: url(../../assets/img/gis/forecast-bg.png) no-repeat center / 100%;
			padding: $padding;
			display: flex;
			flex-flow: column;
			justify-content: space-around;
		}
		.single-station-chart {
			height: 260px;
			& > div {
				display: flex;
				justify-content: space-between;
			}
			.chart {
				height: 200px;
			}
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
