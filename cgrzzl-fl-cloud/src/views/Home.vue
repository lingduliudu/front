<template>
  <div class="container">
    <headerBase @logout="logout" @changenav="changenav"></headerBase>
    <div class="main">
      <aside :class="collapsed" v-show="$route.path!='/workbench'">
        <el-menu
          :default-active="defaultactive"
          class="el-menu-vertical-demo"
          router
          unique-opened
          v-show="!collapsed"
          background-color="#fff"
          text-color="#fff"
          active-text-color="#FFF"
          style="overflow-y: scroll;">
          <template v-for="(item,index) in navs">
            <el-submenu :index="index+''" v-if="item.children " :key="item.name">
              <template slot="title">
                <i :class="item.iconCls"></i>
                {{item.name}}
              </template>
              <div v-for="child in item.children" :key="child.path" class="childDiv">
                <el-menu-item class="childOne" style="color: #666" :index="child.path.split('?')[0]">{{child.name}}</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item v-if="!item.children" :key="item.path" :index="item.path.split('?')[0]">
              <i :class="item.iconCls"></i>
              {{item.name}}
            </el-menu-item>
          </template>
        </el-menu>
      </aside>
      <div class="main-right-top">
        <!-- 标签页导航 -->
        <el-tabs class="base-nav" v-model="editableTabsValue" @tab-remove="removeTab" @tab-click="handleTab">
          <el-tab-pane
            :key="item.path"
            v-for="(item) in editableTabs"
            :label="item.name"
            :name="item.name"
            :closable="item.name == '首页' ? false : true"
          ></el-tab-pane>
        </el-tabs>  
        <el-dropdown class="avue-tags__menu">
          <el-button type="primary"
                    size="mini">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="removeOtherTags">关闭其他</el-dropdown-item>
            <el-dropdown-item @click.native="removeAllTags">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>


      <!-- <transition name="fade" mode="out-in"> -->
      <router-view class="ly-main-view" style="margin-top: 56px;"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
import api from "../api/api";
import * as types from "@/store/mutation-types";
import { mapMutations } from "vuex";
import moment from "moment";
import { setTimeout, clearTimeout } from "timers";
import bus from "@/util/bus.js";
import { baseURL, baseURLImg, baseURLDownloads } from "@/api/sys.js";
import $ from "jquery";

