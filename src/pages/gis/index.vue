<template>
  <div class="g-gis">
    <realtime class="realtime" @setRealtimeData="setRealtimeDataHandle"></realtime>
    <gis class="gis" :stationData="realtimeData"></gis>
    <forecast class="forecast" :stationData="realtimeData"></forecast>
  </div>
</template>

<script>
  import Gis from 'request/gis'
  import mixins from 'components/mixins'
  import realtime from './realtime'
  import forecast from './forecast'
  import gis from './gis'
  export default {
    components: {
      realtime,
      forecast,
      gis
    },
    mixins: [mixins],
    data() {
      return {
        weatherFeature: 'tem',
        realtimeData: []
      }
    },
    created() {
      
    },
    methods: {
      setRealtimeDataHandle(data) {
        this.realtimeData = data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .g-gis {
    display: flex;
    height: calc(100% - 104px);
    margin: 0 $margin;
    & > div {
      flex: 1;
      margin: $margin;
    }
    .gis {
      flex: 0 1 873px;   
    }
  }
</style>
