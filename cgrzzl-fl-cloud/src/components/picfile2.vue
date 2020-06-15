<template>
    <div class="billyxjg">
        <el-table
                ref="singleTable"
                :data="picfilelist"
                highlight-current-row
                class="filepickhight"
                style="width: 100%">
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="名称"
                    min-width="120">
            </el-table-column>

            <el-table-column
                    align="center"
                    label="文件类型"
                    min-width="120">
                <template slot-scope="scope">
                    <span>{{(scope.row.fileUrl.match(/(?=\.).+/))[0].substr(1)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="date"

                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleopen(scope.row)" type="text" size="small"
                               v-if="/jpg|gif|bmp|png|jpeg/.test(scope.row.fileUrl.split('.'[1]))">查看
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="!/jpg|gif|bmp|png|jpeg/.test(scope.row.fileUrl.split('.'[1]))">
                        <a @click='downloadsingle(scope.row)'> 下载</a>
                    </el-button>


                </template>
            </el-table-column>
        </el-table>
    </div>

</template>
<script>
    import api from "@/api/api.js";

    function openDownloadDialog(url, saveName) {

        // for ie 10 and later

        if (window.navigator.msSaveBlob) {

            try {
                window.navigator.msSaveBlob(url, saveName);
            } catch (e) {
                console.log(e);
            }
        }
        // 谷歌浏览器 创建a标签 添加download属性下载
        else {

            if (typeof url == 'object' && url instanceof Blob) {

                url = URL.createObjectURL(url); // 创建blob地址

            }
            var aLink = document.createElement('a');
            aLink.href = url;
            aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
            var event;
            if (window.MouseEvent) {
                event = new MouseEvent('click');
            } else {
                event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            aLink.dispatchEvent(event);
        }
    }


    export default {
        components: {},
        props: {
            picfilelist: {
                type: Array,
                default: []
            }

        },
        data() {
            return {
                tableData: [],


            }
        },
        created() {
            console.log(this.picfilelist, 2222)
        },
        methods: {
            downloadsingle(row) {
                api.filesdownsingle({
                    fullPath: row.fileUrl,
                }).then(res => {
                    openDownloadDialog(res, row.fileName)
                }).catch((err) => {
                })
            },
            handleopen(row) {
                window.open(api.getImgURL(row.fileUrl))
            },


        }
    };
</script>


<style lang="scss">
    .filepickhight {
        // height: 334px;
        // overflow-y: scroll;
    }
</style>
