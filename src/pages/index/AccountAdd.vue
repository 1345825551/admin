<template>
  <el-card class="box-card">
        <div slot="header" class="clearfix">
      <span>账户添加</span>
      
    </div>



    
    <div>
      账号： <el-input v-model="user" placeholder="请输入内容"></el-input><br>
      密码： <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input><br>
         <div>
        用户组： <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      </div>
      <el-button type="success" round @click="add">添加</el-button>
      <el-button type="success" round @click="reset">重置</el-button>
      
    </div>

  </el-card>

</template>

<script>
import { api_accAdd } from "@/api/apis.js"
export default {
 data(){
   return{
      user:"",
      pwd:"",
      value: '',
      options:[{value:"超级管理员",label:"超级管理员"},{value:"普通管理员",label:"普通管理员"}]
   }
 },
   methods: {
     add(){
       if(!(this.user&&this.pwd&&this.value)) return

        api_accAdd(this.user,this.pwd,this.value).then(res=>{
             if(res.data.code==0){
             this.$message({
             message: "添加成功",
             type: "success" ,
             })
              this.value=this.pwd= this.user="" 
             }
        })
       
     },
     reset(){
     this.value=this.pwd= this.user="" 
     }
   }
   
};

</script>

<style lang="less" scoped>

  .el-input{
      width: 300px;
      margin-bottom: 20px;
  }
  .el-select{
         margin-bottom: 20px;
  }

</style>