<template>
  <div>
    <span>营业时间</span>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @blur="order"
    ></el-date-picker>
    <div id="myChart"></div>
  </div>
</template>

<script>
import { api_shop_ordertotal } from "@/api/apis";
import moment from "moment";
import echarts from "echarts";
export default {
  data() {
    return {
      date: "",
    
    };
  },
  mounted() {
    // this.echart();
  },
  methods: {
    order() {
      this.time=[]
      this.time.push(moment(this.date[0]).format("YYYY-MM-DD HH:mm:ss"));
      this.time.push(moment(this.date[1]).format("YYYY-MM-DD HH:mm:ss"));
      this.time = JSON.stringify(this.time);

      api_shop_ordertotal(this.time).then(res => {
        this.t=[]
        this.m=[]
          console.log( res.data.data)
            for(let key in res.data.data){
                this.t.push(moment(res.data.data[key].orderTime).format("YYYY-MM-DD HH:mm:ss"))
               
            }
                        for(let key in res.data.data){
                this.m.push(res.data.data[key].orderAmount)
              
            }

        var myChart = echarts.init(document.getElementById("myChart"));
           
               
            
        // 指定图表的配置项和数据
        var option = {
          xAxis: {
            type: "category",
            data:this.t
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: this.m,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)"
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      });
    },
    echart() {}
  }
};
</script>

<style lang="less" scoped>
#myChart {
  width: 100%;
  height: 500px;
}
</style>