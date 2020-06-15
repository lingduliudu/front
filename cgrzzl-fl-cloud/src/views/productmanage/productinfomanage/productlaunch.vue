<template>
  <div>
    <layout-main-view :breadcrumb="breadcrumblist">
      <!-- 将文件名作为最外层类名，为避免相互影响如果直接复制文件请务必更改最外层类名-->
      

      <div class="common-page-dataList base-floorNav">
        <div class="openShortcutMenu" @click="ShortcutMenuBtn" v-show="this.ShortcutMenu == 'true'">
          <span>页面快捷菜单点击打开</span>
        </div>

        <el-tabs type="border-card" v-model="activeName" class="n-tabs">
          <el-collapse v-model="activeNames" @change="handleChange" id="floorWarp" class="scroll-content">
            <el-collapse-item title="" name="1" id="floor-0">
              <template slot="title">
                <span>楼层一 Consistency</span>
                <span>{{getVal('1') ? "收起" : "展开"}}</span>
              </template>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            
            <el-collapse-item title="" name="2" id="floor-1">
              <template slot="title">
                <span>楼层二 Feedback</span>
                <span>{{getVal('2') ? "收起" : "展开"}}</span>
              </template>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>

            <el-collapse-item title="" name="3" id="floor-2">
              <template slot="title">
                <span>楼层三 Efficiency</span>
                <span>{{getVal('3') ? "收起" : "展开"}}</span>
              </template>
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>

            <el-collapse-item title="楼层四 Controllability" name="4" id="floor-3">
              <template slot="title">
                <span>楼层四 Controllability</span>
                <span>{{getVal('4') ? "收起" : "展开"}}</span>
              </template>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>

          <!-- 展开/隐藏 -->
          <!-- <div class="switchSaveSubmitDiv">
            <span>展开</span>
          </div> -->

          <div class="floor-nav" v-if="this.ShortcutMenu == 'false'">
            <div v-for="(item,index) in element.floorNavList"
              :key="index"
              :class="activeBtn == index ? 'active nav-list-item' : 'nav-list-item'"
              @click="gotoFloor('#floor-'+index,index)"
            >{{item.name}}</div>
            <!-- <span class="hindeSpan" @click="hindeSpanBtn">隐藏</span> -->
            <div class="hindeSpanDiv" @click="hindeSpanBtn">隐藏</div>
          </div>
        </el-tabs>
      </div>
    </layout-main-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      breadcrumblist: [],
      isShowAll: false,
      isHedden: false,
      loading: false,
      filterList: [
      ],
      activeName: "1",
      listLoading: false,

      activeNames: ["1", "2", "3", "4"],
      element: {
        nav_item: null,
        floor_item: null,
        timer: null,
        floorNavList: [
          { id: 1, name: "楼层一"},
          { id: 2, name: "楼层二"},
          { id: 3, name: "楼层三"},
          { id: 4, name: "楼层四"},
        ],
      },
      activeBtn: 0,

      ShortcutMenu: "true"
    };
  },

  created() {
  },

  mounted() {
    this.showtab = this.$route.params.state
    this.element.nav_item = document.getElementsByClassName('nav-list-item')
    this.element.floor_item = document.getElementsByClassName('floor-item')
    // this.element.nav_item[0].classList.add('active')
    window.addEventListener('scroll', this.floorSrcollEventListener, true)
  },

  methods: {
    filterShowAll() {
      this.isShowAll = !this.isShowAll;
    },
    headerStyle({ row, rowIndex }) {
      return { background: "#FAFAFA" };
    },

    handleChange(val) {
      console.log(val, '-----------val');
    },
    getVal(index) {
      return this.activeNames.includes(index)
    },
    gotoFloor(selector, index) {
      console.log(selector, index, '---------------hahaha')
      this.$el.querySelector(selector).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
      this.activeBtn = index
    },

    /**
     * 快捷菜单
     */
    ShortcutMenuBtn(){
      if(this.ShortcutMenu == 'true'){
        this.ShortcutMenu = 'false'
      }
    },
    hindeSpanBtn(){
      if(this.ShortcutMenu == 'false'){
        this.ShortcutMenu = 'true'
      }
    },


    /**
     * 监听窗口滚动楼层导航动态定位
     */
      // floorSrcollEventListener(e) {
      //   const { nav_item, floor_item } = this.element
      //   const window_scrollTop =  document.documentElement.scrollTop ||
      //                             window.pageYOffset ||
      //                             document.body.scrollTop ||
      //                             this.$el.querySelector('#floorWarp').scrollTop
      //   // console.log(this.$el.querySelector('#floorWarp'), "-----------this.$el.querySelector('#floorWarp')")
      //   // console.log(window_scrollTop, '---------window_scrollTop')
      //   for (let i = 0, len = floor_item.length; i < len; i++) {
      //     const floor_offsetTop = floor_item[i].offsetTop - floor_item[0].offsetTop
      //     if (window_scrollTop >= floor_offsetTop) {
      //       for (let n = 0, len = nav_item.length; n < len; n++) {
      //         const current_classList = nav_item[n].classList
      //         i === n
      //           ? current_classList.add('active')
      //           : current_classList.remove('active')
      //       }
      //     }
      //   }
      // },
      /**
     * 设置楼层导航事件驱动方法
     * @param {Number} index  楼层下标
     */
      setFloorNavMountClick(index) {
        const { floor_item } = this.element
        const floor_offsetTop = floor_item[index].offsetTop
        const window_scrollTop = this.$el.querySelector('#floorWarp').scrollTop
        const timer = {
          step: 60,
          times: 16,
          FLOOR_OFFSETTOP: floor_offsetTop
        }
        if (window_scrollTop > floor_offsetTop) {
          this.setFloorScrollArrowUp(timer)
        } else if (window_scrollTop === floor_offsetTop) {
          return false
        } else {
          this.setFloorScrollArrowDown(timer)
        }
      },
      /**
     * 设置楼层向上滚动
     * @param {Object} timer 定时器配置
     */
      setFloorScrollArrowUp(timer) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          const window_scrollTop = this.$el.querySelector('#floorWarp').scrollTop
          if (window_scrollTop <= timer.FLOOR_OFFSETTOP) {
            this.$el.querySelector('#floorWarp').scrollTop = timer.FLOOR_OFFSETTOP
            clearInterval(this.timer)
          } else {
            this.$el.querySelector('#floorWarp').scrollTop = window_scrollTop - timer.step
          }
        }, timer.times)
      },
      /**
     * 设置楼层向下滚动
     * @param {Object} timer 定时器配置
     */
      setFloorScrollArrowDown(timer) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          const window_scrollTop = this.$el.querySelector('#floorWarp').scrollTop
  
          if (window_scrollTop >= timer.FLOOR_OFFSETTOP) {
            this.$el.querySelector('#floorWarp').scrollTop = timer.FLOOR_OFFSETTOP
            clearInterval(this.timer)
          } else {
            if (window_scrollTop === 2095) {
              clearInterval(this.timer)
              return false
            }
            this.$el.querySelector('#floorWarp').scrollTop = window_scrollTop + timer.step
          
          }
        }, timer.times)
      },
  }
};
</script>

