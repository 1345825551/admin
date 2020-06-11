<template>
  <div>
    <ul>
      <li>
        <p>总订单</p>
        <p>{{totalOrder}}</p>
      </li>
      <li>
        <p>总销售额</p>
        <p>{{totalAmount}}</p>
      </li>
      <li>
        <p>今日订单数</p>
        <p>{{todayOrder}}</p>
      </li>
      <li>
        <p>今日销售额</p>
        <p>{{totayAmount}}</p>
      </li>
    </ul>
    <div id="myChart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { api_shop_totaldata } from "@/api/apis";
export default {
  data() {
    return {
      totalOrder: "",
      totalAmount: "",
      todayOrder: "",
      totayAmount: ""
    };
  },
  mounted() {
    api_shop_totaldata().then(res => {
      this.totalOrder = res.data.totalOrder;
      this.totalAmount = res.data.totalAmount;
      this.todayOrder = res.data.todayOrder;
      this.totayAmount = res.data.totayAmount;
      let { xData, orderData, amountData } = res.data;
      var myChart = echarts.init(document.getElementById("myChart"));
      var option = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: orderData
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: amountData
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });

    //     // 指定图表的配置项和数据
  },
  methods: {}
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
li {
  width: 200px;
  background: url("../../assets/images/1.jpg") no-repeat 0px 20px;
  padding-left: 60px;
  line-height: 12px;
  padding-top: 5px;
}
li:nth-child(2) {
  background: url("../../assets/images/2.jpg") no-repeat 0px 15px;
  padding-left: 80px;
}
li:nth-child(3) {
  background: url("../../assets/images/3.jpg") no-repeat 0px 15px;
  padding-left: 80px;
}
li:nth-child(4) {
  background: url("../../assets/images/4.jpg") no-repeat 0px 20px;
}
#myChart {
  width: 100%;
  height: 500px;
}
</style>