// 新增或者修改页面
<template>
  <div>
      <!-- :http-request="handleUpload" -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item  label="文件上传" prop="name">
           <el-upload
            ref="upload"
           :action="baseUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :file-list="fileList"
            :auto-upload="false"
            :on-success="successFul"
            accept=".pdf"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">文件上传只能上传pdf文件</div>
          </el-upload>
        </el-form-item>
         
         </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submitUpload()">确 定</el-button>
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
      baseUrl: "/showFile/singleUpload",
      ruleForm: {},
      fileList: [],
      title: this.updataId ? "修改" : "新增",
      dialogVisible: true,
      rules: {}
    };
  },
  created() {},
  methods: {
      handleUpload(parms){
          let file = parms.file;
          
      },
    submitUpload() {
      this.$refs.upload.submit();
    },
       handleRemove(file, fileList) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      successFul(){
         this.handleClose(); 
      },
    handleClose() {
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


