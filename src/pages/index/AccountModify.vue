<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <div>
      原密码：
      <el-input placeholder="请输入密码" v-model="oldpwd" show-password @change="checkoldpwd()"></el-input>
      <br />新密码密码：
      <el-input placeholder="请输入密码" v-model="newpwd" show-password></el-input>
      <br />再次确认密码：
      <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <br />

      <el-button type="success" round @click="modify()">修改</el-button>
      <el-button type="success" round>重置</el-button>
    </div>
  </el-card>
</template>

<script>
import { api_checkoldpwd, api_editpwd } from "@/api/apis.js";
export default {
  data() {
    return {
      oldpwd: "",
      pwd: "",
      newpwd: "",
      uid: "",
      fl: false
    };
  },
  methods: {
    checkoldpwd() {
      this.uid = localStorage.getItem("uid");
      api_checkoldpwd(this.uid, this.oldpwd).then(res => {
        if (!(res.data.code == "00")) {
          this.$message.error("原密码不正确");
          this.fl = false;
        } else {
          this.fl = true;
        }
      });
    },
    modify() {
      if (!(this.fl && this.newpwd && this.pwd, this.oldpwd)) return;
      if (this.newpwd == this.pwd) {
        api_editpwd(this.newpwd, this.uid).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.$message({
              message: "密码修改成功，请重新登录",
              type: "success"
            });
            //1秒后跳转
            setTimeout(() => {
              location.hash = "/";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
  margin-bottom: 20px;
}
.el-select {
  margin-bottom: 20px;
}
</style>