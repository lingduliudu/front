<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="fileUpload()"
      :headers="headd"
      :data="fileType"
      :on-success="uploadSuccess"
      :on-remove="uploadRemove"
      :before-upload="beforeUpload"
      name="file"
      :show-file-list='false'
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary" :disabled="processing">上传</el-button>
    </el-upload>
  </div>
</template>
<script>
import upload from '../api/upload.js'
export default {
  props: {
    filesType: {}
  },
  data () {
    return {
      uploadTip:'点击上传',
      fileType: this.filesType,
      processing: false,
      fileList: [],
      headd:{
        // Authorization: JSON.parse(sessionStorage.getItem('token'))
        Authorization:sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    beforeUpload(file){
       console.log('childen-fileType ==>',this.fileType)
      this.$emit('beforeUpload', file, this.fileType)
    },
    uploadSuccess(response,file,fileList){
      this.$emit('uploadSuccess', response, file, fileList)
    },
    uploadRemove(file, fileList) {
      this.$emit('uploadRemove', file, fileList)
    },
    fileUpload (){
      return upload.uploadFile()
    }
  }
}
</script>

