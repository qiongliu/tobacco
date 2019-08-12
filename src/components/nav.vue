<template>
  <div class="m-nav">
    <div class="nav">
      <div class="left">
        <router-link to="/gis"><span>GIS展示</span></router-link>
        <router-link to="/farmland"><span>我的烟田</span></router-link>
      </div>
      <div class="right">
        <router-link to="/subject"><span>专题展示</span></router-link>
        <router-link to="/management"><span>系统管理</span></router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .m-nav {
    background: url(../assets/img/gis/top.png) center center no-repeat;
    height: 104px;
    overflow: hidden;

    .logo {
      text-align: center;
    }
    .nav {
        display: flex;
        margin-top: 50px;
    }
    .left,.right {
        flex: 1;
        text-align: center;
    }
    a {
        display: inline-block;
        width: 102px;   
        height: 44px;
        line-height: 42px;
        text-align: center;
        margin: 0 27px;
        background: url(../assets/img/gis/nav1-bg.png) center center no-repeat;
        color: $color-font;
        font-size: $font-size;
    }
    .router-link-active {
        background: url(../assets/img/gis/nav1-bg-active.png) center center no-repeat;
        color: $color-font-active;
    }
  }
</style>