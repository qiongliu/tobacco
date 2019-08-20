// 新增或者修改页面
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="地区" prop="area">
          <el-select v-model="ruleForm.area" placeholder="请选择">
            <el-option v-for="item in ereaArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model.number="ruleForm.phone" type="number"></el-input>
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
        phone: "",
        area: ""
      },
      ereaArr: [],
      title: this.updataId ? "修改" : "新增",
      dialogVisible: true,
      rules: {
        area: [{ required: true, message: "请选择地区", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAllErea();
    if (this.updataId) {
      this.findDataPushObj(this.updataId);
    }
  },
  methods: {
    //   提交
    submitFrom(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.updataId) {
            // 组织参数
            let obj = {
              id: this.ruleForm.area
            };
            this.ruleForm.area = obj;
            Management.updatePushObj(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.handleClose();
            });
          } else {
            // 组织参数
            let obj = {
              id: this.ruleForm.area
            };
            this.ruleForm.area = obj;
            Management.addPushObj(this.ruleForm).then(res => {
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
    findDataPushObj(id) {
      Management.findDataPushObj(id).then(res => {
        if (res === true) return;
        console.log(JSON.stringify(res));
        this.ruleForm.area = res.area.id;
        this.ruleForm.phone = res.phone;
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


