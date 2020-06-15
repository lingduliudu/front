<template>
    <!-- 这里是各种审批进入详情之后， 点击了 审批历史记录之后 弹出的弹框内容。-->
    <div class="approvalRecordDialog">
        <el-dialog title="审批记录" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
            <el-table :data="tableData" style="width: 100%" >
                <el-table-column  prop="flowNode"  label="审核节点" >
                    <template slot-scope="scope">
                            {{scope.row.flowNode | flowPointStatus}}
                    </template>
                </el-table-column>
                <el-table-column  prop="approveResult"  label="审批结果"  >
                    <template slot-scope="scope">
                            {{scope.row.approveResult | statusCheckFillter}}
                    </template>
                </el-table-column>
                <el-table-column  prop="approveReason"  label="理由"  ></el-table-column>
                <el-table-column  prop="remark"  label="备注" ></el-table-column>
                <el-table-column  prop="createTime"  label="审批日期"  >
                    <template slot-scope="scope">
                        {{scope.row.createTime ? moment(scope.row.createTime).format('YYYY-MM-DD'): ''}}
                    </template>
                </el-table-column>
                <el-table-column  prop="approveUserName"  label="审批人"  ></el-table-column>
            </el-table>




            <div class="paginationBox">
                <el-pagination
                    class="pagination"
                    @size-change="sizeChangeHandle"
                    @current-change="currentChangeHandle"
                    :current-page="page.pageIndex"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="page.pageSize"
                    :total="page.total"
                    layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>

            
            
        </el-dialog>



    </div>
</template>

<script>
import apiCloud from "@/api/apiCloud.js";

import {changeMoneyThousand} from '@/util/common'
import moment from 'moment'
export default {
    data(){
        return{
            changeMoneyThousand: changeMoneyThousand,
            moment: moment,
            resDataLoading:true,
            dialogVisible:true,
            tableData:[],

            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10 // 每页显示多少条
            },
        }
    },
    props:{
        apprpvalType:Number,
        itemId: String,
    },

    mounted() {
     
        this.getApprovalRecordList();
        console.log(this.itemId, '-------this.itemId')
    },
    methods:{
        //控制该弹框的显示以及隐藏方法。
        handleClose(){
            this.$emit("changeShowDialog")
            // this.$confirm('确认关闭？').then(_ => {
            //     this.$emit("changeShowDialog")
            // }).catch(_ => {

            // });
        },
        /** 每页条数的事件。 */
        sizeChangeHandle(val){

            this.page.pageSize = val;
            this.getApprovalRecordList();

        },
        /** 分页事件。 */
        currentChangeHandle(val){
            this.page.currentPage = val;
            this.getApprovalRecordList();
        },


        /** 获取到审批记录的列表数据内容。 */
        getApprovalRecordList(){
            
            let approvalRecordType = this.apprpvalType;
            let itemId = this.itemId;

  
            let para = {
                pageNum: this.page.currentPage,
                pageSize: this.page.pageSize,
                itemId: this.$route.query.payableBillFinanceId||this.$route.query.id,
                itemType: approvalRecordType,
            }
            this.resDataLoading = true;
            apiCloud.getApproveRecord(para).then((res)=>{
                if(res.success){
                    this.tableData = res.datas.list;
                    this.page.total = res.datas.total;
                    this.resDataLoading = false;
                }else{
                    this.$message({
                        message:res.message,
                        type:"error"
                    })
                }
            })
        },  
    }
}
</script>

<style lang="scss">
    .approvalRecordDialog {
        .el-dialog{
            width: 1200px !important;
            .el-dialog__body{
                padding: 10px 20px;
                // height: 300px;
            }
        }

        .paginationBox{
            padding: 35px;
            .pagination{
                float: right;
            }
        }
    }


    
</style>