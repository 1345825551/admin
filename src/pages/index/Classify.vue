<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="dialogFormVisible = true"
      >添加分类</el-button>
    </div>
    <div class="text item">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column label="商品分类" width="120">
          <template slot-scope="scope">
            <p v-show="!scope.row.fl">{{scope.row.cateName}}</p>
            <input type="text" name id v-show="scope.row.fl" v-model="scope.row.cateName"  @change="int"/>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="true"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              type="success"
              round
              @click="modify(scope.row,scope.$index)"
            >{{scope.row.fonts}}</el-button>
            <el-button type="warning" round @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>x
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="cateName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { api_catelist, api_addcate, api_delcate,api_editcate } from "@/api/apis.js";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1,
      pageSize: 5,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      name: "",
      total: 0,
      tableData: [],
      currentRow: null,
      value: true,
      cateName: "",
      in:"",
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.refresh();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refresh();
    },
    remove(id) {
      if (confirm("是否确认删除")) {
        api_delcate(id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.refresh();
          } else {
            this.$message({
              message: "删除失败",
              type: "success"
            });
          }
        });
      }
    },
    int(){
     api_editcate(this.in.id,this.in.cateName,this.in.state).then(res=>{
         if(res.data.code==0){
            this.$message({
              message: "修改成功",
              type: "success"
            });
         }
     })
    },
    
    modify(row,index) {
       for(let i=0;i<this.tableData.length;i++){
                if(i!=index){
                  this.tableData[i].fl=false
                }
       }
  



      this.in=row
      // row.fl = !row.fl
      // console.log(this.tableData[i].fl);
      console.log();
      // this.tableData[i].fl = !this.tableData[i].fl;
      // console.log(row, i);
      row.fl=!row.fl
      if(row.fl){
      row.fonts="完成"
      }else{
         row.fonts="编辑"
      }
     this.fl=!this.fl
      // console.log(this.tableData);
    },

    add() {
      this.dialogFormVisible = false;
      api_addcate(this.cateName, this.value).then(() => {
        console.log(this.cateName, this.value);
      
      });
    },
    //重新获取列表接口
    refresh() {
      api_catelist(this.currentPage, this.pageSize).then(res => {
        this.total = res.data.total;
        res.data.data.forEach(v => {
          v.fonts = "编辑";
          v.fl = false;
        });
        this.tableData = res.data.data;
      });
    }
  },
  created() {
    this.refresh();
  },
  updated() {
    // this.modify();
  }
};
</script>

<style lang="less" scoped>
.block {
  margin-top: 20px;
}
</style>