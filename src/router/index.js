import Vue from "vue"
import Vuerouter from "vue-router"
import Login from "../pages/Login.vue"
import { api_checktoken } from "@/api/apis";

Vue.use(Vuerouter)

var router = new Vuerouter({
    routes: [
        {
            path: '/',
            name: "login",
            component: Login
        },


        {
            path: '/index',
            name: "index",
            component: () => import("../pages/Index.vue"),

            children: [
                {
                    path: '/index/orderManagement',
                    name: "orderManagement",
                    component: () => import("../pages/index/orderManagement.vue"),
                    meta: [["订单管理"], ["super", "normal"]]
                },
                {
                    path: '/index/goods',
                    name: "orderManagement",
                    component: () => import("../pages/index/Goods.vue"),
                    meta: [["店铺管理", "商品列表"], ["super", "normal"]]

                },
                {
                    path: '/index/home',
                    name: "orderManagement",
                    component: () => import("../pages/index/Home.vue"),
                    meta: [["后台首页"], ["super", "normal"]]
                },
                {
                    path: '/index/store',
                    name: "store",
                    component: () => import("../pages/index/Store.vue"),
                    meta: [["店铺管理"], ["super", "normal"]]
                },
                {
                    path: '/index/orderSta',
                    name: "orderSta",
                    component: () => import("../pages/index/OrderSta.vue"),
                    meta: [["销售统计", "订单统计"], ["super"]]
                },
                {
                    path: '/index/goodsAdd',
                    name: "goodsAdd",
                    component: () => import("../pages/index/GoodsAdd.vue"),
                    meta: [["店铺管理", "商品添加"], ["super", "normal"]]
                },
                {
                    path: '/index/comSta',
                    name: "comSta",
                    component: () => import("../pages/index/ComSta.vue"),
                    meta: [["销售统计", "商品统计"], ["super",]]
                },
                {
                    path: '/index/classify',
                    name: "classify",
                    component: () => import("../pages/index/Classify.vue"),
                    meta: [["店铺管理", "商品分类"], ["super", "normal"]]
                },

                {
                    path: '/index/accountModify',
                    name: "accountModify",
                    component: () => import("../pages/index/AccountModify.vue"),
                    meta: [["账号管理", "修改密码"], ["super",]]
                },
                {
                    path: '/index/accountList',
                    name: "accountList",
                    component: () => import("../pages/index/AccountList.vue"),
                    meta: [["账号管理", "账号列表"], ["super",]]
                },
                {
                    path: '/index/accountAdd',
                    name: "accountAdd",
                    component: () => import("../pages/index/AccountAdd.vue"),
                    meta: [["账号管理", "账号添加"], ["super",]]
                },
                {
                    path: '/index/personal',
                    name: "personal",
                    component: () => import("../pages/index/Personal.vue"),
                    meta: [["首页", "个人中心"], ["super", "normal"]]
                },

            ]


        },

    ]


})

router.beforeEach((to, from, next) => {
    if (to.path != "/") {
        api_checktoken(localStorage.token).then(res => {
            if (res.data.code == 0) {
                if (to.meta[1].includes(localStorage.role)) {
                    next()
                } else {
                    location.hash =from.path                   
                }
            } else {
                next("/")
            }
        })
    }else{
        next()
    }

})

export default router