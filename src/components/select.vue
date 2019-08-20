<template>
  <div class="m-select">
    <ul>
      <li v-for="(item, index) in data" :key="index" :style="{width: size[0], height: size[1], backgroundImage: currentValue !== item.value ? `url(${bg})` : `url(${bgActive})`}" :class="currentValue === item.value ? 'active' : ''"
        @click="clickHandle(item.value)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: 'tem'
      },
      data: {
        type: Array,
        default () {
          return [{
            label: '气温',
            value: 'tem'
          }, {
            label: '湿度',
            value: 'rhu'
          }, {
            label: '风',
            value: 'win_s'
          }, {
            label: '气压',
            value: 'prs'
          }, {
            label: '降水',
            value: 'pre_1h'
          }]
        }
      },
      bg: {
        type: String,
        default: require('assets/img/gis/nav2-bg.png')
      },
      bgActive: {
        type: String,
        default: require('assets/img/gis/nav2-bg-active.png')
      },
      size: {
        type: Array,
        default() {
          return ['70px' , '32px'];
        }
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    methods: {
      clickHandle(value) {
        this.currentValue = value
        this.$emit('click', value)
        this.$emit('update:value', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-select {
    ul {
      display: flex;
    }
    li {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-size;
      margin: 0 4px;
      cursor: pointer;
    }
  }
</style>
