// 新增或者修改页面
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户类型" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择">
            <el-option v-for="item in roleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="权限" prop="value">
          <el-select v-model="ruleForm.value" multiple placeholder="请选择">
            <el-option
              v-for="item in modulesArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
        name: "",
        // role: "",
        id: "",
        value: []
      },
      date: "",
      roleArr: [],
      modulesArr: [],
      title: this.updataId ? "修改" : "新增",
      dialogVisible: true,
      rules: {
        name: [{ required: true, message: "请输入用户类型", trigger: "blur" }],
        // role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        value: [{ required: true, message: "请选择权限", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAllRole();
    this.findModule();
    if (this.updataId) {
      this.findDataPremiss(this.updataId);
    }
  },
  methods: {
    //   提交
    submitFrom(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.updataId) {
            // 组织参数
            let modules = [];
            for (let item of this.ruleForm.value) {
              let obj = {
                id: item
              };
              modules.push(obj);
            }
            this.ruleForm.modules = modules;
            delete this.ruleForm.value;
            let role = {
              modules: this.ruleForm.modules,
              name: this.ruleForm.name
            };
            this.ruleForm.date = this.date;
            Management.updatePremiss(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.handleClose();
            });
          } else {
            // 组织参数
            let modules = [];
            for (let item of this.ruleForm.value) {
              let obj = {
                id: item
              };
              modules.push(obj);
            }
            this.ruleForm.modules = modules;
            delete this.ruleForm.value;
            let role = {
              modules: this.ruleForm.modules,
              name: this.ruleForm.name
            };
            Management.addPremiss(role).then(res => {
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
    findDataPremiss(id) {
      Management.findDataPremiss(id).then(res => {
        if (res === true) return;
        this.ruleForm.name = res.name;
        this.ruleForm.id = res.id;
        this.date = res.date;
        for (let item of res.modules) {
          this.ruleForm.value.push(item.id);
        }
      });
    },

    // 获取全部角色
    getAllRole() {
      Management.getAllRole().then(res => {
        if (res === true) return;
        this.roleArr = res;
      });
    },
    // 姓曾权限选择查询
    findModule() {
      Management.findModule().then(res => {
        if (res === true) return;
        this.modulesArr = res;
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


