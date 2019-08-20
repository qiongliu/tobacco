<template>
  <div>
    <div class="top">
      <div class="top_first">
        <span class="line"></span> 用户管理
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
      <el-table-column align="center" label="序号" >
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="录入时间" ></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="role.name" label="用户类型"></el-table-column>
      <el-table-column prop="area.name" label="关注区域"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="iconfont icon-bianji" @click="update(scope.row.id)"></i>
          <i class="iconfont icon-shanchu" @click="deleteUser(scope.row.id)"></i>
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
import qs from 'qs'
export default {
  components: {
    addOrupdata
  },
  data() {
    return {
      Visible: false,
      tableData: [],
      updataId:'',
      searchData:{
      pageNumber:15,
      total:0,
      currentPage:1,
      str:''
    },
    };
    
  },
  created() {
    // this.getList();
    this.getUserList();
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
      
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.searchData.currentPage=val;
        this.getUserList();
      },
    getUserList(){
      Management.getUserList(this.searchData.str,this.searchData.pageNumber,this.searchData.currentPage).then(res => {
        if (res === true) return;
      this.tableData = res.content;
      this.searchData.total = res.numberOfElements;
      });
    },
   
    // 删除
    deleteUser(id) {
      Management.deleteUser(id).then(res => {
        this.$message({
          message: "删除用户成功",
          type: "success"
        });
        this.getUserList();
      });
    },
    // 导出表格
    exportExcel() {
      Management.exportExcel().then(res => {
       window.location.href =  res;
        console.log(res);
        //  this.$message({
        //   message: '删除用户成功',
        //   type: 'success'
        // });
      });
    },
    // 修改
    update(id){
      this.updataId=id;
      this.Visible = true;
    },
    // 搜索
    searchDatas() {
     this.getUserList()
    },
    // 新增
    add() {
      this.updataId="";
      this.Visible = true;
    },
    refresh() {
      this.Visible = false;
      this.getUserList();
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