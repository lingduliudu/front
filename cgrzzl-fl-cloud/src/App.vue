<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types";
import toPath from "./util/toPath";
export default {
  name: "app",
  data() {
    return {
      isTitle: false,
      isUse: "/login"
    };
  },
  watch: {
    $route(to, from) {
      this.isUse = to.path;
    }
  },
  created() {
    // this.getDics()
    console.log(this.$route.meta.keepAlive, "$route.meta.keepAlive");
    if (toPath(this.$route.path) === 2) {
      this.isTitle = true;
    } else {
      this.isTitle = false;
    }
    this.getUserInfoFromLocal();
  },
  mounted() {},
  methods: {
    //获取所有的字典
    getDics() {
      var dict = sessionStorage.getItem("dict");
      if (dict && dict != "null" && dict != "undefined") {
        dict = JSON.parse(dict);
        this.$store.commit(types.UPDATE_dict, dict);
      } else {
        this.$store.dispatch(types.GET_dict);
      }
    },
    getUserInfoFromLocal() {
      let userInfo = sessionStorage.getItem("user");
      userInfo =
        _.trim(userInfo) && userInfo != "undefined" && userInfo != "null"
          ? JSON.parse(userInfo)
          : {};
      this.$store.commit(types.UPDATE_userInfo, userInfo);
    }
  }
};
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
