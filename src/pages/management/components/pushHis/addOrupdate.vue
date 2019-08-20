// 新增或者修改页面
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="推送类型" prop="type">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-form-item label="推送内容" prop="data">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.data"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submitFrom('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Management from "../../../../request/management";
export default {
  props: ["updataId"],
  data() {
    return {
      ruleForm: {
       data:'',
       type:''
      },
      title: this.updataId ? "修改" : "新增",
      dialogVisible: true,
      rules: {
        type: [{ required: true, message: "请输入推送类型", trigger: "blur" }],
        data: [{ required: true, message: "请输入推送内容", trigger: "blur" }]
      }
    };
  },
  created() {
     this.getAllErea(); 
    if (this.updataId) {
      this.findDataPushTemp(this.updataId);
    }
  },
  methods: {
    //   提交
    submitFrom(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.updataId) {
            // 组织参数
            Management.updatePushTemp(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.handleClose();
            });
          } else {
            Management.addPushtemp(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message: "新增成功",
                type: "success"
              });
              this.handleClose();
            });
          }
        }
      });
    },
    // 修改查询单挑信息
    findDataPushTemp(id) {
      Management.findDataPushTemp(id).then(res => {
        if (res === true) return;
        this.ruleForm.type = res.type;
        this.ruleForm.data = res.data;
        this.ruleForm.id = res.id;
      });
    },
    // 获取全部地区
    getAllErea() {
      Management.getAllErea().then(res => {
        if (res === true) return;
        this.ereaArr = res;
      });
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit("refresh");
    }
  }
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>


