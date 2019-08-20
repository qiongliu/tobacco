// 新增或者修改页面
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      
        <el-form-item label="管理要素" prop="element">
          <el-input v-model="ruleForm.element"></el-input>
        </el-form-item>
        <el-form-item label="一级" prop="level1">
          <el-input v-model="ruleForm.level1"></el-input>
        </el-form-item>
        <el-form-item label="二级" prop="level2">
          <el-input v-model="ruleForm.level2"></el-input>
        </el-form-item>
        <el-form-item label="三级" prop="level3">
          <el-input v-model="ruleForm.level3"></el-input>
        </el-form-item>
        <el-form-item label="四级" prop="level4">
          <el-input v-model="ruleForm.level4"></el-input>
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
        element:'',
        level1:'',
        level2:'',
        level3:'',
        level4:''
      },
      title: this.updataId ? "修改" : "新增",
      dialogVisible: true,
      rules: {
        element: [{ required: true, message: "请输入管理要素", trigger: "blur" }],
        level1: [{ required: true, message: "请输入一级", trigger: "blur" }],
        level2: [{ required: true, message: "请输入二级", trigger: "blur" }],
        level3: [{ required: true, message: "请输入三级", trigger: "blur" }],
        level4: [{ required: true, message: "请输入四级", trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.updataId) {
      this.findDataIndex(this.updataId);
    }
  },
  methods: {
    //   提交
    submitFrom(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.updataId) {
            Management.updateIndex(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.handleClose();
            });
          } else {
            Management.addIndex(this.ruleForm).then(res => {
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
    findDataIndex(id) {
      Management.findDataIndex(id).then(res => {
        if (res === true) return;
        this.ruleForm.element = res.element;
        this.ruleForm.level1 = res.level1;
       this.ruleForm.level2 = res.level2;
       this.ruleForm.level3 = res.level3;
       this.ruleForm.level4 = res.level4;
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


