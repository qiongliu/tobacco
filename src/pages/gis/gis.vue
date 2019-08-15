<template>
  <div class="m-gis">
    <m-select class="nav" :data="nav" :size="['100px', '46px']" :activeBg="require('assets/img/gis/nav3-bg-active.png')"></m-select>
		<div id="map">
			<ol-map :zoom="7.4" :center="[115.89, 27.28]">
				<!-- <ol-tile :vid="'base'"></ol-tile> -->
				<ol-vector
					:data="jiangxiBorder"
					:vid="'jiangxi'">
				</ol-vector>
				<ol-marker
					:data="station"
					:vid="'station'"
					:scale="0.8"
					:textOffset="[0, 20]"
					:bgImg="require('assets/img/gis/station.png')"
					@singleclick="stationHandle">
				</ol-marker>
			</ol-map>
		</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { gisNav } from './config'
import jiangxiBorder from 'assets/json/jiangxi'
import mSelect from 'components/select'
import { mapMutations } from 'vuex'
export default {
	components: {
		mSelect
	},
	props: ['stationData'],
	data() {
		return {
			nav: gisNav,
			jiangxiBorder
		}
	},
	computed: {
		station() {
			return this.stationData.map(item => {
				return {
					lon: item.lon,
					lat: item.lat,
					text: item.station_name,
					attr: {
						...item
					}
				}
			})
		}
	},
	methods: {
		stationHandle(val) {
			let attr = val.selected[0].get('attr')
			let id = attr.attr.station_id
			this.setCurrentStationId(attr.attr.station_id)
			let currentStation = this.station.find(item => {
				return item.attr.station_id === id
			})
			// currentStation.bgColor = '#f00'
			// Vue.set(currentStation, 'bgColor', '#f00')
			// console.log(this.station)
		},
		...mapMutations({
			'setCurrentStationId': 'SET_CURRENT_STATIONID'
		})
	}
}
</script>

<style lang="scss" scoped>
	.m-gis {
		display: flex;
		flex-flow: column;
		#map {
			flex: 1;
			background:linear-gradient(0deg,rgba(19,61,130,1) 0%);
		}
		.nav {
			flex: 0 1 50px;
		}
	}
</style>