// 加
Number.prototype["adds"] = function(...arg) {
  var r1,
    r2,
    m,
    result = this;
  arg.forEach(value => {
    try {
      r1 = result.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = value.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    result = Math.round(result * m + value * m) / m;
  });
  return result;
};
// 减
Number.prototype["sub"] = function(...arg) {
  var r1,
    r2,
    m,
    result = this;
  arg.forEach(value => {
    try {
      r1 = result.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = value.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    var n = r1 >= r2 ? r1 : r2;
    result = (Math.round(result * m - value * m) / m).toFixed(n);
  });
  return result;
};
// 乘
Number.prototype["mul"] = function(...arg) {
  var result = this;
  arg.forEach(value => {
    var m = 0,
      s1 = result.toString(),
      s2 = value.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    result =
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m);
  });
  return result;
};
// 除
Number.prototype["div"] = function(...arg) {
  var result = this;

  arg.forEach(value => {
    var t1 = 0,
      t2 = 0,
      r1,
      r2;
    try {
      t1 = result.toString().split(".")[1].length;
    } catch (e) {}
    try {
      t2 = value.toString().split(".")[1].length;
    } catch (e) {}
    r1 = Number(result.toString().replace(".", ""));
    r2 = Number(value.toString().replace(".", ""));
    result = (r1 / r2) * Math.pow(10, t2 - t1);
  });
  return result;
};

export default {
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        // // 跳转路由验证token
        let token = sessionStorage.getItem('token')
        if(!token) {
          return this.$router.push('/login')
        }


        // console.log(to, '-------to')
        // console.log(from, '-------from')
        console.log(this.editableTabsValue, '----------editableTabsValue')
        if (!from || to.path != from.path && to.meta.isnav) {
          this.editableTabsValue = to.name
            if(JSON.parse(sessionStorage.getItem("menuPathArr"))) {
              this.editableTabs = JSON.parse(sessionStorage.getItem("menuPathArr"))
          }
          let obj = {}
          obj.name = to.name
          obj.path = to.path
          if(this.editableTabs.findIndex(el=> {return el.name == to.name}) == -1) {
            this.editableTabs.push(obj)
          }
          sessionStorage.menuPathArr = JSON.stringify(this.editableTabs)
          
          this.navs = [];
          if (to.matched.length > 1) {
            sessionStorage.name = to.meta.to;
            sessionStorage.leftnav = to.matched[1].name;
          } else {
            sessionStorage.name = to.meta.to;

            sessionStorage.leftnav = to.name;
          }
          sessionStorage.oldpath = to.path;
          this.navs = JSON.parse(sessionStorage.sideRoutes);
        }
        var a = "";
        if (!isNaN(sessionStorage.oldpath[sessionStorage.oldpath.length - 1])) {
          a =
            sessionStorage.oldpath
              .split("/")
              .slice(0, -1)
              .join("/") + "/1";
        } else {
          a = sessionStorage.oldpath;
        }
        this.UPDATE_navName({ name: a });
      }
    }
  },
  computed: {
    defaultactive: {
      get() {
        var a = this.$store.state.navName.name;
        if (a) {
          if (!isNaN(a[a.length - 1])) {
            a =
              a
                .split("/")
                .slice(0, -1)
                .join("/") + "/1";
          } else {
            a = this.$store.state.navName.name;
          }
        }
        return this.$store.state.navName.name;
      }
    },
    // editableTabsValue: {
    //   get: function () { 
    //     console.log(sessionStorage.getItem('leftnav'), '----------leftnav')
    //     return sessionStorage.getItem('leftnav') 
    //   } ,
    //   set: function (val) {
    //   }
    // }
  },
  data() {
    return {
      moRen: 0,
      pathShow: false,
      collapsed: false,
      sysUserName: "",
      roots: "",
      userInfo: {},
      routeList: [],
      type: "", //企业类型 0 是核心企业  1 是供应商
      navs: [],
      side: "",
      ws: "",
      isActive: true,
      pageUrl: "",
      wsdata: {
        payableBillReminderNode: ""
      },
      moment: moment,
      issign: false,
      menuPathArr: [],
      editableTabs: [],
      editableTabsValue: sessionStorage.getItem('leftnav')
    };
  },
  created() {
    // if(sessionStorage.getItem('THISTOP') === sessionStorage.getItem('name')){
    //         this.moRen=0;
    // }

    // if(this.$route.path == '/workbench'){
    //     this.pathShow=false;
    // }else {
    //     this.pathShow=true;
    //     this.side=JSON.parse(sessionStorage.getItem('sideRoutes'))
    // }
    this.editableTabs = JSON.parse(sessionStorage.getItem("menuPathArr"));
    if (sessionStorage.sideRoutes) {
      this.navs = JSON.parse(sessionStorage.sideRoutes);
    }

    var a = "";
    if (sessionStorage.oldpath) {
      if (!isNaN(sessionStorage.oldpath[sessionStorage.oldpath.length - 1])) {
        a =
          sessionStorage.oldpath
            .split("/")
            .slice(0, -1)
            .join("/") + "/1";
      } else {
        a = sessionStorage.oldpath;
      }
    }

    this.UPDATE_navName({ name: a });
  },
  mounted() {
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    // api.getCurrentDay().then(res => {
    //   sessionStorage.currentday = res;
    // });
    // this.websokitfn();
  },
  methods: {
    ...mapMutations(["UPDATE_navName"]),

    RenChange(item, index) {
      this.moRen = null;
      if (index != 0) {
        $(".bgJquery")
          .first()
          .removeClass("is-active");
      }
      sessionStorage.setItem("THISTOP", "null");
    },

    RenChangeChild(child, indexChild) {
      this.moRen = null;
      $(".bgJquery")
        .first()
        .removeClass("is-active");
      sessionStorage.setItem("THISTOP", "null");
    },

    toside(item) {
      let this_route = item.path;

      this.$router.push({
        path: item.path,
        name: item.name
      });
    },

    get(obj, path) {
      return _.get(obj, path);
    },
    gorouter(data) {},
    beforeunloadHandler(e) {},

    changenav(item) {
      this.side = JSON.parse(sessionStorage.getItem("sideRoutes"));
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {}).then(() => {
        api.toLogout({ accessToken: sessionStorage.layoutToken }).then(res => {
          if (res.code == "100000") {
            sessionStorage.clear();
            this.$store.commit(types.UPDATE_userInfo, {});
            _this.$router.push("/login");
            sessionStorage.clear();
          }
        });
      });
    },
    handleTab(tab) {
      this.editableTabs.find(el => {
        if(el.name == tab.name) {
          this.$router.push(el.path)
        }
      })
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue
      if(activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        })
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);

      // if(this.editableTabs.length  <= 0) {

      //   this.$router.push('/productparamsmanage/cpqsgl')
      //   console.log(this.editableTabs.length, '----------------执行了')

      // }else {
        let activePath = this.editableTabs.find(el=> {return el.name == activeName}).path
        this.$router.push(activePath)
      // }
      sessionStorage.menuPathArr = JSON.stringify(this.editableTabs)
    },
    removeAllTags() {
      let tabs = this.editableTabs;
      this.editableTabs = tabs.filter(tab => tab.name == '首页');
      sessionStorage.menuPathArr = JSON.stringify(this.editableTabs)
      this.$router.push('/index')
    },
    removeOtherTags() {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue
      this.editableTabs = tabs.filter(tab => tab.name == '首页' || tab.name == activeName);
      sessionStorage.menuPathArr = JSON.stringify(this.editableTabs)
    },
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 64px;
    bottom: 0px;
    overflow: hidden;
    width: 100%;
    .main-right-top {
      position: absolute; 
      top: 0; 
      padding-left: 210px; 
      width: 100%;
    }
    aside {
      flex: 0 0 210px;
      width: 210px;
      // border-right: 1px solid #eee;
      box-shadow: 2px 2px 2px 0 #0000000d;
      .el-menu {
        z-index: 999;
        height: 100%;
        // background: rgba(227, 1, 32, 1);
        border-right: none;
        i {
          color: #666;
        }

        &-item {
          color: #a6c6ff;
          &:hover {
            background-color: $color-dominant-color !important;
            color: #fff !important;
            i {
              color: #fff !important;
            }
          }
          &.is-active {
            color: #fff;
            i {
              color: #fff !important;
            }
          }
        }
        .el-submenu .childOne {
          background: #ffffff !important;
        }
        .el-submenu .childOne:hover {
          background: rgba(227, 1, 32, 1) !important;
          i {
            color: #fff;
          }
        }
        .is-active {
          background-color: $color-dominant-color !important;
          color: #fff;

          border-right: none;
          font-size: 14px;

          i {
            // color: rgba(227, 1, 32, 1);
          }
        }
        .el-submenu {
          border-left: none;
          .is-active {
            background-color: $color-dominant-color !important;
            color: #fff !important;
          }
        }
      }
      .collapsed {
        overflow-y: scroll;
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    // 右边内容样式
    // .ly-main-view {
    //   margin-left: 16px;
    // }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 210px;
      width: 210px;
    }
    .content-container {
      flex: 1;
      .breadcrumb-container {
        height: 30px;
        .title {
          // width: 200px;
          float: left;
          color: #475669;
          margin-top: -3px;
        }
        .breadcrumb-inner {
          // float: right;
        }
      }
      .content-wrapper {
        // background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
// .fa-credit-card-alt {
//   font-size: 11px;
// }
</style>

<style lang="scss">
@import "@/styles/vars.scss";
@import "~scss_vars";

.el-submenu {
  &__icon-arrow {
    color: #99bfff !important;
  }
  &.is-active {
    .el-submenu__title {
      background: $color-dominant-color;
      color: #666;
      i {
        color: #666 !important;
      }
      &:hover {
        color: #fff !important;
        i {
          color: #fff !important;
        }
        .el-submenu__icon-arrow {
          color: #99bfff !important;
        }
      }
    }
    .el-menu-item {
      background-color: $color-secondary !important;
    }
  }
  &__title:hover {
    background-color: $color-dominant-color !important;
    color: #fff !important;
    i {
      color: #fff !important;
    }
    .el-submenu__icon-arrow {
      color: #99bfff !important;
    }
  }
}
// 标签页导航样式覆盖
.base-nav {
  margin-bottom: 16px;
  display: block!important;
  height: 48px;
  padding-right: 110px;
  border-top: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 #0000000d;
  .el-tabs__nav-prev,
  .el-tabs__nav-next {
    width: 40px;
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    z-index: 3;
    background-color: #fff;
  }
  .el-tabs__nav-prev {
    padding-right: 30px;
  }
  .el-tabs__nav-scroll {
    margin-left: 40px;
  }

  // 标签页样式
  .el-tabs__item {
    height: 48px;
    line-height: 48px;
    color: #ccc;
  }
  .el-tabs__item:hover {
    color: #ccc;
  }
}
.avue-tags__menu {
  position: absolute!important;
  top: 10px;
  right: 15px;
  .el-dropdown-menu el-popper {
    width: 100%;
  }
}

// 菜单一级
.el-menu-item {
  color: #666 !important;
}
.el-menu-item.is-active {
  color: #fff !important;
}
.el-submenu__title {
  color: #666 !important;
}

.childDiv {
  background: gold !important;
}


</style>

