<template>
<div>
  <el-col :span="24" class="header">
			<el-col :span="8" class="logo logo-width" >
				<img src="../assets/11.png" style="display:inline-block;width:140px;margin-top:10px;" >
			</el-col>
			<el-col :span="4" :offset="1">
				<span style="font-size:18px">{{company}}供应链金融系统</span>
			</el-col>
			<el-col :span="10" class="userinfo">
				<div style="height:30px;line-height:30px;font-size:18px">欢迎 {{title}}</div>
				<div style="height:30px;line-height:30px;" ><span  @click="logout">退出登录</span><span>|</span> <span>修改密码</span></div>
			</el-col>
  </el-col>
</div>
</template>
<script>
export default {
  data () {
    return {
      company: '',
      title: ''
    }
  },
  mounted () {
    this.company = JSON.parse(sessionStorage.getItem('user')).type == '1' ? '供应商' : '核心企业'
    this.title = JSON.parse(sessionStorage.getItem('user')).name || ''
  },
  methods: {
    logout () {
      this.$emit('logout', '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss_vars';
.header {
  height: 60px;
  line-height: 60px;
  background: $color-primary;
  color:#fff;
  margin-bottom: 40px;
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    span{
      padding-right: 30px;
      cursor: pointer;
    }
    .userinfo-inner {
      cursor: pointer;
      color:#fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        float: right;
      }
    }
  }
  .logo {
    height:60px;
    font-size: 22px;
    padding-left:20px;
    padding-right:20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
    img {
      width: auto;
      float: left;
    }
    .txt {
      color:#fff;
    }
  }
  .logo-width{
    width:230px;
  }
  .logo-collapse-width{
    width:60px
  }
  .tools{
    padding: 0px 23px;
    width:14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }
}
</style>

