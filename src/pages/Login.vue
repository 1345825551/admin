<template>
  <div id="login">
    <el-card class="box-card">
      <div class="text item">
        <h3>管理系统登录</h3>
        <el-input v-model="account" placeholder="请输入内容"></el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        <el-button type="success" round @click="login">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api_login } from "@/api/apis.js";
import { api_checktoken } from "@/api/apis";
export default {
  data() {
    return {
      account: "",
      password: "",
      log: true
    };
  },
  methods: {
    //登录验证
    login() {
      if (!(this.account, this.password) && this.log) return;
      this.log = false;
      api_login(this.account, this.password).then(res => {
        if (res.data.code == 0) {
          //获取到用户管理权限，保存在会话存储
          localStorage.setItem("role",res.data.role)
           localStorage.setItem("uid",res.data.id)
          //  sessionStorage.setItem("token",res.data.token)
          localStorage.token=res.data.token
          this.$message({
            message: "登录成功",
            type: "success"
          });
          //1秒后跳转
          setTimeout(() => {
            location.hash = "/index/home";
          }, 1000);
        }else{
           this.$message.error('登录失败，用户名或密码错误');
        }
      });
       
       setTimeout(()=>{
         this.log = true
       },3000)

    }
  },
   created(){
     localStorage.removeItem("uid")
     localStorage.removeItem("role")
    let token = localStorage.token;
    api_checktoken(token).then(res => {
      if (!(res.data.code == 0)) {
        location.hash = "/";
      }
    });
   }
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg-login.jpg") #0a0e1a no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .el-card__body {
    width: 100px;
  }
  .el-input {
    margin-bottom: 20px;
  }
  .el-button {
    width: 100%;
  }
}
</style>