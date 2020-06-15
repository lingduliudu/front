<template>
  <section class="content-container">
    <div class="grid-content bg-purple-light">
      <div class="ly-page-head">
        <div class="current-position">
          <!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
						<el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" >
							{{ item }}
						</el-breadcrumb-item>
          </el-breadcrumb>-->

          
          <!-- 标签页导航 -->
          <!-- <el-tabs class="base-nav" v-model="editableTabsValue" @tab-remove="removeTab" @tab-click="handleTab">
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
          </el-dropdown> -->

        </div>
      </div>
      <div class="content-wrapper ly-page-body">
        <div class="common-tabs" v-if="tabOptions.length > 0">
          <ul>
            <li
              v-for="item in tabOptions"
              :key="item.value"
              :class="{'active':item.value==isactive }"
              @click="activefn(item)"
            >{{item.label}}</li>
          </ul>
        </div>
        <div class="content-container-inner">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "layout-main-view",
  data() {
    return {
      isactive: "1",
      // editableTabsValue: ""
    };
  },
  created() {
    this.isactive = this.$route.params.state;
	  // this.editableTabsValue = this.editableTabs[0].name
  },
  mounted() {
  },
  props: {
    tabOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    breadcrumb: {
      type: Array,
      default() {
        return false;
      }
    }
  },
 
  computed: {
  
  },
  methods: {
    


    has(obj, path) {
      console.log(obj, path, 77, this.$route.matched);
      return _.has(obj, path);
    },
    activefn(data) {
      console.log(data, 789);
      // if(/type/.test(data.path)){
      // 	var arr=data.path.match(/type=(\d)/)[1]
      // }
      this.isactive = data.value;
      this.$router.push({
        path: data.path,
        params: { state: data.value },
        query: { pageNum: 1, pageSize: 10 }
      });
      // this.pageNum=1;
      this.$emit("tabclick", data.value);
    }
  }
};
</script>
<style lang="scss">
/* element-ui 面包屑样式覆盖 start */
.current-position {
  position: relative;
  border-top: 1px solid #f6f6f6;
  display: block;
  .el-breadcrumb {
    .el-breadcrumb__inner {
      color: #8c8c8c;
      font-weight: normal;
    }
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #595959;
  }
}
.content-container {
  .ly-page-head {
    // height: 58px;
    padding: 0;
    background-color: #f1f1f1;
  }
  .current-position .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
  }
  &-inner {
    padding: 16px;
    padding-top: 0;
    background-color: #f1f1f1;
  }
}
.common-tabs {
  background: #f1f1f1;
  // margin-top: 6px;
  line-height: 28px;
  ul {
    overflow: hidden;
    margin: 0;
    padding-left: 16px;
    padding-right: 16px;
    // padding-bottom: 8px;
    // padding-top: 24px;
  }
  li {
    padding: 0 24px;
    background: #f7faff;
    border: none;
    border-bottom: none;
    margin-right: 4px;
    float: left;
    text-align: center;
    position: relative;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    font-size: 14px;
    color: rgba(42, 44, 58, 1);
    // color: rgba(0,0,0,0.65);
    border-radius: 2px 2px 0 0;
    &:hover {
      // color: #FF4D60;
    }
    &.active {
      background: #ff4d60;
      // background: #E6F0FF;
      border-radius: 2px;
      font-size: 14px;
      color: #fff;
      // color: #FF4D60;
    }
  }
}

/* element-ui 面包屑样式覆盖 end */

// 标签页导航样式覆盖
// .base-nav {
//   margin-bottom: 16px;
//   display: block!important;
//   height: 40px;
//   padding-right: 90px;
//   background-color: #fff;
//   box-shadow: 0 1px 2px 0 #0000000d;
//   .el-tabs__nav-prev,
//   .el-tabs__nav-next {
//     width: 40px;
//     padding: 0 10px;
//     z-index: 3;
//     background-color: #fff;
//   }
//   .el-tabs__nav-scroll {
//     margin-left: 40px;
//   }

//   // 标签页样式
//   .el-tabs__item {
//     color: #ccc;
//   }
//   .el-tabs__item:hover {
//     color: #ccc;
//   }
//   .el-tabs__item.is-active {
//     background-color: #fff;
//     color: #ff4d60;
//     border-bottom: 2px solid #ff4d60!important;
//   }
//   .el-tabs__item.is-active:hover {
//     background-color: #fff;
//     color: #ff4d60;
//     border-bottom: 2px solid #ff4d60!important;
//   }
 
  


// }
// .avue-tags__menu {
//   position: absolute!important;
//   top: 6px;
//   right: 14px;
//   .el-dropdown-menu el-popper {
//     width: 100%;
//   }
// }
</style>
