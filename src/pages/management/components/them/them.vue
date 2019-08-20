<template>
  <div>
    <div class="top">
      <div class="top_first">
        <span class="line"></span> 专题管理展示
      </div>
      <div class="top_sen">
        <el-input placeholder="请输入内容" v-model="searchData.str" size="small">
          <template slot="append">
            <i class="iconfont icon-sousuo" @click="searchStr()"></i>
          </template>
        </el-input>
      </div>
      <div class="top_excel">
        <el-button plain size="small">导出表格</el-button>
      </div>
      <div class="top_add">
        <el-button plain size="small" @click="upload()">上传</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="getRowClass">
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="name" label="展示内容"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="iconfont icon-bianji" @click="update(scope.row)"></i>
          <i class="iconfont icon-shanchu" @click="deletes(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="searchData.currentPage"
        :page-size="searchData.pageNumber"
        layout="prev, pager, next, jumper"
        :total="searchData.total"
      ></el-pagination>
    </div>
    <!-- 上传文件 -->
    <addOrupdata v-if="Visible" @refresh="refresh()" :updataId="updataId"></addOrupdata>
  </div>
</template>

<script>
import addOrupdata from "./addOrupdate.vue";
import Management from "../../../../request/management";
export default {
  components: {
    addOrupdata
  },
  data() {
    return {
      tableData: [],
      Visible: false,
      updataId: "",
      searchData: {
        pageNumber: 15,
        total: 0,
        currentPage: 1,
        str: ""
      }
    };
  },
  created() {
    this.getShowFile();
  },
  methods: {
    //设置表格第一行的颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgb(233,236,243)";
      } else {
        return "";
      }
    },
    refresh() {
      this.Visible = false;
      this.getShowFile();
    },
    searchStr() {
      this.getShowFile();
    },
    getShowFile() {
      Management.getShowFile(
        this.searchData.str,
        this.searchData.pageNumber,
        this.searchData.currentPage
      ).then(res => {
        if (res === true) return;
        this.tableData = res.data.data.content;
        this.searchData.total = res.data.data.numberOfElements;
      });
    },
    // 上传文件
    upload() {
      this.updataId = "";
      this.Visible = true;
    },

    deletes(id) {
      Management.deleteFiles(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getShowFile();
      });
    },
    update(data) {
      if (data.isTopping == "0") {
        this.$confirm("是否置顶", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            data.isTopping = "1";
            Management.fileTop(data).then(res => {
              if (res === true) return;
              this.$message({
                type: "success",
                message: "成功!"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.$confirm("取消置顶", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            data.isTopping = "0";
            Management.fileTop(data).then(res => {
              if (res === true) return;
              this.$message({
                type: "success",
                message: "成功!"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    }
  }
};
</script>
<style scoped>
.page {
  margin-top: 20px;
  text-align: center;
}
.top {
  display: flex;
  padding: 10px 0;
}
.top_first {
  margin-left: 25px;
  font-weight: 600;
  font-size: 16px;
}
.top_sen {
  margin-left: 60%;
}
.top_excel {
  margin-left: 1%;
}
.top_add {
  margin-left: 1%;
}
.line {
  display: inline-block;
  height: 15px;
  width: 5px;
  background-color: rgb(53, 95, 181);
}
</style>