<!-- 票据详情 -->
<template>
    <div class="bill-details">
        <div class="upload-box">
          <steps :stepList="stepList" :current="current"></steps>
            <slot></slot>
            <el-row :gutter="30">
                <el-col :span="12">
                    <div class="upload-box-item">
                        <div class="upload-box-item-header">
                            <div>
                                <span>票据正面</span>
                            </div>
                            <div>
                                <el-checkbox v-model="detailsList.hideStatus" disabled>隐藏收款人</el-checkbox>
                            </div>
                        </div>
                        <div class="upload-box-item-cont">
                            <img :src="detailsList.billFileFront" :data-img="detailsList.billFileFront" @click="$imgPreview" class="upload-img">
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="upload-box-item">
                        <div class="upload-box-item-header">
                            <div>
                                <span>票据背面</span>
                            </div>
                        </div>
                        <div class="upload-box-item-cont">
                            <img :src="detailsList.billFileBack" :data-img="detailsList.billFileBack" @click="$imgPreview" class="upload-img">
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bill-form-box">
            <div class="bill-title">票据信息</div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <span class="label">承兑人：</span>
                    <span class="value">{{detailsList.acceptor}}</span>
                </el-col>
                <el-col :span="8">
                    <span class="label">票面金额(元)：</span>
                    <span class="value">{{$changeMoneyThousand(detailsList.billAmount)}}</span>
                </el-col>
                <el-col :span="8">
                    <span class="label">大写：</span>
                    <span class="value">{{detailsList.billAmountCpt}}</span>
                </el-col>
                <el-col :span="8">
                    <span class="label">票据号码：</span>
                    <span class="value">{{detailsList.billNum}}</span>
                </el-col>
                <el-col :span="8">
                    <span class="label">到期日：</span>
                    <span class="value">{{moment(detailsList.expireTime).format('YYYY-MM-DD')}}</span>
                </el-col>
                <el-col :span="8">
                    <span class="label">背书次数：</span>
                    <span class="value">{{detailsList.endorseNum}}</span>
                </el-col>
           
                <el-col :span="8">
                    <span class="label">期望卖出价：</span>
                    <div class="value">
                        <span>{{detailsList.sellRateStr}}%</span>
                        <span class="">~</span>
                        <span>{{detailsList.sellRateEnd}}%</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <span class="label">每十万扣费：</span>
                    <div class="value">
                        <span>{{$changeMoneyThousand(detailsList.deductionStr)}}元</span>
                        <span >~</span>
                        <span>{{$changeMoneyThousand(detailsList.deductionEnd)}}元</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                     <el-col :span="24">
                    <span class="label">票据瑕疵：</span>
                  
                    <ul class="value flaw-list">
                      

                        <li v-for="(item,index) in detailsList.billFlaw" :key="index">
                            <span v-if="index === detailsList.billFlaw.length-1">{{item}}</span>
                            <span v-else>{{item}}，</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <billpricebjinfo v-show='$route.query.isshowback==1' v-on:aaa='aaa'></billpricebjinfo>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import billpricebjinfo from '@/views/bill/pjbase/billpricebjinfo' 
import steps from "@/views/base/steps.vue";
import { setTimeout } from 'timers';


    export default {
           components: {
            billpricebjinfo,
            steps
        },
        props: {
            detailsList: {
                type: Object,
                default() {
                    return {
                        hideStatus : 1, 
                        billFileFront: '',
                        billFileBack: '',
                        billFiles: '',
                        acceptor: '',
                        billAmount: '',
                        billAmountCpt: '',
                        billNum: '',
                        expireTime: '',
                        endorseNum: '',
                        billFlaw: [],
                        sellRateStr: '',
                        sellRateEnd: '',
                        deductionStr: '',
                        deductionEnd: '',
                    
                    }
                }
            }
        },
        watch:{
             detailsList: {
                    immediate: true, // 很重要！！！
                    handler (val) {
                      
                        if(this.detailsList.billId){
                             this.getcurrent()
                        }
                     
                       
                    }
            }

        },
        data() {

            return {
                     stepList: [
                                    {
                                    name: "票据发布",
                                    realName: "",
                                    createTime: ""
                                    },
                                    {
                                    name: "票据内审",
                                    realName: "",
                                    createTime: ""
                                    },
                                    {
                                    name: "平台撮合",
                                    realName: "",
                                    createTime: ""
                                    },
                                       {
                                    name: "机构报价",
                                    realName: "",
                                    createTime: ""
                                    },
                                    {
                                    name: "选择报价",
                                    realName: "",
                                    createTime: ""
                                    },
                                    {
                                    name: "等待签约",
                                    realName: "",
                                    createTime: ""
                                    },
                                     {
                                    name: "签约完成",
                                    realName: "",
                                    createTime: ""
                                    },
                                
                                    
                                ],
                            current:1,
                            pmsg:{}
            }
        },
        mounted() {
 
                // this.$nextTick(function () {
                //     setTimeout(el=>{
                //            console.log(this.detailsList,'detailsList')
                //             this.getcurrent()
                //           },300)
                        
                //     })
     
        },
        methods: {
            moment: moment,
            aaa(val){
                this.$emit('pmsg',val)
                    console.log(val,'ssd')
            },
            getcurrent(){
                
                if(this.detailsList.offlineStauts == 2){
                    this.current=-1;
                    return
                }
          
                if(this.detailsList.quoteStatus == 2){
                    this.current=7             
                //签约完成
                }else if(this.detailsList.quoteStatus == 1 && this.detailsList.offerStatus == 2){
                    this.current=5

                //等待签约
                }else if(this.detailsList.fundQuoteStatus == 2){
                    this.current=4

                //选择保价
                }else if(this.detailsList.billApproveStatus == 47){
                    this.current=3

                //机构报价
                }else if(this.detailsList.billApproveStatus > 23){
                    this.current=2
                //平台撮合
                }else if(this.detailsList.billApproveStatus <= 23){
                    this.current=1
                //票据内审
                }else if(billApproveStatus = 20){
                    this.current=1

                //发布票据
                }
                        
            }
        }
    }
</script>
<style lang="scss">
    .bill-details {
        position: relative;
        background: #fff;
        padding: 33px 25px;
        
        .upload-box {
            .el-steps--horizontal{
                        padding: 0;
                }
            margin-bottom: 20px;
            &-item {
                border: 1px solid #eee;
                background: #fff;
                &-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 36px;
                    padding: 0 20px;
                    background: #eee;
                }
                &-cont {
                    position: relative;
                    height: 300px;
                    overflow: auto;
                    .upload-img {
                        width: 100%;
                            object-fit:contain;
                            height: 100%;
                    }
                }
            }
        }
        .label {
            display: inline-block;
            width: 130px;
            height: 40px;
            line-height: 40px;
           
            margin-right: 20px;
        }
        .value {
            display: inline-block;
            height: 40px;
            line-height: 40px;
        }
        .flaw-list {
            margin: 0;
            padding: 0;
            li {
                display: inline-block;
            }
        }
        .connect-line {
            padding: 0 20px;
        }
    }
  
</style>