<style lang="scss">
.base-floorNav{
  position: relative;
  width: 100%;
  margin-right: 16px;
  // border: 3px solid #000;

  // 快捷菜单
  .openShortcutMenu {
    padding-top: 15px;
    width: 24px;
    min-height: 220px;
    z-index: 1;
    background: #ff4d60;
    text-align: center;
    border-radius: 5px;
    position: fixed;
    top: 35%;
    right: 40px;
  }

  .floor-nav {
    position: fixed;
    top: 35%;
    right: 0px;
    transform: translateX(-50%);
    // min-width: 100px;
    // min-height: 200px;
    padding: 20px 15px;
    background-color: #EBEEF5;
    color: skyblue;

    .hindeSpanDiv {
      font-weight: 700;
      // position: absolute;
      // right: 15px;
      // bottom: 15px;
      float: right;
      margin-top: 20px;
      color: #444;
    }
  }

  // 打开/隐藏
  .switchSaveSubmitDiv {
    padding-left: 300px;
    width: 50px;
    height: 40px;
    z-index: 1;
    background: #EBEEF5;
    text-align: center;
    position: fixed;
    bottom: 30%;
    left: 30px;
  }

  .nav-list-item.active,
  .nav-list-item:hover {
    color: #FF4D60;
  }
  .el-collapse-item__header {
    display: flex;
    border-bottom: 1px solid #EBEEF5;
    span:nth-of-type(1) {
      flex: 1;
      font-size: 16px;
      font-weight: 700;
    }
    span:nth-of-type(2) {
      text-align: right;
      width: 50px;
    }
    .el-collapse-item__arrow {
      display: none!important;
    }
    .el-collapse-item__arrow.is-active {
      display: none!important;
    }
  }
  .el-collapse-item__wrap {
    margin-top: 20px;
  }
}

</style>
