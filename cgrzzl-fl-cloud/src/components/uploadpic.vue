<!--银行账户-->
<template>
  <div class="uploadcmp">

                   <el-upload
                          ref="paiimg"
                          class="upload-demo upload-contentr"
                          :action="baseURL+'/finance-file/fast/file/upload'"
                          :on-success="(a,b,c)=>dragupfn(a,b,c,filesType)"
                          :on-remove="(a,b)=>dragremovefn(a,b,filesType)"
                          :headers="Authorization"
                    
                          :file-list="filesType.filelist"
                          accept="image/png, image/jpeg"
                          :before-upload="beforeupfnfile"
                          drag
                          list-type="picture"
                        >
                          <i class="el-icon-plus"></i>
                          <div class="el-upload__text">上传图片</div>
                        </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>

  </div>
</template>
<script>

import { baseURL } from "@/api/sys";
    export default {
          props: {
            filesType: {
                type: Object,
                default:()=>{
                    return {
                        filelist:[],
                        imageList:[],

                    }

                }
            },
            
        },
        data() {
            return {
       
        baseURL,
              Authorization: { "Finance-Auth": sessionStorage.token },

        dialogImageUrl:"",
        dialogVisible:false




            };
        },
        created() {

        },
        watch: {
 
        },

        methods: {
              dragupfn(response, file, fileList, item, index) {
                //上传的合同
                console.log(item)
                if (response.code == "100000") {
                    var data = response.datas.fileModel;
                    item.filelist.push(file);
                    item.imageList.push({
                    fileCode: 14,
                    fileUrl: data.fullPath,
                    uid: file.uid,
                    fileName: file.name
                    });
                } else {
                    item.filelist = item.filelist;
                    this.$forceUpdate();
                    this.$message.error(file.name + "图片识别错误，请重新上传");
                }
                },
                dragremovefn(file, fileList, item, index) {
                //移除合同
                if (item.imageList.findIndex(el => el.uid == file.uid) != -1) {
                    item.imageList.splice(
                    item.imageList.findIndex(el => el.uid == file.uid),
                    1
                    );
                    item.filelist.splice(
                    item.filelist.findIndex(el => el.uid == file.uid),
                    1
                    );
                }
                },
                  beforeupfnfile(file) {
                    let index = file.name.lastIndexOf(".");
                    let suffix = file.name.substr(index + 1);
                    if (!/jpg|png|jpeg/.test(suffix)) {
                        this.$message.error("请上传png,jpg,jpeg格式的图片");
                        return false;
                    }
                    },
      
        
    
        }
    };
</script>
<style lang="scss" >
.uploadcmp{
   display: inline-block;
   vertical-align: top;
    .el-upload-dragger{
        width: 300px;
        height: 92px;
        padding-top: 14px;
    }
     .el-upload-list__item{
        width: 20%;
    }
}

</style>
