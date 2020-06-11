<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>个人中心</span>
      <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
      <div v-for="item in accountInfo" :key="item.id" class="per">
        <p>
          账号ID:
          <span>{{item.id}}</span>
        </p>
        <p>
          账号:
          <span>{{item.account}}</span>
        </p>
        <p>
          账号创建时间:
          <span>{{item.ctime}}</span>
        </p>
        <p>
          用户组:
          <span>{{item.userGroup}}</span>
        </p>
        <p>
          当前用户头像:
          <img :src="imageUrl" />
        </p>
      </div>
      <p>
        更新当前用户头像:
        <el-upload
          class="avatar-uploader el-upload"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="{id:uid}"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar  el-upload" />
          <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
        </el-upload>
      </p>
    </div>
  </el-card>
</template>

<script>
import { api_accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      accountInfo: [],
      imageUrl: "",
      uid:localStorage.uid
    };
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    let id = localStorage.uid;
   
    api_accountinfo(id).then(res => {
       this.data=res.data.accountInfo.id
      //  console.log(res.data.accountInfo.id)
      this.accountInfo.push(res.data.accountInfo);
    });

  }
};
</script>

<style lang="less" scoped>
.per {
  img {
    width: 200px;
    margin-left: 30px;
  }
  span {
    margin-left: 30px;
    color: red;
  }
}
.btn {
  width: 200px;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>