<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="preservation">保存</el-button>
      </div>
      <div class="text item">
        <p>
          <span>店铺名称</span>
          <el-input v-model="shop.name" placeholder="店铺名称"></el-input>
        </p>
        <p>
          <span>店铺公告</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入店铺公告"
            v-model="shop.bulletin"
          ></el-input>
        </p>
        <p>
          <span>店铺头像</span>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="shop.avatar"
              :src="'http://127.0.0.1:5000/upload/shop/'+shop.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
          </el-upload>
        </p>
        <div>
          <span>店铺图片</span>
          <div class="clearfix">
            <p class="imga">
              <img
                :src="'http://127.0.0.1:5000/upload/shop/'+item"
                alt="图片无法显示"
                v-for="item in pics"
                :key="item.id"
              />

              <el-upload
                action="http://127.0.0.1:5000/shop/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="Success"
                :show-file-list="show_file_list"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </p>
          </div>
        </div>
        <p>
          <span>配送费</span>
          <el-input v-model="shop.deliveryPrice" placeholder="配送费"></el-input>
        </p>
        <p>
          <span>配送时间</span>
          <el-input v-model="shop.deliveryTime" placeholder="配送时间"></el-input>
        </p>
        <p>
          <span>配送描述</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入配送描述"
            v-model="shop.description"
          ></el-input>
        </p>
        <p>
          <span>店铺评分</span>
          <el-input v-model="shop.score" placeholder="店铺评分"></el-input>
        </p>
        <p>
          <span>
            销
            <span></span> 量
          </span>
          <el-input v-model="shop.sellCount" placeholder="销量"></el-input>
        </p>
        <p>
          <span>
            活
            <span></span> 动
          </span>
          <el-checkbox-group v-model="supports">
            <el-checkbox label="在线支付满50送100">在线支付满50送100</el-checkbox>
            <el-checkbox label="免费送饮料">免费送饮料</el-checkbox>
            <el-checkbox label="单人精彩套餐">单人精彩套餐</el-checkbox>
            <el-checkbox label="在线支付满50送200">在线支付满50送200</el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折">VC无限橙果汁全场8折</el-checkbox>
          </el-checkbox-group>
        </p>
        <p>
          <span>营业时间</span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </p>
        <p>
          <span>起送价格</span>
          <el-input v-model="shop.minPrice" placeholder="销量"></el-input>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api_shop_info,api_shop_edit } from "@/api/apis";

export default {
  data() {
    return {
      show_file_list: false,
      shop: {
        id:"",
        name: "",
        bulletin: "",
        avatar: "",
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        minPrice: "",

      },
      pics: [],
      date: [],
      //店铺图片
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      textarea2: "",
      user: "",
      imageUrl: "", //头像图片
      supports: []
    };
  },
  methods: {
    preservation() {
         this.pic= JSON.stringify(this.pics)
         this.dat= JSON.stringify(this.date)
         this.support= JSON.stringify(this.supports)
            console.log(this.date,this.supports,this.pics)
       api_shop_edit(this.shop,this.support,this.dat,this.pic).then(res=>{
         console.log(res.data)
        if(res.data.code==0){
            this.$message({
            message: "添加成功",
            type: "success"
          });
            // this.shops()
     
        }
       })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file);
      this.dialogVisible = true;
    },

    handleAvatarSuccess(res, file) {
      this.shop.avatar = URL.createObjectURL(file.raw);
    },
    Success(res, file) {
      console.log(URL.createObjectURL(file.raw));

      this.pics.push(res.imgUrl);
    },
    head() {},

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
    },
    shops() {
      api_shop_info().then(res => {
        // this.shop=res.data.data
        // console.log(this.shop)
        this.shop.id = res.data.data.id;
        this.shop.name = res.data.data.name;
        this.shop.bulletin = res.data.data.bulletin;
        this.shop.avatar = res.data.data.avatar;
        this.shop.deliveryPrice = res.data.data.deliveryPrice;
        this.shop.deliveryTime = res.data.data.deliveryTime;
        this.shop.description = res.data.data.description;
        this.shop.score = res.data.data.score;
        this.shop.sellCount = res.data.data.sellCount;
        this.shop.supports = res.data.data.supports;
        this.shop.minPrice = res.data.data.minPrice;
        this.pics=res.data.data.pics
        this.date=res.data.data.date
        this.supports=res.data.data.supports
        console.log(this.shop);
      });
    }
  },

  created() {
    this.shops();
  }
};
</script>

<style lang="less" scoped>
.clearfix::after {
  display: block;
  content: "";
  clear: both;
  height: 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.text {
  p {
    display: flex;
    line-height: 40px;
    .el-input {
      width: 300px;
      margin-bottom: 20px;
    }
    .el-textarea {
      width: 300px;
      margin-bottom: 20px;

      height: 100px;
    }
    span {
      margin-right: 20px;
    }
  }
}
.imga {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.imga img {
  width: 200px;
  margin-right: 20px;
}
</style>