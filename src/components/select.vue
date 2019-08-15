<template>
  <div class="m-select">
    <ul>
      <li v-for="(item, index) in data" :key="index" :style="{width: size[0], height: size[1], backgroundImage: currentIndex !== index ? `url(${bg})` : `url(${bgActive})`}" :class="currentIndex === index ? 'active' : ''"
        @click="clickHandle(index, item.value)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
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
        currentIndex: 0
      }
    },
    methods: {
      clickHandle(index, value) {
        this.currentIndex = index
        this.$emit('click', value)
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
      margin: 0 10px;
      cursor: pointer;
    }
  }
</style>
