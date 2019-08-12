<template>
  <div class="g-index">
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
  }
</style>