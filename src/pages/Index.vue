<template>
  <div id="index">
    <el-container>
      <el-aside>
        <el-col :span="12">
          <el-menu
            :default-active="this.$route.path"
            background-color="#0a0e1a"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            unique-opened
          >
            <h5>外卖 商家中心</h5>
            <div v-for="item in this.superx " :key="item.index">
              <el-submenu :index="item.index" v-if="item.children">
                <template slot="title">
                  <i :class="item.cls"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item
                  v-for="items in item.children "
                  :key="items.index"
                  :index="items.index"
                >{{items.title}}</el-menu-item>
              </el-submenu>

              <el-menu-item :index="item.index" v-else>
                <i :class="item.cls"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="label">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="item in this.$route.meta[0]" :key="item.id">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div>
            <span class="sp">欢迎您:{{acc}}</span>
            <el-dropdown class="dropdown-link-x" @command="handleCommand">
              <span class="el-dropdown-link">
                <div class="demo-type">
                  <el-avatar :size="60" src @error="errorHandler">
                    <!-- http://img4.imgtn.bdimg.com/it/u=1827110709,3740031155&fm=26&gp=0.jpg -->
                    <img :src="src" />
                  </el-avatar>
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                <el-dropdown-item command="b" class="color">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { api_checktoken, api_accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      super: [
        {
          index: "/index/home",
          cls: "el-icon-house",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/orderManagement",
          cls: "el-icon-shopping-bag-1",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "store",
          cls: "el-icon-shopping-bag-1",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            { index: "/index/goods", title: "商品列表" },
            { index: "/index/goodsAdd", title: "商品添加" },
            { index: "/index/classify", title: "商品分类" }
          ]
        },
        {
          index: "/index/store",
          cls: "el-icon-shopping-bag-2",
          title: "店铺管理",
          role: ["super", "normal"]
        },

        {
          index: "acc",
          cls: "el-icon-user",
          title: "账号管理",
          role: ["super"],
          children: [
            { index: "/index/accountList", title: "账号列表" },
            { index: "/index/accountAdd", title: "账号添加" },
            { index: "/index/accountModify", title: "修改密码" }
          ]
        },
        {
          index: "shouxiao",
          cls: "el-icon-date",
          title: "销售统计",
          role: ["super"],
          children: [
            { index: "/index/comSta", title: "商品统计" },
            { index: "/index/orderSta", title: "订单统计" }
          ]
        }
      ],
      // num: 1,
      activeName: "second",
      errorHandler: "",
      role: "",
      uid: "",
      acc: "",
      src: "",
      list: ""
    };
  },

  mounted() {},
  methods: {
    // 权限管理
    //  jurisdiction(){
    //       this.super = this.super.map(v => {
    //         return arguments.forEach(c => {
    //           if (v.title == c) {
    //             return c;
    //           }
    //         });
    //       });
    //       return this.super
    //     },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    localhostHash() {
      console.log(123);
    },
    //跳转个人页面或者注销用户
    handleCommand(command) {
      if (command == "a") {
        location.hash = "/index/personal";
      } else {
        localStorage.removeItem("uid");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        location.hash = "/";
      }
    }
  },
  computed: {
    superx(){
      return this.super.filter(v => {
        for (let i = 0; i < v.role.length; i++) {
          if (v.role[i] == localStorage.role) {
            return true;
          }
        }
      });
    }
  },
  created() {
    //获取登录人的头像和用户名
    this.uid = localStorage.uid;
    api_accountinfo(this.uid).then(res => {
      this.acc = res.data.accountInfo.account;
      this.src = res.data.accountInfo.imgUrl;
    });

    //验证登录权限和是否登录过
    let token = localStorage.token;
    this.role = localStorage.getItem("role");
    
    api_checktoken(token).then(res => {
      if (!(res.data.code == 0)) {
        location.hash = "/";
        return;
      }
    });
  }
};
</script>

<style lang="less" scoped>
@base: #0a0e1a;
#index {
  height: 100%;
  .el-container {
    height: 100%;
    .header {
      line-height: 60px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      padding-right: 50px;
      > div {
        > span {
          margin-right: 10px;
        }
      }
    }
  }
  .el-aside {
    overflow: visible;
    width: 300px;
    background: @base;
    height: 100%;
  }
  h5 {
    color: #fff;
    font-weight: 400;
  }
  .el-menu {
    width: 300px;
    border: 0;
  }
  .el-breadcrumb__inner,
  .label,
  .el-breadcrumb {
    line-height: 60px;
  }
}
.dropdown-link-x,
.demo-type {
  z-index: 999;
}
.el-dropdown-link {
  z-index: 999;
}
.color {
  color: red;
}
.sp /deep/ {
  position: relative;
  top: -20px;
  right: 20px;
}
</style>