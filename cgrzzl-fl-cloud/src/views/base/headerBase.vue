<template>
  <div class="headerLogin">
    <div class="headerLogin_img">
      <!-- <img src="../../assets/login/login_logo-c3.png"> -->
      <img src="../../assets/CGFL.png">
    </div>
    <div class="line">1</div>
    <div class="headerLogin_tag">
      <span class="headerLogin_logout" @click="logout">退出登录</span>
      <span class="headerLogin_logout"><i class="fa fa-user-circle-o" aria-hidden="true"></i>{{ "用户你好" }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderBase",
  data() {
    return {
      title: "",
      active: "",
    };
  },
  created() {},
  methods: {
    logout() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {}).then(() => {
        _this.$router.push("/login");
        sessionStorage.clear();
      }).catch((err)=> {})
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixins.scss";
@import '~scss_vars';

.headerLogin_nav {
  float: left;
  // width: 10%;
  max-width: 20%;
  width:120px;
  height: 64px;
  font-size: 16px;
  cursor: pointer;
  color:#222222;
  font-weight: bold;
  // opacity: 0.65;
  // color: rgba(255, 255, 255, 0.7);
  text-align: center;
  line-height: 72px;
  font-family: PingFangSC-Regular;
}
.headerLogin_nav:hover {
  font-weight: bold;
 

}
.active {
  background: rgba(255,255,255,0.1);
  // background: rgb(63, 123, 240);
  font-weight: bold;
    color:$color-dominant-color;
  font-family: PingFang-SC-Bold;
   border-bottom:2px solid $color-dominant-color;
}
.headerLogin {
  position: relative;
  width: 100%;
  height: 64px;
  opacity:1;
  box-shadow: inset 0 0 0 0 #e6e6e6;
  background: #fff;

}
.line {
  position: absolute;
  top: 70px;
  width: 100%;
  height: 2px;
  background-color: #fff;
  opacity: 0.1;
}
.headerLogin_img {
  float: left;
  padding-left: 0px;
  width: 530px;
  // height: 52px;
  @include flexCtn();
  align-items: center;
  // margin: 10px 10px 0;
  img{
    width: 530px;
  }
}
.headerLogin_title {
  float: left;
  font-size: 20px;
  color: #595959;
  margin-left: 20px;
  margin-top: 15px;
}
.headerLogin_tag {
  float: right;
  // margin-top: 30px;
  // width: 30%;
}
.headerLogin_login {
  float: right;
  font-size: 14px;
  color: #333333;
  margin-right: 20px;
  margin-top: 26px;
}
.headerLogin_logout {
  float: right;
  font-size: 14px;
  color:$color-secondary;
  margin-right: 20px;
  margin-top: 26px;
  cursor: pointer;
  // color: #FF4D60;
  i {
    margin-right: 10px;
  }
}
.msgBox {
  position: relative;
  img {
    vertical-align: middle;
  }
  .msgNum {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    background-color: rgba(244, 37, 37, 0.8);
    border-radius: 50%;
    font-size: 12px;
    color: #ffffff;
    line-height: 20px;
    text-align: center;
  }
}
// .telBox {
//   cursor: default;
//   font-family: "HelveticaNeue";
//   font-size: 16px;
//   color: #fff;
//   line-height: 20px;
//   img {
//     vertical-align: middle;
//   }
//   span {
//     opacity: 0.65;
//     vertical-align: middle;
//   }
// }
</style>
