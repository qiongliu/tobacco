<template>
  <div class="">
    <el-row>
      <el-col :span="15" >
        <div class="subject_left" >
          <!-- left-1 轮播图部分 -->
          <div class="swiper">
            <div class="b-title">烟草种植</div>
            <swiper class="swiImgs">
              <swiper-slide>
                <img class="swiImg" src="../../assets/img/temp/download (1).jpg" />
              </swiper-slide>
              <swiper-slide>
                <img class="swiImg" src="../../assets/img/temp/download (1).jpg" />
              </swiper-slide>
            </swiper>
          </div>
          <!-- left-2 pdf列表部分 -->
          <div class="pdf_list">
            <div class="b-title">专题服务目录</div>
            <div class="item">
              <div
                class="item_list"
                v-for="(item,index) in pdfArr"
                :key="index"
                @click="getdata(item.id)"
              >
                <img src="../../assets/img/other/PDF.png" />
                <span>
                  <p class="first_p">
                    {{item.name}}
                    <img v-if="item.isTopping=='1'" src="../../assets/img/other/top.png" />
                  </p>
                  <p class="second_p">{{item.date}}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="9" >
        <div class="subject_right">
          <div class="b-title">专题服务内容展示</div>
          <div class="subject_right_img">
           
            <pdf class="pdf" :src="src"></pdf>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Subject from "../../request/subject";
require("swiper/dist/css/swiper.css");
import pdf from "vue-pdf";
export default {
  components: {
    swiper,
    swiperSlide,
    pdf
  },
  data() {
    return {
      swiperOption: {
        loop: true
      },
      num: 12,
      src: "http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf",
      pdfArr: []
    };
  },
  created() {
    // this.src = pdf.createLoadingTask(this.src);
    this.getdatas();
    // this.getdata();
  },
  methods: {
    // 获取所有数据
    getdatas() {
      Subject.getShowFile()
        .then(res => {
          this.pdfArr = res;
        })
        .finally(() => {});
    },
    //获取单个的数据展示
    getdata(id) {
      Subject.getdataFile(id).then(res => {
        if (res === true) return;
        this.src = res.url;
      });
    }
  }
};
</script>
<style scoped>
.g-subject {
  width: 1920px;
  margin: 0 auto;
  padding-bottom: 20px;
}
.subject_left {
  display: inline-block;
  width:100%;
 
}
.subject_right {
  background-image: url(../../assets/img/other/right-b1.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  color: white;
  width: 100%;
  height: 950px;
  float: right;
}
.subject_right_img {
  margin: 0 auto;
  text-align: center;
}
.pdf {
  width: 90%;
  height: 90%;
}
.item .top {
  position: absolute;
  top: 0;
  right: 0;
}
.item_list {
  position: relative;
  margin-top: 25px;
  display: inline-block;
  margin-left: 45px;
  width: 340px;
  color: white;
  vertical-align: middle;
}
.item_list img {
  vertical-align: middle;
}
.item_list span {
  display: inline-block;
  vertical-align: middle;
}
.first_p {
  font-size: 18px;
  font-weight: 600px;
  color: white;
}
.second_p {
  font-size: 16px;
  color: rgb(149, 157, 180);
  padding-top: 5px;
}
.swiper {
  background-image: url(../../assets/img/other/left-b1.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  overflow: hidden;
  height: 500px;
}
.swiImgs {
  width: 94%;
  height: 400px;
  margin: 0px auto;
}
.swiImgs img {
  width: 100%;
  height: 100%;
}
.b-title {
  background-image: -webkit-linear-gradient(bottom, #102854, white, white);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 600;
}
.pdf_list {
  background-image: url(../../assets/img/other/left-b2.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  overflow: hidden;
  height: 420px;
  margin-top: 10px;
}
</style>