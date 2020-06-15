import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import NotFound from "../components/error-page/404.vue";

import Home from "../views/Home.vue";

// 5月26日创格路由参数

// *******************************************  首页  *******************************************
// 首页
import index from "../views/index.vue";


// ****************************************  产品管理  ****************************************
// 产品信息管理
import productinfomanage from "../views/productmanage/productinfomanage/productinfomanage.vue";
// 产品发布
import productlaunch from "../views/productmanage/productinfomanage/productlaunch.vue";

// ****************************************  产品策略管理  ****************************************
import offsetstrategymanage from "../views/productstrategymanage/offsetstrategymanage.vue";



// ****************************************  产品参数管理  ****************************************
// 产品期数管理
import cpqsgl from "../views/productparamsmanage/cpqsgl.vue";

// 还款间隔管理
import hkjggl from "../views/productparamsmanage/hkjggl.vue";

// 费用参数管理
import fycsgl from "../views/productparamsmanage/fycsgl.vue";

// 指标参数管理
import zbcxgl from "../views/productparamsmanage/zbcxgl.vue";

// 贴息机构管理
import txjggl from "../views/productparamsmanage/txjggl.vue";



var routes = [
  {
    path: "/Login",
    component: Login,
    name: "登录",
    hidden: true
  },
  {
    path: "/",
    component: Home,
    redirect: "/login",
    name: "首页",
    children: [
            // 5月26日创格路由参数

      // ----------------------------------------  首页  ---------------------------------------
      {
        path:"/index",
        component:index,
        name:"首页",  
        meta: { isnav: true, to: "东风金融-创格" }
      },

      // ------------------------------------  产品策略管理  ------------------------------------
      {
        path:"/productstrategymanage/offsetstrategymanage",
        component:offsetstrategymanage,
        name:"冲抵策略管理",  
        meta: { isnav: true, to: "东风金融-创格" }
      },

      // ------------------------------------  产品管理  ------------------------------------
      {
        path:"/productmanage/productinfomanage",
        component:productinfomanage,
        name:"产品信息管理",  
        meta: { isnav: true, to: "东风金融-创格" }
      },
      {
        path:"/productmanage/productlaunch",
        component:productlaunch,
        name:"产品发布",  
        meta: { isnav: true, to: "东风金融-创格" }
      },

      // ------------------------------------  产品参数管理  ------------------------------------
      {
        path:"/productparamsmanage/cpqsgl",
        component:cpqsgl,
        name:"产品期数管理",  
        meta: { isnav: true, to: "东风金融-创格" }
      },
      {
        path:"/productparamsmanage/hkjggl",
        component:hkjggl,
        name:"还款间隔管理",  
        meta: { isnav: true, to: "东风金融-创格" }
      },
      {
        path:"/productparamsmanage/fycsgl",
        component:fycsgl,
        name:"费用参数管理",
        meta: { isnav: true, to: "东风金融-创格" }
      },
      {
        path:"/productparamsmanage/zbcxgl",
        component:zbcxgl,
        name:"指标参数管理",
        meta: { isnav: true, to: "东风金融-创格" }
      },
      {
        path:"/productparamsmanage/txjggl",
        component:txjggl,
        name:"贴息机构管理",
        meta: { isnav: true, to: "东风金融-创格" }
      },
    ]
  },
  {
    path: "*",
    hidden: true,
    component:NotFound,
    // redirect: { path: "/404" }
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
