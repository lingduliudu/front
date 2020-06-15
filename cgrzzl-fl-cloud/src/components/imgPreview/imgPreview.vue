<template>
  <el-dialog
    :visible.sync="isShowImageDialog"
    @closed="clearImg"
  >
  <div class="img-box">
        <img :src="imgs" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"/>
  </div>
    <!-- <el-carousel indicator-position="outside" height="600px">
      <el-carousel-item v-for="src in imgs" :key="src">
      </el-carousel-item>
    </el-carousel> -->
  </el-dialog>
</template>
 
<script>
export default {
  name: 'ImgPreview',
  data() {
    return {
      imgs: '',
      isShowImageDialog: false
    }
  },
  methods: {
    clearImg() {
      this.imgs = null
    }
  }
}
</script>
 
<style scoped>
  .img-box {
    height: 600px;
  }
</style>