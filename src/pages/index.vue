<template>
  <div class="g-index" v-loading="loading" element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中" :element-loading-background="'rgba(0, 0, 0, 0.5)'">
    <my-nav></my-nav>
    <router-view />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import myNav
  from 'components/nav'
  export default {
    components: {
      myNav
    },
    computed: {
      ...mapGetters(['loading'])
    }
  }
</script>

<style scoped lang="scss">
  .g-index {
    height: 100%;
    width: 100%;
    color: #fff;
  }
</style>