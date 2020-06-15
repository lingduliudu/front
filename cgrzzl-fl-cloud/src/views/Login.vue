<template>
  <div class="page-login father">
    <div class="tabView">
      <div class="grid">
        <div class="grid1"></div>
        <div class="grid2"></div>
        <div class="gridLine"></div>
        <div class="grid3"></div>
      </div>
    </div>

    <div class="login-bgc childern">
      <div class="connters-1">
        <div class="banxin">
          <div class="main-content content-font-first">

            <el-tabs v-model="activeName" class="activer">
              <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                label-position="left"
                label-width="0px"
                class="demo-ruleForm login-container"
                >
                <el-form-item>
                  <div class="login_logo_text">
                    <p class="textP1">产品工厂管理平台</p>
                    <p class="textP2">欢迎登录</p>
                  </div>
                </el-form-item>

                <el-form-item prop="loginName">
                  <el-input type="text" class="numAccount" v-model.trim="loginForm.loginName" placeholder="请输入账号"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <el-input
                    :type="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    class="content-fontPass numPassword"
                  ></el-input>
   
                </el-form-item>
                <!-- <el-form-item prop="captcha">
                  <el-row :gutter="20">
                    <el-col :span="17">
                      <el-input  v-model="loginForm.captcha" placeholder="验证码" style="width: 240px"></el-input>
                    </el-col>
                    <el-col :span="7" class="login-captcha">
                      <img :src="captchaPath" @click="getCaptcha()" alt />
                    </el-col>
                  </el-row>
                </el-form-item> -->

                <!-- <el-dialog> -->
                <Vcode
                  :show="isShow"
                  @success="onSuccess"
                  @close="onClose"
                  @fail="onFail"
                />
                <el-form-item>
                  <button class="okay" @click.prevent="onSubmit"  :disabled="this.msg_onSuccess != ''"> <span class="onSubmitBtn"> {{ passInfr }}</span></button>
                  <!-- </el-dialog> -->
                </el-form-item>

                <el-form-item style="margin-top: -40px; margin-bottom: 32px">
                  <el-checkbox @change="markNameWord" v-model="checked">记住账号和密码</el-checkbox>
                </el-form-item>

                <el-form-item style="width:100%;margin-top: -15px;">
                  <el-button
                    class="login-btn"
                    type="primary"
                    style="width:100%;background: #FF4D60; margin-bottom: 48px"
                    @click.native.prevent="loginSubmit"
                  >登录</el-button>
                </el-form-item>

              </el-form>
            </el-tabs>
          </div>
        </div>
      </div>
      <!-- <div class="layout-footer">Copyright ©2019 上海指旺信息科技有限公司 版权所有</div> -->
    </div>
    <!--<layout-footer></layout-footer>-->
  </div>
</template>

<script>
// import { Login } from "../api/api";
import api from "../api/api";
import { getUUID } from "../util/index.js";
import { getPassword } from "@/util/common.js";
import { JSEncrypt } from "jsencrypt";
// import LayoutFooter from "@/components/layout-footer";
import * as types from "@/store/mutation-types";
// import { randomStr } from "@/tool.js";
// 滑块
import Vcode from "vue-puzzle-vcode";
import Axios from 'axios';

