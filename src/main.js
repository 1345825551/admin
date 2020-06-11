import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import Echarts from "echarts"

Vue.use(ElementUI);
// Vue.prototype.echarts = Echarts
// Vue.use(Echarts)
Vue.config.productionTip = false
new Vue({
   router,

  render: h => h(App),
}).$mount('#app')
