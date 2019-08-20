// 新增或者修改页面
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="要素" prop="element">
          <el-input v-model="ruleForm.element"></el-input>
        </el-form-item>
        <el-form-item label="标准" prop="standard">
          <el-input v-model="ruleForm.standard "></el-input>
        </el-form-item>
        <el-form-item label="生长时段" prop="timeInterval">
          <el-input v-model="ruleForm.timeInterval"></el-input>
        </el-form-item>
        <el-form-item label="生长期名称" prop="timeName">
          <el-input v-model="ruleForm.timeName"></el-input>
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
        element: "",
        standard: "",
        timeInterval: "",
        timeName: ""
      },
      title: this.updataId ? "修改" : "新增",
      dialogVisible: true,
      rules: {
        element: [{ required: true, message: "请输入要素", trigger: "blur" }],
        standard: [{ required: true, message: "请输入标准 ", trigger: "blur" }],
        timeInterval: [
          { required: true, message: "请输入生长时段", trigger: "blur" }
        ],
        timeName: [
          { required: true, message: "请输入生长期名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
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
            Management.updateBorder(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.handleClose();
            });
          } else {
            Management.addBorderp(this.ruleForm).then(res => {
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
      Management.findDataBorder(id).then(res => {
        if (res === true) return;
        this.ruleForm.element = res.element;
        this.ruleForm.standard = res.standard;
        this.ruleForm.timeInterval = res.timeInterval;
         this.ruleForm.timeName = res.timeName;
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


