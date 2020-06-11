<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品添加</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="text item">
      <p>
        <span>商品名称</span>
        <el-input v-model="user" placeholder="店铺名称"></el-input>
      </p>
      <p>
        <span>商品分类</span>
        <el-select v-model="value" placeholder="商品分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </p>
      <p>
        <span>商品价格</span>
        <el-input-number v-model="price" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </p>
      <p>
        <span>商品图片</span>
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success=" handleAvatarSuccess"
          :data="data"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </p>
      <p>
        <span>配送描述</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入配送描述"
          v-model="textarea2"
        ></el-input>
      </p>
      <el-button type="success" round @click="add">添加商品</el-button>
    </div>
  </el-card>
</template>

<script>
import { api_categories, api_goods_add } from "@/api/apis";
export default {
  data() {
    return {
      dialogImageUrl: "", //店铺图片
      dialogVisible: false,
      disabled: false,
      user: "",
      textarea2: "",
      options: [],
      value: "热销榜",
      price: 1,
      data: {},
      imgUrl: ""
    };
  },
  methods: {
    add() {
      if (!(this.user, this.value, this.price, this.imgUrl, this.textarea2))
        return;
      api_goods_add(
        this.user,
        this.value,
        this.price,
        this.imgUrl,
        this.textarea2
      ).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          (this.user = ""),
            (this.value = ""),
            (this.price = ""),
            (this.imgUrl = ""),
            (this.textarea2 = "");
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // console.log(this.dialogImageUrl)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
    }
  },
  created() {
    api_categories().then(res => {
      this.options = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
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
</style>