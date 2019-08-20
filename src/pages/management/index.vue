<template>
  <div class="g-management">
    <el-row>
      <el-col :span="4">
        <div class="management_left">
          <span class="b_title">
            <i class="iconfont icon-yonghuguanli"></i>
            用户管理
          </span>
          <span @click="switchTab('user')" :class="isColor=='user' ? 'fontColr':'' ">用户管理</span>
          <span
            @click="switchTab('permissions')"
            :class="isColor=='permissions' ? 'fontColr':'' "
          >权限管理</span>
          <span class="b_title">
            <i class="iconfont icon-tuisongguanli"></i>
            推送管理
          </span>
          <span @click="switchTab('pushObj')" :class="isColor=='pushObj' ? 'fontColr':'' ">推送对象管理</span>
          <span @click="switchTab('pushTemp')" :class="isColor=='pushTemp' ? 'fontColr':'' ">推送模板管理</span>
          <span @click="switchTab('pushHis')" :class="isColor=='pushHis' ? 'fontColr':'' ">历史推送管理</span>
          <span class="b_title">
            <i class="iconfont icon-yuzhi"></i>
            阈值管理
          </span>
          <span @click="switchTab('threshold')" :class="isColor=='threshold' ? 'fontColr':'' ">阈值管理</span>
          <span @click="switchTab('index')" :class="isColor=='index' ? 'fontColr':'' ">指数管理</span>
          <span class="b_title">
            <i class="iconfont icon-liebiaozhanshi"></i>
            展示管理
          </span>
          <span @click="switchTab('them')" :class="isColor=='them' ? 'fontColr':'' ">专题展示管理</span>
          <span class="b_title">
            <i class="iconfont icon-shouji"></i>
            烟草灾情收集
          </span>
          <span @click="switchTab('tobacco')" :class="isColor=='tobacco' ? 'fontColr':'' ">烟草灾情收集</span>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="management_right">
          <User v-if="isColor=='user'"></User>
          <Permissions v-if="isColor=='permissions'"></Permissions>
          <PushObj v-if="isColor=='pushObj'"></PushObj>
          <pushTemp v-if="isColor=='pushTemp'"></pushTemp>
          <PushHis v-if="isColor=='pushHis'"></PushHis>
          <Threshold v-if="isColor=='threshold'"></Threshold>
          <Index v-if="isColor=='index'"></Index>
          <Them v-if="isColor=='them'"></Them>
          <Tobacco v-if="isColor=='tobacco'"></Tobacco>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import User from "./components/user/user.vue";
import Permissions from "./components/permissions/permissions.vue";
import PushObj from "./components/pushObj/pushObj.vue";
import pushTemp from "./components/pushTemp/pushTemp.vue";
import PushHis from "./components/pushHis/pushHis.vue";
import Threshold from "./components/threshold/threshold.vue";
import Index from "./components/index/index.vue";
import Them from "./components/them/them.vue";
import Tobacco from "./components/tobacco/tobacco.vue";
export default {
  components: {
    User,
    Permissions,
    PushObj,
    pushTemp,
    PushHis,
    Threshold,
    Index,
    Them,
    Tobacco
  },
  data() {
    return {
      isColor: "user"
    };
  },
  methods: {
    switchTab(val) {
      this.isColor = val;
    }
  }
};
</script>
<style scoped>
.management_right {
  vertical-align: top;
  margin-left: 20px;
  display: inline-block;
  /* width: 1590px; */
  width:100%;
  background-color: white;
}
.fontColr {
  color: rgb(133, 149, 209);
  font-weight: 600;
}
.g-management {
  background-color: rgb(245, 245, 245);
  /* width: 1920px; */
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.management_left {
  vertical-align: top;
  display: inline-block;
  /* width: 260px; */
  width:100%;
  margin-right: 20px;
  /**/
}
.management_left span {
  margin-top: 1px;
  background-color: white;
  display: inline-block;
  padding: 15px 0;
  text-align: center;
  width: 100%;
}
.management_left .b_title {
  background-color: rgb(245, 245, 245) !important;
  background-image: url(../../assets/img/other/b1.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  color: white;
  font-weight: 600;
  text-align: left;
}
.iconfont {
  font-size: 20px;
  margin-left: 5px;
}
</style>
