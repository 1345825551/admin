<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账户列表</span>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="account" label="账号" width="120"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" show-overflow-tooltip></el-table-column>
      <el-table-column label="日期" width="300">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column prop="id" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            type="success"
            round
            @click="modify(scope.row.id,scope.row.account,scope.row.userGroup)"
          >编辑</el-button>
          <el-button type="warning" round @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        :page-size="pageSize"
        :pager-count="11"
        layout="prev, pager, next"
        :total="total"
        @current-change="change"
      ></el-pagination>
    </div>
    <el-button type="success" round @click="bulkDel()">批量删除</el-button>
    <el-button type="warning" round>删除</el-button>

    <!-- Form -->

    <el-dialog title="修改账户" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="账 户">
          <el-input v-model="account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="value">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifys()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {api_usersList, api_usersdel,api_usersbatchde,api_edit} from "@/api/apis";
export default {
  data() {
    return {
      checked: "", //
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      bulkDelete: [], //保存批量需要删除的值
      id: "",
      account: "",
      dialogFormVisible: false, //模态框
      value: "",
      options: [
        { value: "超级管理员", label: "超级管理员" },
        { value: "普通管理员", label: "普通管理员" }
      ]
    };
  },
  computed: {},

  methods: {
    handleSelectionChange(val) {
      this.bulkDelete = val;
    },
    change(val) {
      this.currentPage = val;
      api_usersList(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    remove(id) {
      console.log(id);
      if (confirm("你确认删除吗？")) {
        api_usersdel(id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            api_usersList(this.currentPage, this.pageSize).then(res => {
              this.tableData = res.data.data;
              this.total = res.data.total;
            });
          }
        });
      }
    },
    modify(id, account, userGroup) {
      this.dialogFormVisible = true;
      this.id = id;
      this.account = account;
      this.value = userGroup;
      console.log(this.value, this.account, this.dialogFormVisible, this.id);
    },
    modifys() {
      if (!(this.value, this.account, this.dialogFormVisible, this.id)) return;
      //发送axios
      api_edit(this.id, this.account, this.value).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          setTimeout(() => {
            this.dialogFormVisible = false;
          }, 1000);

          api_usersList(this.currentPage, this.pageSize).then(res => {
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },
    //批量删除
    bulkDel() {
      //批量删除
      let ids = [];
      for (let i = 0; i < this.bulkDelete.length; i++) {
        ids.push(this.bulkDelete[i].id);
      }
      if (!ids || ids.length == 0) {
        this.$message({
          message: "请先选择",
          type: "success"
        });
        return
      }
      if (confirm("你确认删除吗？")) {
        ids = JSON.stringify(ids);
        api_usersbatchde(ids).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            //删除成功重新渲染
            api_usersList(this.currentPage, this.pageSize).then(res => {
              this.tableData = res.data.data;
              this.total = res.data.total;
            });
          }
        });
      }
    }
  },
  created() {
    api_usersList(this.currentPage, this.pageSize).then(res => {
      this.tableData = res.data.data;
      this.total = res.data.total;
    });
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 200px;
  margin-left: 10px;
}
</style>