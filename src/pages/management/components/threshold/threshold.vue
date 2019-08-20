<template>
  <div>
    <div class="top">
      <div class="top_first">
        <span class="line"></span> 阈值管理
      </div>
      <div class="top_sen">
        <el-input placeholder="请输入内容" v-model="searchData.str" size="small">
          <template slot="append">
            <i class="iconfont icon-sousuo" @click="searchDatas()"></i>
          </template>
        </el-input>
      </div>
      <div class="top_excel">
        <el-button plain size="small" @click="exportExcel()">导出表格</el-button>
      </div>
      <div class="top_add">
        <el-button plain size="small" @click="add()">添加</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="getRowClass">
      <el-table-column align="center" label="编号">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="timeName" label="时期"></el-table-column>
      <el-table-column prop="timeInterval" label="时间"></el-table-column>
       <el-table-column prop="element" label="要素"></el-table-column>
        <el-table-column prop="standard" label="标准"></el-table-column>
         <el-table-column  label="预报">
           <template>
             <div>
               24h
             </div>
           </template>
         </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="iconfont icon-bianji" @click="updatePushObj(scope.row.id)"></i>
          <i class="iconfont icon-shanchu" @click="deletePushObj(scope.row.id)"></i>
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
    <!-- 新增修改弹窗 -->
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
    this.getBorderList();
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
    searchDatas() {
      this.getBorderList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchData.currentPage = val;
      this.getBorderList();
    },
    getBorderList() {
      Management.getBorderList(
        this.searchData.str,
        this.searchData.pageNumber,
        this.searchData.currentPage
      ).then(res => {
        if (res === true) return;
        this.tableData = res.content;
        this.searchData.total = res.numberOfElements;
      });
    },
       exportExcel() {
      Management.exportPushTempExcel().then(res => {
       window.location.href =  res;
        console.log(res);
        //  this.$message({
        //   message: '删除用户成功',
        //   type: 'success'
        // });
      });
    },
    add() {
      this.updataId = "";
      this.Visible = true;
    },
    updatePushObj(id){
       this.updataId = id;
      this.Visible = true;
    },
    deletePushObj(id) {
      Management.deleteBorder(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getBorderList();
      });
    },
    refresh() {
      this.Visible = false;
      this.getBorderList();
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