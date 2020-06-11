<template>
  <div id="order">
    <div>
      <div>
        <el-input placeholder="请输入内容" v-model="orderNo">
          <template slot="prepend">订单号：</template>
        </el-input>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="consignee">
          <template slot="prepend">收货人：</template>
        </el-input>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="phone">
          <template slot="prepend">手机号：</template>
        </el-input>
      </div>
      <div>
        订单状态：
        <el-select v-model="orderState" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="block">
        <span>选择时间：</span>
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="success" round @click="queryx" class="query">查询</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
        <el-table-column prop="remarks" label="备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="modify(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clear">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="查看详情" :visible.sync="dialogTableVisible">
      <el-table :data="see">
        <el-table-column prop="orderNo" label="订单号" width="120"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
        <el-table-column prop="remarks" label="备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="编辑详情" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="orderNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <div class="block">
            <!-- <span class="demonstration">带快捷选项</span> -->
            <el-date-picker
              v-model="orderTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input v-model="deliverAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <div class="block">
            <!-- <span class="demonstration">带快捷选项</span> -->
            <el-date-picker
              v-model="deliveryTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input v-model="orderAmount" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="orderState" placeholder="请选择订单状态">
            <el-option
              v-for="item in options"
              :key="item.index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="mod">确 定</el-button>
      </div>
    </el-dialog>
    <div></div>
  </div>
</template>

<script>
import moment from "moment";
import {
  api_order_list,
  api_order_search,
  api_order_detail,
  api_order_edit
} from "@/api/apis";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      id: "",
      orderNo: "",
      consignee: "",
      phone: "",
      time: "",
      deliverAddress: "",
      deliveryTime: "", //送达时间
      orderTime: "", //下单时间
      orderState: "",
      remarks: "", //备注
      orderAmount: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      see: [],
      options: [
        {
          value: "已受理",
          label: "已受理"
        },
        {
          value: "已完成",
          label: "已完成"
        },
        {
          value: "派送中",
          label: "派送中"
        }
      ],
      tableData: [],
      //时间
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.order_list();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.order_list();
    },
    order_list() {
      api_order_list(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        this.date
      ).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;

        for(let i=0;i<this.tableData.length;i++){
        this.tableData[i].deliveryTime=moment(this.tableData[i].deliveryTime).format("YYYY-MM-DD HH:mm:ss")
           this.tableData[i].orderTime=moment(this.tableData[i].orderTime).format("YYYY-MM-DD HH:mm:ss")
        }
      
      });
    },
    //修改订单
    modify(row) {
      this.dialogFormVisible = true;
      //  for(let k in row){
      //   this.deliverAddress=row[k].deliverAddress
      //  }
      //  {this.consignee,this.deliverAddress,this.deliveryTime,this.id,this.orderAmount,this.orderNo,this.orderState,
      //  this.orderTime,this.phone,this.remarks} = row
      this.consignee = row.consignee;
      this.deliverAddress = row.deliverAddress;
      this.deliveryTime = row.deliveryTime;
      this.id = row.id;
      this.orderAmount = row.orderAmount;
      this.orderNo = row.orderNo;
      this.orderState = row.orderState;
      this.orderTime = row.orderTime;
      this.phone = row.phone;
      this.remarks = row.remarks;
    },
    mod() {
      this.orderTime = moment(this.orderTime).format("YYYY-MM-DD HH:mm:ss");
      this.deliveryTime = moment(this.orderTime).format("YYYY-MM-DD HH:mm:ss");
      this.dialogFormVisible = false;
      api_order_edit(
        this.id,
        this.orderNo,
        this.orderTime,
        this.phone,
        this.consignee,
        this.deliverAddress,
        this.deliveryTime,
        this.remarks,
        this.orderAmount,
        this.orderState
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });

          this.order_list();
        }
      });
    },
    //查询
    queryx() {
        if(this.time==""){this.time=="1"}else{
           this.time[0] = moment(this.time[0]).format("YYYY-MM-DD HH:mm:ss");
      this.time[1] = moment(this.time[1]).format("YYYY-MM-DD HH:mm:ss");
        }
      this.time=JSON.stringify(this.time)
     
      api_order_search(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        this.time
      ).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;

        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].deliveryTime=moment(this.tableData[i].deliveryTime).format("YYYY-MM-DD HH:mm:ss")
           this.tableData[i].orderTime=moment(this.tableData[i].orderTime).format("YYYY-MM-DD HH:mm:ss")
        }

        this.time=""
        
      });
    },
    handleClick(row) {
      this.dialogTableVisible = true;
      api_order_detail(row.id).then(res => {
        this.see.splice(0, 1, res.data.data);
      });
    }
  },
  created() {
    this.order_list();
  }
};
</script>

<style lang="less" scoped>
#order {
  .el-input {
    width: 400px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .query {
    width: 200px;
    margin-left: 20px;
  }
  .block {
    float: left;
  }
}

.clear {
  clear: both;
}
</style>