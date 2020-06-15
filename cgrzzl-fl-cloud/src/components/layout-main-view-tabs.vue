<template>
	<section class="content-container">
		<div class="bg-purple-light">
			<div class="ly-page-head">
				<div class="current-position">
					<el-breadcrumb separator="/" class="breadcrumb-inner">
						<el-breadcrumb-item v-for="item in $route.matched"  v-if="has(item,'meta.title')" :key="item.path" >
							{{ item.meta.title }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</div>
			<div  class="common-tabs-wrapper" >
				<slot />
			</div>
		</div>
	</section>
</template>

<script>
export default {
  name: "layout-main-view-tabs",
  data() {
    return {};
  },
  created() {},
  methods: {
    has(obj, path) {
      return _.has(obj, path);
    }
  }
};
</script>
<style lang="scss">
/* element-ui 面包屑样式覆盖 start */
.current-position {
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
.common-tabs-wrapper {
  .el-tabs__content {
    margin: 24px;
  }
  .el-tabs__header {
    padding: 0 24px;
    background: #fff;
  }
}
/* element-ui 面包屑样式覆盖 end */
</style>
