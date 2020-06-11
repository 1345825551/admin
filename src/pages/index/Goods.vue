<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props" class="goods">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src='"http://127.0.0.1:5000/upload/imgs/goods_img/"+ props.row.imgUrl' alt="" class="images"> 
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片"  prop="imgUrl">
         <template slot-scope="scope">
        <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+scope.row.imgUrl"   alt="" class="images">
          </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
        <el-button type="success" round @click="modifys(scope.row)">编辑</el-button>
        <el-button type="warning" round @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
   
    </el-table>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        
      ></el-pagination>
    </div>

<el-dialog title="商品修改" :visible.sync="dialogFormVisible" class="dealog">
  <el-form >
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="name" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
      <el-input v-model="goodsDesc" autocomplete="off"></el-input>
    </el-form-item>
            <el-form-item label="商品价格" :label-width="formLabelWidth">
      <el-input v-model="price" autocomplete="off"></el-input>
    </el-form-item>
                <el-form-item label="商品图片" :label-width="formLabelWidth">

        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success=" handleAvatarSuccess"
          :data="data"
          :on-change="handleChange"
        >
          <i class="el-icon-plus"></i>
        </el-upload>


      <!-- <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+imgUrl" alt=""> -->
    </el-form-item>
    <el-form-item label="商品分类" :label-width="formLabelWidth">
      <el-select v-model="category" placeholder="请选择商品分类">
              <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="mod">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
import { api_goods_list,api_goods_del,api_categories,api_goods_edit} from "@/api/apis.js";
export default {
  data() {
    return {
      formLabelWidth: '120px',
      name:"",//名称
      category:"",//商品分类
      price:"",//商品价格
      imgUrl:"" ,//商品图片
      goodsDesc:"",
      data:{id:this.id},
      id:"",
      dialogFormVisible:false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      tableData: [],
      options:[],
    };
  },
  methods: {
    //  图片
    handleChange(value) {
      console.log(value);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl)
    },
    handleAvatarSuccess(res, file) {
      console.log(this.imageUrl)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.goods_list();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.goods_list();
    },
    //获取商品列表
    goods_list() {
      api_goods_list(this.currentPage, this.pageSize).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    remove(id){
      if(confirm("你确认删除吗？")){
       api_goods_del(id).then(res=>{
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
               this.goods_list();
            }
       })
      }
    },
    modifys(row){
      this.id= row.id
      this.name= row.name
      this.category= row.category
      this.price= row.price
      this.imgUrl= row.imgUrl
      this.goodsDesc= row.goodsDesc
      this.dialogFormVisible = true

    },
    mod(){
      if(!(this.id,this.name,this.category,this.price,this.imgUrl,this.goodsDesc))return
      console.log(this.id,this.name,this.category,this.price,this.imgUrl,this.goodsDesc)
      api_goods_edit(this.name,this.category,this.price,this.imgUrl,this.goodsDesc,this.id).then(res=>{
          if(res.data.code==0){
              this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogFormVisible = false
             this.goods_list()
             this.imgUrl=""
          }
         
        }
      )
    }
  },
  created() {
    this.goods_list();
        api_categories().then(res => {
      this.options = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
.paging {
  text-align: center;
  margin-top: 20px;
}
button {
  width: 69px;
}
.images{
  width: 100px;
}
.el-form-item{
  width: 49%;
  display: block;
  float: left;
}
.el-form-item{
  width: 500px;
}
.dealog   {
  width: 70%;
  height: 700px;
  margin: 0 auto;
  overflow: inherit;
}
</style>