export default {
  // components: {
  //   // "layout-footer": LayoutFooter
  // },
  components:{
    Vcode
  },
  data() {
    return {
      /* 通过验证账号，编码以及密码脱离文本框时，三个数据均为true的情况下，刷新二维码。 */
      userNo:false,
      bianMaNo:false,
      passwordNo:false,


      activeName: "first",
      // randomStr:'',
      loginForm: {
        loginName: "admin",
        password: "123456",
        captcha: "",
        randomStr: "",
        // relationCorpId: ''
        oriMark: "04322168",
        slideblock: false, //滑块验证
      },
      // showSlideblock: false,
      // accuracy: 5,
      // sliderText: '请拖动滑块进行验证',
      // sliderInfo: '请完成安全验证',
      // sliderIcon: 'el-icon-s-opportunity',
      captchaPath: "",
      rules: {
        loginName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      password: "password",
      options: [],

      // 滑块
      isShow: false, // 验证码模态框是否出现
      msg_onSuccess: "",
      msg_onClose: "",
      checked: false,
      passInfr: "点击完成验证"
    };
  },
  created() {
    // this.getCaptcha();
  },
  mounted() {
   
  },
  methods: {
    onSubmit(){
      this.isShow = true
    },

    // 用户通过了验证
    // onSuccess(msg){
    //   this.isShow = false; // 通过验证后，需要手动隐藏模态框
    //   console.log("msg_onSuccess", msg)
    //   this.msg_onSuccess = msg
    // },
    onSuccess(msg){
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      // console.log("msg_onSuccess", msg)
      this.msg_onSuccess = msg
      if(this.msg_onSuccess){ 
        // this.$message({
        //   message: '已验证通过, 请点击登录',
        //   type: 'warning'
        // })
        this.passInfr = "验证通过"
      }
    },
    // 用户点击遮罩层，应该关闭模态框
    onClose(msg){
      this.isShow = false;
      console.log("msg_onClose", msg)
    },

    onFail(msg){
      console.log("msg_onFail", msg)
      this.isShow = true;
    },

    //记住账号密码
    markNameWord(e){
      // console.log("e", e);
      if ( e == true){
        if(!window.localStorage){
            alert("浏览器不支持localStorage");
        }else{
            var storage = window.localStorage;
            var data = { loginName: this.loginForm.loginName,password: this.loginForm.password };
            var b = JSON.stringify(data);
            storage.setItem("data",b);
            // console.log(storage.data);
        }
      }
    },

    
    loginSubmit(ev) {
      sessionStorage.clear()
      
      // // 非内网日常测试用
      // let tempData = []
      // tempData = [
      //   {"name":"首页","path":"/index","iconCls":"fa fa-home"},
      //   {"name":"产品管理","path":"/productmanage/","iconCls":"fa fa-home","children":[{"name":"产品信息管理","path":"/productmanage/productinfomanage"}]},
      //   {"name":"产品策略管理","path":"/productstrategymanage/","iconCls":"fa fa-home","children":[{"name":"冲抵策略管理","path":"/productstrategymanage/offsetstrategymanage"}]},
      //   {"name":"产品参数管理","path":"/paramsmanage/","iconCls":"fa fa-home","children":[{"name":"产品期数管理","path":"/productparamsmanage/cpqsgl"},{"name":"还款间隔管理","path":"/productparamsmanage/hkjggl"},{"name":"费用参数管理","path":"/productparamsmanage/fycsgl"},{"name":"指标参数管理","path":"/productparamsmanage/zbcxgl"},{"name":"贴息机构管理","path":"/productparamsmanage/txjggl"}]},
      // ]
      // let this_route = tempData[0].path;
      // if(tempData[0].children){
      //   this_route = tempData[0].children[0].path;
      // }
      // this.$router.push({
      //   path: this_route
      // });
      // console.log(this_route, '---------this_route')
      // let sideroutes = JSON.stringify(tempData)
      // sessionStorage.setItem("sideRoutes", sideroutes)


      this.$refs.loginForm.validate(valid => {
        console.log('--------执行了')
        if (valid && this.msg_onSuccess) {
          let loginList = {
            loginName : this.loginForm.loginName,
            password : this.loginForm.password
          }
          api.Login(loginList).then( res => {
            console.log(res, '------------res')

              if(res.code != 200) { 
                console.log(res.code, '-------res.code') 
                return this.$message.error(res.message) 
              }

              let temp = JSON.parse(res.datas.tokens)
              console.log(temp, '-------temp')
              let tokens = temp.token_type + " " + temp.access_token;
              sessionStorage.setItem("token", tokens);
              // 获取侧栏导航数据
              api.getSideNav().then(res=> {
                if(res.code != 200) return this.$message.error(res.msg)

                let tempData = []
                
                tempData = res.data
                tempData = tempData.sort((a,b)=> {
                  return Number(a.orderNum) - Number(b.orderNum)
                })
                tempData.map(el=> {
                  if(el.children)  {
                    el.children.sort((a, b)=> {
                      return Number(a.orderNum) - Number(b.orderNum)
                    })
                  }
                })
                console.log(tempData, '------------tempData')
                let this_route = tempData[0].path;
                if(tempData[0].children){
                  this_route = tempData[0].children[0].path;
                }
                this.$router.push({
                  path: this_route
                });
                console.log(this_route, '---------this_route')
                let sideroutes = JSON.stringify(tempData)
                sessionStorage.setItem("sideRoutes", sideroutes)
              })
          })
        } else {
          this.$message.error("请点击完成验证")
        }
      })
    },

  }
};
</script>

<style lang="scss" scoped>
html body{
  width: 100%;
  height: 100%;
  margin: 0;
}


.page-login {
  width: 100%;
  height: 100%;
  min-width: 780px;
  position: relative;

  // header
  .tabView {
    position: absolute;
    width: 100%;
    height: 160px;
    background: #fff;
    position: relative;

    .grid {
      width: 692px;
      height: 56px;
      // background: #eee;
      position: absolute;
      top: 40%;
      left: 22%;
      // top: 83px;
      // left: 460px;
      // margin: 83px 0px 21px 460px;

      .grid1 {
        width: 208px;
        height: 56px;
        background: url("../assets/login/login_logo_df.png") center no-repeat;
        background-size: 100% 100%;
        background-size:cover;
        float: left;
        margin-right: 40px;
      }

      .grid2 {
        width: 210px;
        height: 48px;
        background: url("../assets/login/login_logo_cg.png") center no-repeat;
        background-size: 100% 100%;
        float: left;
        margin-top: 4px;
        margin-right: 39.5px;
      }

      .gridLine {
        width: 1px;
        height: 48px;
        background-color: #B5BAC0;
        float: left;
        margin-top: 4px;
        margin-right: 23.5px;
      }

      .grid3 {
        width: 170px;
        height: 56px;
        background: url("../assets/login/car.png") center no-repeat;
        background-size: 100% 100%;
        float: left;
      }
    }
    
  }


  // body
  .login-bgc {
    width: 100%;
    height: 760px;
    // min-width: 1200px;
    background: url("../assets/login/bg_login.png") center center no-repeat;
    background-size: 100% 100%;
    flex: 1;
    position: relative;
    margin-bottom: 160px;

    .connters-1 {
      width: 1200px;
      height: 515px;
      margin: auto;
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);

      .banxin {
        width: 1200px;
        height: 515px;
        margin: auto;
        position: relative;

        .main-content[data-v-26084dc2] {
            /* right: 10%; */
            position: absolute;
            top: 50%;
            left: 65%;
            transform: translate(-30%, -40%);
            
            .okay {
              width: 100%;
              height: 40px;
              border: 1px solid #ccc;
              margin-bottom: 20px;
              position: relative;
              // box-sizing: border-box;

              .onSubmitBtn {
                position: relative;
                display: block;
                height: 38px;
                line-height: 38px;
                width: 110px;
                margin: 0 auto;
                color: #666;
                // box-sizing: border-box;
              }

              .onSubmitBtn::before {
                content: '';
                position: absolute;
                top: 0px;
                left: -26px;
                margin: 8px 0;
                // margin-right: 16px;
                // transform: translateY(-50%);
                width: 24px;
                height: 24px;
                background: url('../assets/login/icon_yz.png');
                background-size: 100%;
              }
            }
        }

        .content-font-first {
          width: 440px;
          height: 478px;
          position: absolute;
          top: 144px;
          left: 1020px;
          background: #fff;
          border:1px solid  rgba(255, 255, 255, 0.2);
          // box-shadow: 0 8px 20px 0 #041866;
          border-radius: 8px;
          border-radius: 8px;

          .login-container {
            -moz-border-radius: 5px;
            background-clip: padding-box;
            /*margin: 30px auto;*/
            width: 390px;
            margin: 30px auto;
            padding: 0 15px;

            .login_logo_text {
              width: 360px;
              height: 100px;
              // background: #ccc;
              text-align: center;
              margin-top: -20px;

              .textP1 {
                font-size: 30px;
                color: #FF4D60;
                margin-top: 40px;
                margin-bottom: 4px;
              }
              .textP2 {
                // font-size: 30px;
                color: #666;
                height: 28px;
                width: 120px;
                margin: 0 auto;
                line-height: 28px;
                position: relative;   
                color: #666;
                font-size: 20px;   
                margin-bottom: 40px;        
              }
              .textP2::before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                width: 6px;
                height: 6px;
                background-color: #666;
                border-radius: 50%;
              }
              .textP2::after {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
                width: 6px;
                height: 6px;
                background-color: #666;
                border-radius: 50%;
              }
            }

            .el-tabs__header {
              padding: 0;
              position: relative;
              margin: 0 0 -30px;
            }

            .title {
              margin: 0px auto 20px auto;
              text-align: center;
              color: #FF4D60;
            }
            .title-content {
              opacity: 0.65;
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              color: #FF4D60;
              text-align: center;
              line-height: 18px;
              text-align: center;
            }
            .remember {
              margin: 0px 0px 35px 0px;
            }

            .numAccount::before {
              content: '';
              position: absolute;
              top: 12px;
              left: 16px;
              // margin-right: 16px;
              // transform: translateY(-50%);
              width: 16px;
              height: 16px;
              background: url('../assets/login/icon_yhm.png');
              background-size: 100%;
            }

            .numPassword::before {
              content: '';
              position: absolute;
              top: 12px;
              left: 16px;
              // margin-right: 16px;
              // transform: translateY(-50%);
              width: 16px;
              height: 16px;
              background: url('../assets/login/icon_mima.png');
              background-size: 100%;
            }
          }
        }
      }

    }
  }

}

</style>

<style  lang="scss">
.page-login {
  .el-input__inner {
    padding: 0 48px !important;
  }
}
</style>
