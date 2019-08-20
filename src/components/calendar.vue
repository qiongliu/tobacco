<template>
  <div class="m-calendar">
    <ul class="week">
      <li><span>一</span></li>
      <li><span>二</span></li>
      <li><span>三</span></li>
      <li><span>四</span></li>
      <li><span>五</span></li>
      <li><span>六</span></li>
      <li><span>七</span></li>
    </ul>
    <ul class="day">
      <li v-for="(item, index) in data" :key="index">
        <template v-if="item.data">
          <div><span>{{item.date}}</span></div>
          <div class="data">{{item.data}}</div>
        </template>
        <template v-else>
          <li><span>{{item.date}}</span></li>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    month: {
      type: [Date, Object],
      default: moment()
    }
  },
  created() {
    this.init(this.month)
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    init(m) {
      this.calculateDay(m)
    },
    calculateDay(m) {
      let tempMonth = moment(m).add(1, 'months')
      //月份
      let month = tempMonth.month() + 1
      //本月共有多少天
      let daysLen = moment(tempMonth).daysInMonth()
      //上月共有多少天
      let lastMonthDaysLen = moment(tempMonth.subtract(1, 'months')).daysInMonth()
      //本月第一天
      let firstDay = moment(tempMonth.format('YYYY-MM-01'))
      //本月第一天是周几
      let firstDayIsWeek = firstDay.day()

      let tempData = []

      for (let i = lastMonthDaysLen; i > lastMonthDaysLen - firstDayIsWeek + 1; i--) {
        tempData.push({
          date: i,
          data: null
        })
      }

      tempData.reverse()
  
      for (let i = 0; i < daysLen; i++) {
        tempData.push({
          date: i === 0 ? firstDay.format('M月D日') : firstDay.add(1, 'days').format('M月D日'),
          data: '1.2mm'
        })
      }
      
      this.data = tempData
    }
  },
  watch: {
    month(m) {
      this.init(m)
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-calendar {
    font-size: 14px;
    .week {
      display: flex;
      background-color: #163167;
      li {
        flex: 0 1 14.285%;
        text-align: center;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 20px;
        box-sizing: border-box;
      }
    }
    .day {
      display: flex;
      flex-flow: wrap;
      li {
        flex: 0 1 14.285%;
        text-align: center;
        height: 60px;
        display: flex;
        flex-flow: column ;
        align-items: center;
        justify-content: center;
        padding: 14px;
        box-sizing: border-box;
        & > div {
          flex: 1;
        }
        &.active {
          background-color: rgba(36, 68, 128, 1);
        }
      }
      .data {
        margin-top: 6px;
        width: 100%;
        padding: 6px;
        background-color: rgba(123, 210, 139, 1);
        box-sizing: border-box;
      }
    }
  }
</style>


