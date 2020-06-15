<template>
    <div class="content">
        <el-tabs v-model="activetab">
            <el-tab-pane label="东风金融-创格详情" name="first">
                <div class="card-hd infotitle">
                    东风金融-创格接收确认
                    <el-button class="page-head-back" size="small" @click="goBack">返回</el-button>
                </div>
                <section class="info-card-A">
                    <div class="card-hd sub-title">
                        <span class="txbst">基本信息</span>
                        <el-button class="page-head-back" style="color: #FF4D60;" size="small" @click="preview">预览
                        </el-button>
                    </div>
                    <div class="card-bd">
                        <el-row>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">资金机构:</span>
                                <span class="info-value">{{financInfo.fundCorpName}}</span>
                            </el-col>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">融资年化利率:</span>
                                <span class="info-value">{{financInfo.financeYearInterest}}%</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">转让企业全称:</span>
                                <span class="info-value">{{financInfo.openCorpName}}</span>
                            </el-col>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">社会统一信用代码:</span>
                                <span class="info-value">
              {{financInfo.receivedCorpCreditCode}}
            </span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">承诺兑付日:</span>
                                <span class="info-value">{{moment(financInfo.promisePayTime).format('YYYY-MM-DD')}}</span>
                            </el-col>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">东风金融-创格金额:</span>
                                <span class="info-value">{{financInfo.payableAmount}}元</span>
                            </el-col>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">大写:</span>
                                <span class="info-value">{{financInfo.remark}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8" class="lb_body">
                                <span class="info-key">付款承诺函:</span>
                                <span class="info-value pdfpreviewc"
                                      @click="pdfpreview">{{financInfo.promisePayNo}}</span>
                            </el-col>
                        </el-row>
                        <div class="card-line"></div>
                    </div>
                    <div class="httotal">
                        已添加合同 <span>{{financInfo.payableBillContract.length}}</span> 笔，合同总计金额 <span>{{financInfo.contractAmount}}</span>
                        元。
                    </div>
                    <div class="maincontin" v-for="(item,index) in financInfo.payableBillContract" :key="index">
                        <!-- <div class="maincontin">  -->
                        <span class="mainht">    <span class="info-key">合同编号:</span>
            <span class="info-value">{{item.contractNo}}</span><a class="page-head-back downsize"
                                                                  style="color: #FF4D60;" size="small"
                                                                  @click="downloadfn(item)">一键下载</a></span>
                        <div class="card-hd sub-title">
                            相关合同
                        </div>
                        <div class="htmsg">
                            <el-row>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">合同编号:</span>
                                    <span class="info-value">{{item.contractNo}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">合同金额:</span>
                                    <span class="info-value">{{item.contractAmount}}元</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">合同签署时间:</span>
                                    <span class="info-value">{{moment(item.contractTime).format('YYYY-MM-DD')}}</span>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="card-bd marrimg">
                            <el-row>
                                <img :src="api.getImgURL(items.fileUrl)" alt="" width="19%" height="144px"
                                     preview-text="合同" :preview="index+'0'"
                                     v-for="(items,key) in  item.payableBillContractList" :key="key">
                            </el-row>
                            <div>
                                <div>
                                    共有文件: <span class="numcolor">{{item.payableBillContractList.length}}</span> 个
                                </div>
                            </div>
                            <div class="card-line"></div>
                        </div>
                        <div class="card-hd sub-title">
                            相关发票
                        </div>
                        <div class="card-bd marrimg" style="padding-bottom: 51px;">
                            <el-row>
                                <img :src="api.getImgURL(items.fileUrl)" alt="" width="20%" height="144px"
                                     preview-text="发票" :preview="index+'2'"
                                     v-for="(items,key) in  item.payableBillInvoiceList" :key="key">
                            </el-row>
                            <div>
                                共有文件: <span class="numcolor">{{item.payableBillInvoiceList.length}}</span> 个 <span
                                    style="margin-left:32px;">累计发票金额：</span><span class="numcolor">{{item.invoiceAllAmount}}</span>
                                元
                            </div>
                            <div>
                                <el-table
                                        :data="item.payableBillInvoiceList"
                                        highlight-current-row
                                        v-loading="listLoading"
                                        style="width: 100%;"
                                >
                                    <el-table-column
                                            type="index"
                                            width="50">
                                    </el-table-column>
                                    <el-table-column prop="invoiceBuyer" label="购买方" min-width="170">
                                        <template slot-scope="scope">
                                            <el-badge class="isdot" :value="scope.row.invoiceBuyerChange==2?'改':''">
                                                {{scope.row.invoiceBuyer}}
                                            </el-badge>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="invoiceSeller" label="销售方" min-width="170">
                                        <template slot-scope="scope">
                                            <el-badge class="isdot" :value="scope.row.invoiceSellerChange==2?'改':''">
                                                {{scope.row.invoiceSeller}}
                                            </el-badge>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="invoiceCode" label="发票代码" min-width="120">
                                        <template slot-scope="scope">
                                            <el-badge class="isdot" :value="scope.row.invoiceCodeChange==2?'改':''">
                                                {{scope.row.invoiceCode}}
                                            </el-badge>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="invoiceNo" label="发票号码" min-width="100">
                                        <template slot-scope="scope">
                                            <el-badge class="isdot" :value="scope.row.invoiceNoChange==2?'改':''">
                                                {{scope.row.invoiceNo}}
                                            </el-badge>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="invoiceOpenTime" label="开票日期" min-width="170">
                                        <template slot-scope="scope">
                                            <el-badge class="isdot" :value="scope.row.invoiceOpenTimeChange==2?'改':''">
                                                {{scope.row.invoiceOpenTime}}
                                            </el-badge>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="invoiceAmount" label="开具金额(元)" width="100" align="left">
                                        <template slot-scope="scope">
                                            <el-badge class="isdot" :value="scope.row.invoiceAmountChange==2?'改':''">
                                                {{scope.row.invoiceAmount}}
                                            </el-badge>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="card-hd sub-title">
                            其他附件
                        </div>
                        <div class="card-bd marrimg" style="padding-bottom: 51px;">
                            <span class="info-key">物流类型:</span>
                            <el-row>
                                <img :src="api.getImgURL(items.fileUrl)" alt="" width="19%" height="144px"
                                     preview-text="其他附件" :preview="index"
                                     v-for="(items,key) in  item.payableBillWuliuList" :key="key">
                            </el-row>
                            <span class="info-key">银行类型:</span>
                            <el-row>
                                <img :src="api.getImgURL(items.fileUrl)" alt="" width="19%" height="144px"
                                     preview-text="其他附件" :preview="index"
                                     v-for="(items,key) in  item.payableBillBankList" :key="key">
                            </el-row>
                            <div>
                                共有文件: <span class="numcolor">{{item.payableBillWuliuList.length+item.payableBillBankList.length}}</span>
                                个
                            </div>
                        </div>
                    </div>
                    <div class="card-hd" style="height: 150px;" v-if="$route.query.isshowbtn==1">
                        <el-row style="padding-top: 40px;">
                            <el-col :span="7" class="lb_body" :offset="7">
                                <el-button style="width: 160px;height: 40px;font-size:16px;" size="small"
                                           @click="openrefusediag">退回
                                </el-button>
                            </el-col>
                            <el-col :span="8" class="lb_body">
                                <el-button
                                        style="width: 160px;height: 40px;background: #FF4D60;color:#ffffff;font-size:16px;"
                                        size="small" @click="openagreediag">同意
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="card-hd" style="height: 150px;" v-if="$route.query.isshowbtn==2">
                        <el-row style="padding-top: 40px;">
                            <el-col :span='7' class="lb_body" :offset="10">
                                <el-button
                                        style="width: 160px;height: 40px;font-size:16px;background: #FF4D60;color:#ffffff;"
                                        size="small" @click="goBack">返回
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </section>
            </el-tab-pane>
            <el-tab-pane label="流转详情" name="second">
                <div class="text-center">
                    <vue2-org-tree name="test"
                                   :data="lzdata"
                                   :horizontal="horizontal"
                                   :collapsable="collapsable"
                                   :render-content="renderContent"
                                   labelWidth='320px'
                                   labelClassName="label-box"
                    />
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 弹窗 -->
        <el-dialog title='审核意见' :visible.sync="showAddDialog" :close-on-click-modal="false" :show-close='false'
                   width='40%'>
            <el-form :model="agreedetail" label-width="60px" ref="addform">
                <el-form-item label="备注：" prop="content">
                    <el-input v-model="agreedetail.content" type="textarea" :rows="6" maxlength="200">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddDialog=false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm" :disabled="bclick">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title='拒绝原因' :visible.sync="showAddDialog2" :close-on-click-modal="false" :show-close='false'
                   width='40%'>
            <el-form :model="refusedetail" label-width="100px" ref="addform">
                <el-form-item label="拒绝原因：" prop="denialReason">
                    <el-select v-model="refusedetail.denialReason" placeholder="请选择">
                        <el-option
                                v-for="item in refuselist"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" prop="content">
                    <el-input v-model="refusedetail.content" type="textarea" :rows="6" maxlength="200">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddDialog2=false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm2('addform')" :disabled="bclick">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="centerDialogVisible" width="80%" center>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <pdf class="pdf" ref="pdf" :src="src"></pdf>
            <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    import moment from "moment";
    import api from "@/api/api";
    import {baseURLImg} from '@/api/sys'
    import {changeMoneyThousand} from '@/util/common'
    import pdf from "vue-pdf";
    import picfile from '@/components/picfile';
    Number.prototype['adds'] = function (...arg) {
        var r1, r2, m, result = this;
        arg.forEach(value => {
            try {
                r1 = result.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = value.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2));
            result = Math.round(result * m + value * m) / m;
        });
        return result;
    };
    function openDownloadDialog(url, saveName) {
        // for ie 10 and later
        if (window.navigator.msSaveBlob) {
            try {
                window.navigator.msSaveBlob(url, saveName);
            } catch (e) {
            }
        }
        // 谷歌浏览器 创建a标签 添加download属性下载
        else {
            if (typeof url == "object" && url instanceof Blob) {
                url = URL.createObjectURL(url); // 创建blob地址
            }
            var aLink = document.createElement("a");
            aLink.href = url;
            aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
            var event;
            if (window.MouseEvent) {
                event = new MouseEvent("click");
            } else {
                event = document.createEvent("MouseEvents");
                event.initMouseEvent(
                    "click",
                    true,
                    false,
                    window,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    false,
                    false,
                    0,
                    null
                );
            }
            aLink.dispatchEvent(event);
        }
    }
    export default {
        components: {
            pdf,
            picfile
        },
        data() {
            return {
                activetab: 'first',
                pid: "", //pid
                state: "", //是否入库
                financInfo: {}, //基本信息
                isShowAll: false,
                isHedden: false,
                filterList: [],
                activeName: "1",
                total: 0,
                listLoading: false,
                listData: [],
                baseURLImg: baseURLImg,
                api: api,
                agreedetail: {
                    approveType: 1,
                    content: '',
                    payableBillId: '',
                    result: 1,
                    status: ''
                },
                refusedetail: {
                    approveType: 1,
                    content: '',
                    denialReason: '',
                    payableBillId: '',
                    result: 2,
                    status: ''
                },
                showAddDialog: false,
                showAddDialog2: false,
                bclick: false,
                refuselist: [],
                lzdata: {},
                horizontal: false,
                collapsable: false,
                expandAll: false,
                centerDialogVisible: false,
                src: '',
                financeFile: {}
            };
        },
        created() {
            this.getInfo({payableBillId: this.$route.query.id}); //获取基本信息
            this.getrefuselist()    //获取拒绝原因
        },
        mounted() {
        },
        methods: {
            moment: moment,
            //返回
            goBack() {
                //   this.$router.push({name:'开立审批'})
                window.history.go(-1);
            },
            pdfpreview() {
                // window.open(api.filesdownsingle(this.financeFile.fileUrl))
                this.downloadsingle({fileUrl: this.financeFile.fileUrl})
            },
            getreceivedCorpAck(val) {   //获取企业确认时限
                var timer = ''
                switch (val) {
                    case '0':
                        timer = '自审批完毕24小时'
                        break;
                    case '1':
                        timer = '自审批完毕48小时'
                        break;
                    case '2':
                        timer = '自审批完毕72小时'
                        break;
                    case '3':
                        timer = '无时限'
                        break;
                }
                return timer
            },
            //获取详情
            getInfo(param) {
                api.createfirstdetail(param).then(res => {
                    if (res.code = '100000') {
                        this.financInfo = res.datas.PayableBill
                        this.financeFile = res.datas.financeFile
                    } else {
                        this.$message.error(res.message)
                    }
                });
            },
            openagreediag() {
                this.showAddDialog = true
                this.agreedetail.content = ''
                this.bclick = false
            },
            getrefuselist() {
                api.getDicListByType({type: 6}).then(res => {
                    if (res.code == '100000') {
                        this.refuselist = res.datas.list
                    }
                })
            },
            openrefusediag() {
                this.showAddDialog2 = true;
                this.refusedetail.content = ''
                this.refusedetail.denialReason = this.refuselist[0].name
                this.bclick = false
            },
            submitAddForm() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                if (this.bclick) {
                    return
                }
                this.bclick = true
                this.agreedetail.payableBillId = this.financInfo.payableBillId
                this.agreedetail.status = this.financInfo.payableBillApproveStatus
                api.submitPayableBillResult(this.agreedetail).then(res => {
                    loading.close()
                    if (res.code == '100000') {
                        this.showAddDialog = false
                        this.$alert('操作成功', '', {
                            confirmButtonText: '确定',
                            callback: action => {
                                history.go(-1);
                            }
                        });
                    } else {
                        this.$message.error(res.message)
                        this.bclick = false
                    }
                }).catch((err) => {
                    loading.close()
                    this.bclick = false
                })
            },
            submitAddForm2() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                if (this.bclick) {
                    return
                }
                this.bclick = true
                this.refusedetail.payableBillId = this.financInfo.payableBillId
                this.refusedetail.status = this.financInfo.payableBillApproveStatus
                api.submitPayableBillResult(this.refusedetail).then(res => {
                    loading.close()
                    if (res.code == '100000') {
                        this.showAddDialog2 = false
                        this.$alert('操作成功，退回重新修改', '', {
                            confirmButtonText: '确定',
                            callback: action => {
                                history.go(-1);
                            }
                        });
                    } else {
                        this.$message.error(res.message)
                        this.bclick = false
                    }
                }).catch((err) => {
                    loading.close()
                    this.bclick = false
                })
            },
            circulation() {
                api.circulation({payableBillId: this.$route.query.id}).then(res => {
                    if (res.code == '100000') {
                        this.lzdata = res.datas.payableBillDetail[0];
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch((err) => {
                })
            },
            renderContent(h, data) {
                //    if(!data.hild){
                //            let currentData = ''
                //             if(this.$route.query.id == data.payableBillId) {
                //             currentData = "flow-style active"
                //             } else {
                //             currentData = "flow-style"
                //             }
                //             let content = [h('div', {},'东风金融-创格编号:'+data.payableBillNo), h('div', {}, '原始开立方:' + data.originalName),data.openCorpName?h('div', {}, '转让方:' + data.openCorpName):'', h('div', {}, '持有方:' + data.receiveName),h('div', {}, '金额：' + changeMoneyThousand(data.payableBillAmount) + ' 元'), h('div', {}, '承诺兑付日：' + (data.paymentDate ? moment(data.paymentDate).format('YYYY-MM-DD'): ''))]
                //             return h('div', { domProps:{className: currentData} }, content)
                //    }else{
                //             return  '多次流转'
                //    }
                let currentData = ''
                if (this.$route.query.id == data.payableBillId) {
                    currentData = "flow-style active"
                } else {
                    currentData = "flow-style"
                }
                let content = [h('div', {}, '东风金融-创格编号:' + data.payableBillNo), h('div', {}, '原始开立方:' + data.originalName), data.openCorpName ? h('div', {}, '转让方:' + data.openCorpName) : '', h('div', {}, '持有方:' + data.receiveName), h('div', {}, '金额：' + changeMoneyThousand(data.payableBillAmount) + ' 元'), h('div', {}, '承诺兑付日：' + (data.paymentDate ? moment(data.paymentDate).format('YYYY-MM-DD') : ''))]
                return h('div', {domProps: {className: currentData}}, content)
            },
            preview(row) {
                this.row = row;
                api.DownloadContract({contractNo: this.financInfo.contractNo}).then(res => {
                    var binaryData = [];
                    binaryData.push(res);
                    this.src = window.URL.createObjectURL(
                        new Blob(binaryData, {type: "application/zip"})
                    );
                    this.centerDialogVisible = true;
                });
            },
            downloadfn(item) {
                api.htwjdownLoadFile({
                    payableBillId: item.payableBillId,
                    payableBillContractId: item.payableBillContractId,
                    fileName: item.contractNo
                }).then(res => {
                    openDownloadDialog(res, item.contractNo + '.zip')
                }).catch((err) => {
                })
            },
        }
    };
</script>
<style lang='scss'>
    @import "../../styles/moreDetail/moudleDetail.scss";
    .content {
        width: 100%;
        height: 100%;
        background-color: white;
        .infotitle {
            color: #262626;
            font-size: 16px;
            font-weight: bold;
            text-indent: 32px;
            display: inline-block;
            border-bottom: 1px solid #E6E6E6;
            width: 100%;
            height: 60px;
            line-height: 60px;
        }
        .info-card-A {
            padding: 0 32px;
        }
        .page-head-back {
            float: right;
            margin-right: 40px;
            margin-top: 16px;
            &.downsize {
                margin-top: 0;
                font-weight: normal;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .sub-title {
            border-bottom: none;
            height: 40px;
            font-size: 16px;
            color: #262626;
            padding: 0;
            .txbst {
                position: relative;
                left: 0;;
            }
        }
        .card-line {
            height: 20px;
            border-bottom: 1px #e6e6e6 solid;
        }
        //  重写开始
        .swiper-container {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }
        .maincontin {
            .marrimg {
                img {
                    margin-right: 1%;
                }
            }
            border: 1px solid #E6E6E6;
            margin-bottom: 20px;
            border-radius: 4px;
            .mainht {
                color: #262626;
                font-size: 16px;
                font-weight: bold;
                text-indent: 32px;
                display: inline-block;
                border-bottom: 1px solid #E6E6E6;
                width: 100%;
                height: 60px;
                line-height: 60px;
            }
            .htmsg {
                margin: 10px 0 10px 32px;
            }
            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 200px;
                margin: 0;
            }
            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }
            .el-carousel__item:nth-child(2n+1) {
                background-color: #d3dce6;
            }
            .isdot {
                .el-badge__content.is-fixed {
                    top: 10px;
                    right: 0px;
                }
                .el-badge__content {
                    background-color: #cfcfcf;
                }
            }
            .numcolor {
                font-size: 18px;
                color: #F5212D;
            }
        }
    }
</style>
