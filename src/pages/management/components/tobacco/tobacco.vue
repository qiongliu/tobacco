<template>
  <div>
    <div class="top">
      <div class="top_first">
        <span class="line"></span> 烟草灾情收集
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
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="area.name" label="区域"></el-table-column>
       <el-table-column prop="riskNumber" label="受灾户数"></el-table-column>
        <el-table-column prop="riskArea" label="受灾面积"></el-table-column>
         <el-table-column   label="受灾情况">
           <template slot-scope="scope">
             <div><span>旱灾：{{scope.row.dry}}</span></div>
               <div><span>雹灾{{scope.row.hail}}</span></div>
                <div><span>病虫害灾:{{scope.row.illness}}</span></div>
                 <div><span>洪灾:{{scope.row.water}}</span></div>
                  <div><span>风灾:{{scope.row.wind}}</span></div>
           </template>
         </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="iconfont icon-bianji" @click="updatePushObj(scope.row.id)"></i>
          <i class="iconfont icon-shanchu" @click="deleteIndex(scope.row.id)"></i>
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
    this.getRiskList();
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
      this.getRiskList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchData.currentPage = val;
      this.getRiskList();
    },
    getRiskList() {
      Management.getRiskList(
        this.searchData.str,
        this.searchData.pageNumber,
        this.searchData.currentPage
      ).then(res => {
        if (res === true) return;
        for(let item of res.content){
          item.date = item.date;
        }
        this.tableData = res.content;
        this.searchData.total = res.numberOfElements;
      });
    },
       exportExcel() {
      Management.exportRiskExcel().then(res => {
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
    deleteIndex(id) {
      Management.deleteRisk(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getRiskList();
      });
    },
    refresh() {
      this.Visible = false;
      this.getRiskList();
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