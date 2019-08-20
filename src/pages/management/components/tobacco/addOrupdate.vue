// 新增或者修改页面
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="时间" prop="date">
          <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-select v-model="ruleForm.area" placeholder="请选择">
            <el-option v-for="item in ereaArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受灾面积" prop="riskArea">
          <el-input v-model="ruleForm.riskArea"></el-input>
        </el-form-item>
        <el-form-item label="受灾户数" prop="riskNumber">
          <el-input v-model="ruleForm.riskNumber"></el-input>
        </el-form-item>
        <el-form-item label="旱灾" prop="dry">
          <el-select v-model="ruleForm.dry " placeholder="请选择">
            <el-option
              v-for="item in arr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="雹灾" prop="hail">
          <el-select v-model="ruleForm.hail " placeholder="请选择">
            <el-option
              v-for="item in arr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="洪灾 " prop="water">
          <el-select v-model="ruleForm.water " placeholder="请选择">
            <el-option
              v-for="item in arr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风灾" prop="wind">
          <el-select v-model="ruleForm.wind " placeholder="请选择">
            <el-option
              v-for="item in arr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
        area: "",
        date: "",
        dry: "",
        hail: "",
        illness: "",
        riskArea: "",
        riskNumber: "",
        water: "",
        wind: ""
      },
      arr: [
        {
          value: "无",
          label: "无"
        },
        {
          value: "轻度",
          label: "轻度"
        },
        {
          value: "中度",
          label: "中度"
        },
        {
          value: "重度",
          label: "重度"
        },
        {
          value: "绝收",
          label: "绝收"
        }
      ],
      ereaArr: [],
      title: this.updataId ? "修改" : "新增",
      dialogVisible: true,
      rules: {
        date: [{ required: true, message: "请选择时间", trigger: "blur" }],
        area: [{ required: true, message: "请选择地区", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAllErea();
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
               let obj = {
              id: this.ruleForm.area
            };
            this.ruleForm.area = obj;
            this.ruleForm.id=this.updataId;
            Management.updateRisk(this.ruleForm).then(res => {
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
            Management.addRisk(this.ruleForm).then(res => {
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
    // 获取全部地区
    getAllErea() {
      Management.getAllErea().then(res => {
        if (res === true) return;
        this.ereaArr = res;
      });
    },
    // 修改查询单挑信息
    findDataIndex(id) {
      Management.findDataRisk(id).then(res => {
        if (res === true) return;
        this.ruleForm.area = res.area.id;
        this.ruleForm.date = res.date;
        this.ruleForm.dry = res.dry;
        this.ruleForm.hail = res.hail;
        this.ruleForm.illness = res.illness;
        this.ruleForm.riskArea = res.riskArea;
        this.ruleForm.riskNumber = res.riskNumber;
        this.ruleForm.water = res.water;
        this.ruleForm.wind = res.wind;
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
.el-date-editor--date {
  width: 100%;
}
</style>


