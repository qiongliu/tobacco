// 新增或者修改页面
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择">
            <el-option v-for="item in roleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-select v-model="ruleForm.area" placeholder="请选择">
            <el-option v-for="item in ereaArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.number="ruleForm.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="账号名称" prop="username">
          <el-input v-model="ruleForm.username "></el-input>
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
const baseUrl = "";
import Management from "../../../../request/management";
export default {
  props: ["updataId"],
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        phone: "",
        username: "",
        role: "",
        area: ""
      },
      date:'',
      roleArr: [],
      ereaArr: [],
      title: this.updataId ? '修改' :'新增',
      dialogVisible: true,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        area: [{ required: true, message: "请选择地区", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAllRole();
    this.getAllErea();
    if (this.updataId) {
      this.getAlignData(this.updataId);
    }
  },
  methods: {
    //   提交
    submitFrom(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.updataId) {
            // 组织参数
            let area = {
              "id":this.ruleForm.area
            };
             this.ruleForm.area=area;
            let role = {
              "id":this.ruleForm.role
            };
            this.ruleForm.role=role;
            this.ruleForm.id = this.updataId;
            this.ruleForm.date = this.date;
            Management.updata(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message: '修改成功',
                type: "success"
              });
              this.handleClose();
            });
          } else {
            // 组织参数
            let area = {};
            area.id = this.ruleForm.area;
             this.ruleForm.area=area;
            let role = {};
            role.id = this.ruleForm.role;
            this.ruleForm.role=role;
            Management.addUser(this.ruleForm).then(res => {
              if (res === true) return;
              this.$message({
                message:'新增成功',
                type: "success"
              });
              this.handleClose();
            });
          }
        }
      });
    },
    // 修改查询单挑信息
    getAlignData(id) {
      Management.getAlignData(id).then(res => {
        if (res === true) return;
        this.ruleForm.name = res.name;
        this.ruleForm.password = res.password;
        this.ruleForm.password = res.password;
        this.ruleForm.username = res.username;
        this.ruleForm.phone = res.phone;
         this.ruleForm.area=res.area.id;
         this.ruleForm.role=res.role.id;
         this.date=res.date;
      });
    },
    // 获取全部角色
    getAllRole() {
      Management.getAllRole().then(res => {
        if (res === true) return;
        this.roleArr = res;
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


