<template>
  <div>
    <layout-main-view :breadcrumb="breadcrumblist">
      <!-- 将文件名作为最外层类名，为避免相互影响如果直接复制文件请务必更改最外层类名-->
      <div class="common-page-dataList">
        <el-tabs type="border-card" v-model="activeName" class="n-tabs">
            <p>index固定页面</p>
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
    };
  },
  created() {
  },
  mounted() {
    this.showtab = this.$route.params.state;
  },
  methods: {
    filterShowAll() {
      this.isShowAll = !this.isShowAll;
    },
    headerStyle({ row, rowIndex }) {
      return { background: "#FAFAFA" };
    },
  }
};
</script>
<style lang="scss" scoped>
</style>
