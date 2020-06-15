<template>
    <div class="content">
        <steps :stepList="stepList" :current="current"></steps>

        <section class="info-card-A" style="height: calc(100vh - 150px);">
            <div class="card-number">
                <span class="card-number-title">东风金融-创格编号:</span>
                <span class="card-number-value">{{financInfo.payableBillNo}}</span>
            </div>

            <div class="card-bd">
                <el-row>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">申请企业:</span>
                        <span class="info-value">{{financInfo.receivedCorpName}}</span>
                    </el-col>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">社会统一信用代码:</span>
                        <span class="info-value">{{financInfo.receivedCorpCreditCode}}</span>
                    </el-col>
                    <!--<el-col :span="8" class="lb_body">-->
                    <!--<span class="info-key">承诺兑付日:</span>-->
                    <!--<span class="info-value">{{moment(financInfo.promisePayTime).format('YYYY-MM-DD')}}</span>-->
                    <!--</el-col>-->
                </el-row>
                <el-row>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">开单企业:</span>
                        <span class="info-value">{{financInfo.openCorpName}}</span>
                    </el-col>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">社会统一信用代码:</span>
                        <span class="info-value">{{financInfo.openCorpCreditCode}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">东风金融-创格金额（元）:</span>
                        <span class="info-value">{{changeMoneyThousand(financInfo.payableAmount)}}</span>
                    </el-col>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">东风金融-创格金额（大写）:</span>
                        <span class="info-value">{{financInfo.remark}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">申请时间:</span>
                        <span class="info-value">{{moment(financInfo.createTime).format('YYYY-MM-DD HH:mm')}}</span>
                    </el-col>
                    <el-col :span="10" class="lb_body">
                        <span class="info-key">申请状态:</span>
                        <span class="info-value">{{financInfo.approveStatusName}}</span>
                    </el-col>
                </el-row>

                <div class="card-line"></div>
            </div>
            <div class="httotal">
                已添加合同
                <span>{{financInfo.payableBillContract.length}}</span> 笔，合同总计金额
                <span>{{changeMoneyThousand(financInfo.contractAmount)}}</span>
                元。
            </div>
            <div class="maincontin" v-for="(item,index) in financInfo.payableBillContract" :key="index">
                <!-- <div class="maincontin">  -->

                <span class="mainht">
          <span class="info-key">合同编号:</span>
          <span class="info-value">{{item.contractNo}}</span>
          <a
                  class="page-head-back downsize"
                  style="color: #FF4D60;"
                  size="small"
                  @click="downloadfn(item)"
          >一键下载</a>
        </span>
                <div class="htmsg1">
                    <el-row>
                        <el-col :span="8" class="lb_body">
                            <span class="info-key">合同编号:</span>
                            <span class="info-value">{{item.contractNo}}</span>
                        </el-col>
                        <el-col :span="8" class="lb_body">
                            <span class="info-key">合同金额:</span>
                            <span class="info-value">{{changeMoneyThousand(item.contractAmount)}}元</span>
                        </el-col>
                        <el-col :span="8" class="lb_body">
                            <span class="info-key">合同签署时间:</span>
                            <span class="info-value">{{moment(item.contractTime).format('YYYY-MM-DD')}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="card-hd sub-title" style="margin-bottom:24px">相关合同</div>
                <div class="card-bd marrimg" style="padding-left:30px;margin-top:-20px;">
                    <transition
                            name="fade"
                            v-if="item.payableBillContractList&&item.payableBillContractList.length&&item.payableBillContractList.length>0"
                    >
                        <el-row>
                            <picfile :picfilelist='item.payableBillContractList'></picfile>

                            <!-- <div style="overflow:hidden">
                              <div v-for="(items,key) in  item.payableBillContractList" :key="key" class="htleft">
                                <img
                                  :src="api.getImgURL(items.fileUrl)"
                                  alt
                                  width="100%"
                                  height="144px"
                                  preview-text="合同"
                                  :preview="'ht'+index+'-'+key"
                                  v-show="/jpg|gif|bmp|png|jpeg/.test(items.fileUrl.split('.'[1]))"
                                />
                              </div>
                            </div>
                            <div
                              v-for="(items,key) in  item.payableBillContractList"
                              :key="key"
                              class="htleft files"
                              v-show="!/jpg|gif|bmp|png|jpeg/.test(items.fileUrl.split('.'[1]))"
                            >
                              <div>
                                <a
                                            @click='downloadsingle(items)'

                                >{{items.fileName}}</a>
                                <p>
                                  <i class="fa fa-file-text-o"></i>
                                </p>
                              </div>
                            </div> -->
                        </el-row>
                    </transition>
                    <div>
                        <div>
                            共有文件:
                            <span class="numcolor">{{item.payableBillContractList.length}}</span> 个
                        </div>
                    </div>
                </div>
                <div class="card-hd sub-title">相关发票</div>
                <div class="card-bd" style="padding:24px 30px 51px 30px;">
                    <el-row>
                        <picfile :picfilelist='item.payableBillInvoiceList'></picfile>

                        <!-- <img
                          :src="api.getImgURL(items.fileUrl)"
                          alt
                          style="margin-right:1%;"
                          width="19%"
                          height="144px"
                          preview-text="发票"
                          :preview="index+'-'+key"
                          v-for="(items,key) in  item.payableBillInvoiceList"
                          :key="key"
                        /> -->
                    </el-row>
                    <div>
                        共有文件:
                        <span class="numcolor">{{item.payableBillInvoiceList.length}}</span> 个
                        <span style="margin-left:32px;">累计发票金额：</span>
                        <span class="numcolor">{{changeMoneyThousand(item.invoiceAllAmount)}}</span> 元
                    </div>
                    <div>
                        <el-table
                                :data="item.payableBillInvoiceList"
                                highlight-current-row
                                v-loading="listLoading"
                                style="width: 100%;"
                        >
                            <el-table-column type="index" width="50"></el-table-column>
                            <el-table-column prop="invoiceBuyer" label="购买方" min-width="170">
                                <template slot-scope="scope">
                                    <el-badge
                                            class="isdot"
                                            :value="scope.row.invoiceAmountChange==2?'改':''"
                                    >{{scope.row.invoiceBuyer}}
                                    </el-badge>
                                </template>
                            </el-table-column>

                            <el-table-column prop="invoiceSeller" label="销售方" min-width="170">
                                <template slot-scope="scope">
                                    <el-badge
                                            class="isdot"
                                            :value="scope.row.invoiceSellerChange==2?'改':''"
                                    >{{scope.row.invoiceSeller}}
                                    </el-badge>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceCode" label="发票代码" min-width="120">
                                <template slot-scope="scope">
                                    <el-badge
                                            class="isdot"
                                            :value="scope.row.invoiceCodeChange==2?'改':''"
                                    >{{scope.row.invoiceCode}}
                                    </el-badge>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceNo" label="发票号码" min-width="100">
                                <template slot-scope="scope">
                                    <el-badge
                                            class="isdot"
                                            :value="scope.row.invoiceNoChange==2?'改':''"
                                    >{{scope.row.invoiceNo}}
                                    </el-badge>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceOpenTime" label="开票日期" min-width="100">
                                <template slot-scope="scope">
                                    <el-badge
                                            class="isdot"
                                            :value="scope.row.invoiceOpenTimeChange==2?'改':''"
                                    >{{scope.row.invoiceOpenTime}}
                                    </el-badge>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceAmount" label="开具金额(元)" width="170" align="left">
                                <template slot-scope="scope">
                                    <el-badge
                                            class="isdot"
                                            :value="scope.row.invoiceAmountChange==2?'改':''"
                                    >{{changeMoneyThousand(scope.row.invoiceAmount)}}
                                    </el-badge>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="card-hd sub-title">其他附件</div>
                <div class="card-bd marrimg" style="padding:24px 30px 51px 30px;">
                    <!--<span class="info-key">物流类型:</span>-->
                    <el-row>
                        <transition
                                name="fade"
                                v-if="item.payableBillWuliuList&&item.payableBillWuliuList.length&&item.payableBillWuliuList.length>0"
                        >
                            <el-row>
                                <picfile :picfilelist='item.payableBillWuliuList'></picfile>

                                <!-- <div style="overflow:hidden">
                                  <div v-for="(items,key) in  item.payableBillWuliuList" :key="key" class="htleft">
                                    <img
                                      :src="api.getImgURL(items.fileUrl)"
                                      alt
                                      width="100%"
                                      height="144px"
                                      preview-text="物流文件"
                                      :preview="'wl'+index+'-'+key"
                                      v-show="/jpg|gif|bmp|png|jpeg/.test(items.fileUrl.split('.'[1]))"
                                    />
                                  </div>
                                </div>
                                <div
                                  v-for="(items,key) in  item.payableBillWuliuList"
                                  :key="key"
                                  class="htleft files"
                                  v-show="!/jpg|gif|bmp|png|jpeg/.test(items.fileUrl.split('.'[1]))"
                                >
                                  <div>
                                    <a
                                              @click='downloadsingle(items)'

                                    >{{items.fileName}}</a>
                                    <p>
                                      <i class="fa fa-file-text-o"></i>
                                    </p>
                                  </div>
                                </div> -->
                            </el-row>
                        </transition>
                    </el-row>
                    <!--<span class="info-key">银行类型:</span>-->
                    <el-row>
                        <transition
                                name="fade"
                                v-if="item.payableBillBankList&&item.payableBillBankList.length&&item.payableBillBankList.length>0"
                        >
                            <el-row>
                                <div style="overflow:hidden">
                                    <div v-for="(items,key) in  item.payableBillBankList" :key="key" class="htleft">
                                        <img
                                                :src="api.getImgURL(items.fileUrl)"
                                                alt
                                                width="100%"
                                                height="144px"
                                                preview-text="银行文件"
                                                :preview="'yh'+index+'-'+key"
                                                v-show="/jpg|gif|bmp|png|jpeg/.test(items.fileUrl.split('.'[1]))"
                                        />
                                    </div>
                                </div>
                                <div
                                        v-for="(items,key) in  item.payableBillBankList"
                                        :key="key"
                                        class="htleft files"
                                        v-show="!/jpg|gif|bmp|png|jpeg/.test(items.fileUrl.split('.'[1]))"
                                >
                                    <div>
                                        <a
                                                @click='downloadsingle(items)'

                                        >{{items.fileName}}</a>
                                        <p>
                                            <i class="fa fa-file-text-o"></i>
                                        </p>
                                    </div>
                                </div>
                            </el-row>
                        </transition>
                    </el-row>
                    <div>
                        共有文件:
                        <span
                                class="numcolor"
                        >{{item.payableBillWuliuList.length+item.payableBillBankList.length}}</span>
                        个
                    </div>
                </div>
            </div>
            <div class="card-bottom" v-if="$route.query.isshowbtn==2">
                <el-button class="card-btn" type="primary" @click="goBack">返回</el-button>
            </div>
            <div class="card-bottom" v-if="$route.query.isshowbtn!==2">
                <el-button class="card-btn" @click="openrefusediag">退回</el-button>
                <el-button class="card-btn" type="primary" @click="openagreediag">确认并开立东风金融-创格</el-button>
            </div>
            <!--<div class="card-hd" style="height: 150px;">-->

            <!--<el-row style="padding-top: 40px;">-->
            <!--<el-col :span="7" class="lb_body" :offset="7">-->
            <!--<el-button-->
            <!--style="width: 160px;height: 40px;font-size:16px;"-->
            <!--size="small"-->
            <!--@click="openrefusediag"-->
            <!--&gt;退回</el-button>-->
            <!--</el-col>-->
            <!--<el-col :span="8" class="lb_body">-->
            <!--<el-button-->
            <!--style="width: 160px;height: 40px;background: #FF4D60;color:#ffffff;font-size:16px;"-->
            <!--size="small"-->
            <!--@click="openagreediag"-->
            <!--&gt;确认并开立东风金融-创格</el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</div>-->
        </section>
        <!-- 弹窗 -->
        <el-dialog
                title="确认开立东风金融-创格"
                :visible.sync="showAddDialog"
                :close-on-click-modal="false"
                :show-close="false"
                width="1200px"
        >
            <el-form
                    :model="agreedetail"
                    label-width="120px"
                    :rules="rules"
                    ref="addform"
                    label-position="left"
            >
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="接收企业: ">
                            <span>{{agreedetail.receivedCorpName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同金额: ">
                            <span>{{$changeMoneyThousand(agreedetail.contractAmount)}}</span>元
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="资金机构: " prop="fundCorpId">
                            <el-select
                                    v-model="agreedetail.fundCorpName"
                                    placeholder="请选择资金机构"
                                    filterable
                                    @change="changefundCorpName"
                            >
                                <el-option
                                        v-for="(item,index) in zjlist"
                                        :key="index"
                                        :label="item.corpName"
                                        :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="授信编号: " prop="grantCreditId">
                            <el-select
                                    v-model="agreedetail.grantCreditNo"
                                    placeholder="请选择授信编号"
                                    @change="changesxName"
                            >
                                <el-option
                                        v-for="(item,index) in sxbhlist"
                                        :key="index"
                                        :label="item.grantCreditNo"
                                        :value="item.grantCreditId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="授信截止日期: ">
                            <span>{{agreedetail.grantCloseTime}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="可用授信额度: ">
                            <span>{{agreedetail.remainAmount|formatMoney}}元</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="资金年化利率: ">
                            <span>{{agreedetail.fundYearInterest}}%</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="东风金融-创格融资年化利率: ">
                            <span>{{agreedetail.financeYearInterest}}%</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="东风金融-创格金额: ">
                            <el-input
                                    placeholder="请输入东风金融-创格金额"
                                    v-model="agreedetail.payableAmount"
                                    @change="tocapital"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="大写: ">
                            <el-input v-model="agreedetail.remark" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="承诺兑付日: " prop="promisePayTime">
                            <el-date-picker
                                    v-model="agreedetail.promisePayTime"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="选择日期时间"
                                    :picker-options="expireTimerOptions"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div style="text-align:center" class="xytext">
                <el-checkbox v-model="checked" @change="showDialog(checked)">我已阅读并同意</el-checkbox>
                <a href="javascript:;" style="display: inline-block;margin: 0 5px;" @click="showDialog(checked,'1')">《东风金融-创格开单协议》</a>
                <a href="javascript:;" @click="showDialog(checked,'2')">《付款承诺函》</a>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddDialog=false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm('addform')" :disabled="bclick">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="拒绝原因"
                :visible.sync="showAddDialog2"
                :close-on-click-modal="false"
                :show-close="false"
                width="40%"
        >
            <el-form :model="refusedetail" label-width="100px" ref="addform">
                <el-form-item label="拒绝原因：" prop="denialReason">
                    <el-select v-model="refusedetail.denialReason" placeholder="请选择">
                        <el-option
                                v-for="item in refuselist"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" prop="content">
                    <el-input v-model="refusedetail.content" type="textarea" :rows="6" maxlength="200"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddDialog2=false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm2('addform')" :disabled="bclick">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog
                id="dialog"
                class="agreement-dialog"
                :visible.sync="agreementDialog"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :show-close='false'
                width="50%"
                center>
            <open-order v-if="fileType == '1'"></open-order>
            <promise-agreement v-if="fileType == '2'" :payInfo="payInfo"></promise-agreement>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!readDisabled" @click="hasRead()">同意</el-button>
        <el-button type="primary" v-else :disabled="readDisabled">阅读并同意 {{readCount}}秒</el-button>
      </span>
        </el-dialog>
    </div>
</template>


<script>
    import moment from "moment";
    import api from "@/api/api";
    import {baseURLImg} from "@/api/sys";
    import {changeMoneyThousand} from "@/util/common";
    import {convertCurrency, adds} from "@/util/common.js";
    import steps from "./steps.vue";
    import picfile from '@/components/picfile';
    import openOrder from '@/components/agreementList/open-order'
    import promiseAgreement from '@/components/agreementList/pormise-agreement'

    Number.prototype["adds"] = function (...arg) {
        var r1,
            r2,
            m,
            result = this;
        arg.forEach(value => {
            try {
                r1 = result.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = value.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
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
                console.log(e);
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
            steps,
            picfile,
            "open-order": openOrder,
            "promise-agreement": promiseAgreement,
        },
        data() {
            return {
                checked: false,
                agreementDialog: false,
                readDisabled: true,
                readCount: 10,
                fileType: '1',
                payInfo: {
                    receiveCompanyName: '',
                    amountMoney: '',
                    promisePayDate: '',
                    currentComapnyName: '',
                },

                rules: {
                    fundCorpId: [
                        {required: true, message: "请选择资金机构", trigger: "change"}
                    ],
                    grantCreditId: [
                        {required: true, message: "请选择授信编号", trigger: "change"}
                    ],
                    promisePayTime: [
                        {required: true, message: "请选择承诺兑付日", trigger: "change"}
                    ]
                },
                pid: "", //pid
                state: "", //是否入库
                financInfo: {
                    payableBillContract: []
                }, //基本信息
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
                    content: "",
                    payableBillId: "",
                    result: 1,
                    status: "",
                    remainAmount: "",
                    fundCorpId: "",
                    grantCreditId: "",
                    promisePayTime: ""
                },
                refusedetail: {
                    approveType: 1,
                    content: "",
                    approveNode: "",
                    denialReason: "",
                    payableBillId: "",
                    result: 2,
                    status: ""
                },
                showAddDialog: false,
                showAddDialog2: false,
                bclick: false,
                refuselist: [],
                zjlist: [],
                sxbhlist: [],
                changeMoneyThousand: changeMoneyThousand,
                convertCurrency: convertCurrency,
                financnum: {}, //担保编号
                financeFile: {},
                stepList: [
                    {
                        name: "邀请开单",
                        realName: "",
                        createTime: ""
                    },
                    {
                        name: "核心企业确认",
                        realName: "",
                        createTime: ""
                    },
                    {
                        name: "开立审核",
                        realName: "",
                        createTime: ""
                    },
                    {
                        name: "担保审核",
                        realName: "",
                        createTime: ""
                    },
                    {
                        name: "接收确认",
                        realName: "",
                        createTime: ""
                    },
                    {
                        name: "平台审核",
                        realName: "",
                        createTime: ""
                    },
                    {
                        name: "资方审核",
                        realName: "",
                        createTime: ""
                    },
                    {
                        name: "正常持有",
                        realName: "",
                        createTime: ""
                    }
                ],
                current: "",
                expireTimerOptions: this.expireTimerOptionsFun(),
            };
        },
        created() {
            this.current = 1;
            this.getGrantCreditCorpList();

            this.getrefuselist(); //获取拒绝原因


        },
        mounted() {
        },
        methods: {
            expireTimerOptionsFun() {
                let _this = this;
                return {
                    disabledDate: (time) => {
                        return time.getTime() <= new Date(new Date().toLocaleDateString()).getTime() || time.getTime() > new Date(_this.agreedetail.grantCloseTime).getTime();
                    }
                }
            },
            moment: moment,
            //返回
            goBack() {
                history.go(-1);
            },
            getreceivedCorpAck(val) {
                //获取企业确认时限
                var timer = "";
                switch (val) {
                    case "0":
                        timer = "自审批完毕24小时";
                        break;
                    case "1":
                        timer = "自审批完毕48小时";
                        break;
                    case "2":
                        timer = "自审批完毕72小时";
                        break;
                    case "3":
                        timer = "无时限";
                        break;
                }
                return timer;
            },
            //获取详情
            getInfo(param) {
                api.createfirstdetail(param).then(res => {
                    if ((res.code = "100000")) {
                        this.agreedetail = this.financInfo = res.datas.PayableBill;
                        this.financnum = res.datas.grantCredit;
                        this.financeFile = res.datas.financeFile;
                        if (res.datas.PayableBill.promisePayTime) {
                            this.agreedetail.promisePayTime = moment(
                                this.agreedetail.promisePayTime
                            ).format("YYYY-MM-DD");
                        }

                        //判断转让
                        if (this.financInfo.payableBillNo.indexOf("-") > 0) {
                            this.stepList = [
                                {
                                    name: "转让申请",
                                    realName: "",
                                    createTime: ""
                                },
                                {
                                    name: "转让审核",
                                    realName: "",
                                    createTime: ""
                                },
                                {
                                    name: "接收确认",
                                    realName: "",
                                    createTime: ""
                                },
                                {
                                    name: "正常持有",
                                    realName: "",
                                    createTime: ""
                                }
                            ];
                        }
                        //payableBillOpenType 1 正向 2 反向 3 转让
                        if (this.financInfo.payableBillOpenType == 1) {
                            //判断担保
                            if (this.financInfo.guaranteeCorpId != null) {
                                //判断是否资方审核 1 有 资方 2  无资方
                                if (this.financnum.fundCheck == 1) {
                                    this.stepList = [
                                        {
                                            name: "开立申请",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "担保审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "资方审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                } else {
                                    this.stepList = [
                                        {
                                            name: "开立申请",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "担保审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                }
                            } else {
                                if (this.financnum.fundCheck == 1) {
                                    this.stepList = [
                                        {
                                            name: "开立申请",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "资方审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                } else {
                                    this.stepList = [
                                        {
                                            name: "开立申请",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                }
                            }
                            if (this.financInfo.payableBillApproveStatus <= 20) {
                                this.current = 1;
                                console.log('1111111');

                            } else if (
                                this.financInfo.payableBillApproveStatus > 20 &&
                                this.financInfo.payableBillApproveStatus <= 25
                            ) {
                                this.current = 2;
                                console.log('2222222');

                            } else if (
                                this.financInfo.payableBillApproveStatus > 25 &&
                                this.financInfo.payableBillApproveStatus <= 31
                            ) {
                                this.current = 3;
                                console.log('33333333333');

                            } else if (
                                this.financInfo.payableBillApproveStatus > 31 &&
                                this.financInfo.payableBillApproveStatus <= 43
                            ) {
                                this.current = 4;
                            } else if (
                                this.financInfo.payableBillApproveStatus > 43 &&
                                this.financInfo.payableBillApproveStatus <= 53
                            ) {
                                this.current = 5;
                            } else {
                                this.current = 6;
                            }
                        } else if (this.financInfo.payableBillOpenType == 2) {
                            if (this.financInfo.guaranteeCorpId != null) {
                                if (this.financnum.fundCheck == 1) {
                                    this.stepList = [
                                        {
                                            name: "邀请开单",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "核心企业确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "担保审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "资方审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                } else {
                                    this.stepList = [
                                        {
                                            name: "邀请开单",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "核心企业确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "担保审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },

                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                }
                            } else {
                                if (this.financnum.fundCheck == 1) {
                                    this.stepList = [
                                        {
                                            name: "邀请开单",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "核心企业确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "资方审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                } else {
                                    this.stepList = [
                                        {
                                            name: "邀请开单",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "核心企业确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "开立审核",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "接收确认",
                                            realName: "",
                                            createTime: ""
                                        },
                                        {
                                            name: "平台审核",
                                            realName: "",
                                            createTime: ""
                                        },

                                        {
                                            name: "正常持有",
                                            realName: "",
                                            createTime: ""
                                        }
                                    ];
                                }
                            }

                            if (this.financInfo.payableBillApproveStatus <= 10) {
                                this.current = 1;
                            } else if (
                                this.financInfo.payableBillApproveStatus > 10 &&
                                this.financInfo.payableBillApproveStatus <= 20
                            ) {
                                this.current = 2;
                            } else if (
                                this.financInfo.payableBillApproveStatus > 20 &&
                                this.financInfo.payableBillApproveStatus <= 25
                            ) {
                                this.current = 3;
                            } else if (
                                this.financInfo.payableBillApproveStatus > 25 &&
                                this.financInfo.payableBillApproveStatus <= 31
                            ) {
                                this.current = 4;
                            } else if (
                                this.financInfo.payableBillApproveStatus > 31 &&
                                this.financInfo.payableBillApproveStatus <= 43
                            ) {
                                this.current = 5;
                            } else if (
                                this.financInfo.payableBillApproveStatus > 43 &&
                                this.financInfo.payableBillApproveStatus <= 53
                            ) {
                                this.current = 6;
                            } else {
                                this.current = 7;
                            }
                        } else { //转让
                            if (this.financInfo.payableBillApproveStatus < 31) {
                                this.current = 1;
                            } else if (
                                this.financInfo.payableBillApproveStatus >= 31 &&
                                this.financInfo.payableBillApproveStatus < 99
                            ) {
                                this.current = 2;
                            } else {
                                this.current = 3;
                            }
                        }

                        console.log(this.agreedetail, 7878);
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            openagreediag() {
                this.showAddDialog = true;
                this.agreedetail.content = "";
                console.log(this.agreedetail.promisePayTime);
                this.bclick = false;
            },
            getrefuselist() {
                api.getDicListByType({type: 6}).then(res => {
                    if (res.code == "100000") {
                        this.refuselist = res.datas.list;
                    }
                });
            },
            openrefusediag() {
                this.showAddDialog2 = true;
                this.refusedetail.content = "";
                this.refusedetail.denialReason = this.refuselist[0].name;
                this.bclick = false;
            },
            submitAddForm(formName) {
                if (!this.checked) {
                    this.$message.error('请阅读并同意东风金融-创格开单协议和付款承诺函')
                    return
                }
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (
                            parseFloat(this.agreedetail.payableAmount) >
                            parseFloat(this.agreedetail.contractAmount)
                        ) {
                            this.$message.error("东风金融-创格金额大于合同金额");
                            return;
                        }

                        var user = JSON.parse(sessionStorage.getItem("user"));
                        var yfdMessageDto = {
                            itemId: this.$route.query.id,
                            itemType: 1,
                            operatorAction: 1,
                            operatorType: 6,
                            phone: user.phone,


                        }


                        api.sendPhoneMessage(yfdMessageDto).then(res => {
                            if (res.success) {
                                let meessage =
                                    "提示信息：CFCA向您尾号为" +sessionStorage.getItem('account')+
                                    "的手机号码发送了验证短信。请在下方输入框中输入短信中的验证码";
                                this.$prompt(meessage, "请输入短信验证码", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消"
                                }).then(({value}) => {

                                    const loading = this.$loading({
                                        lock: true,
                                        text: "Loading",
                                        spinner: "el-icon-loading",
                                        background: "rgba(0, 0, 0, 0.7)"
                                    });
                                    if (this.bclick) {
                                        return;
                                    }
                                    // 时间转换
                                    this.agreedetail.promisePayTime = moment(
                                        this.agreedetail.promisePayTime
                                    ).format("YYYY-MM-DD");
                                    this.agreedetail.status = this.financInfo.payableBillApproveStatus;


                                    this.bclick = true;
                                    yfdMessageDto.verifyCode = value
                                    var params = Object.assign({yfdMessageDto}, this.agreedetail)

                                    api
                                        .reversePayableBillPassResult(params)
                                        .then(res => {
                                            loading.close();

                                            if (res.code == "100000") {
                                                this.$alert("审批通过，请等待开立审核", "", {
                                                    confirmButtonText: "确定",
                                                    callback: action => {
                                                        history.go(-1);
                                                    }
                                                });
                                                this.showAddDialog = false;
                                            } else {
                                                this.$message.error(res.message);
                                                this.bclick = false;
                                            }
                                        })
                                        .catch(err => {
                                            loading.close();

                                            this.bclick = false;
                                        });

                                })
                            } else {
                                this.$message.error(res.message)
                            }


                        })


                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            submitAddForm2() {


                var user = JSON.parse(sessionStorage.getItem("user"));
                var yfdMessageDto = {
                    itemId: this.$route.query.id,
                    itemType: 1,
                    operatorAction: 2,
                    operatorType: 6,
                    phone: user.phone,


                }


                api.sendPhoneMessage(yfdMessageDto).then(res => {
                    if (res.success) {

                        let meessage =
                            "提示信息：CFCA向您尾号为" +sessionStorage.getItem('account')+
                            "的手机号码发送了验证短信。请在下方输入框中输入短信中的验证码";
                        this.$prompt(meessage, "请输入短信验证码", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消"
                        }).then(({value}) => {
                            const loading = this.$loading({
                                lock: true,
                                text: "Loading",
                                spinner: "el-icon-loading",
                                background: "rgba(0, 0, 0, 0.7)"
                            });
                            if (this.bclick) {
                                return;
                            }
                            this.bclick = true;
                            this.refusedetail.payableBillId = this.financInfo.payableBillId;
                            this.refusedetail.status = this.financInfo.payableBillApproveStatus;
                            yfdMessageDto.verifyCode = value
                            var params = Object.assign({yfdMessageDto}, this.refusedetail)

                            api
                                .reversePayableBillFailResult(params)
                                .then(res => {
                                    loading.close();

                                    if (res.code == "100000") {
                                        this.showAddDialog2 = false;
                                        this.$alert("操作成功，退回重新修改", "", {
                                            confirmButtonText: "确定",
                                            callback: action => {
                                                history.go(-1);
                                            }
                                        });
                                    } else {
                                        this.$message.error(res.message);
                                        this.bclick = false;
                                    }
                                })
                                .catch(err => {
                                    loading.close();
                                    this.bclick = false;
                                });

                        })
                    } else {
                        this.$message.error(res.message)
                    }


                })


            },
            getGrantCreditCorpList() {
                //调取资金机构数据
                api.getGrantCreditCorpList().then(res => {
                    if (res.code == 100000) {
                        this.zjlist = res.datas.list;
                        this.getInfo({payableBillId: this.$route.query.id}); //获取基本信息
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            changefundCorpName(val) {
                //获取授信编号
                console.log(val);
                this.agreedetail.fundCorpName = val.corpName;
                this.agreedetail.fundCorpId = val.corpId;
                this.sxbhlist = [];
                this.agreedetail.grantCreditNo = "";
                this.agreedetail.grantCreditId = "";

                api.getGrantCreditListByCorp({fundCorpId: val.corpId}).then(res => {
                    if (res.code == 100000) {
                        this.sxbhlist = res.datas.grantCreditlist;
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            changesxName(val) {
                //获取四项值
                var item = this.sxbhlist.find(el => {
                    return el.grantCreditId == val;
                });
                console.log(val, 2, item);
                this.agreedetail.grantCreditId = item.grantCreditId;
                this.agreedetail.grantCloseTime = moment(item.closeDate).format(
                    "YYYY-MM-DD"
                );
                this.agreedetail.grantableAmount = item.availableAmount;
                this.agreedetail.fundYearInterest = item.fundYearInterest;
                this.agreedetail.financeYearInterest = item.financeYearInterest;
                this.agreedetail.grantCreditNo = item.grantCreditNo;
                this.agreedetail.remainAmount = item.remainAmount;
            },
            tocapital() {
                this.agreedetail.remark = this.convertCurrency(
                    this.agreedetail.payableAmount
                );
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
            downloadsingle(row) {
                api.filesdownsingle({
                    fullPath: row.fileUrl,
                }).then(res => {
                    openDownloadDialog(res, row.fileName)
                }).catch((err) => {
                })
            },
            // 阅读倒计时
            readCountDown() {
                this.readCount = 3;
                var readTimer = setInterval(() => {
                    this.readCount--;
                    if (this.readCount <= 0) {
                        this.readDisabled = false;
                        clearInterval(readTimer);
                    }
                }, 1000);
            },
            // 同意
            hasRead() {
                if (this.showType) {
                    if (this.showType == '1') {
                        this.showType1 = true;
                    } else if (this.showType == '2') {
                        this.showType2 = true;
                    }
                    this.agreementDialog = false;
                    this.readDisabled = true;
                    if (this.showType1 && this.showType2) {
                        this.checked = true;
                        this.$set(this.$data, 'fileType', '1')
                    }
                } else {
                    var Id = document.getElementById("dialog")
                    Id.getElementsByClassName("el-dialog")[0].scrollTop = 0
                    if (this.fileType == '1') {
                        this.$set(this.$data, 'fileType', '2')
                        this.readCountDown();
                        this.readDisabled = true;
                        this.agreementDialog = true;
                    } else if (this.fileType == '2') {
                        this.readCountDown();
                        this.agreementDialog = false;
                        this.$set(this.$data, 'fileType', '1')
                        this.checked = true;
                        this.readDisabled = false;
                    }
                }
            },
            // 弹出协议
            showDialog(isRead, type) {
                this.showType = type;
                if (type && type == '1') {
                    this.$set(this.$data, 'fileType', '1')
                    this.agreementDialog = true;
                    this.readCountDown();
                } else if (type && type == '2') {
                    this.$set(this.$data, 'fileType', '2')
                    this.agreementDialog = true;
                    this.readCountDown();
                }
                if (this.checked) {
                    this.check = false;
                    this.agreementDialog = true;
                    this.readDisabled = true;
                    this.readCountDown();
                    this.payInfo = {

                        currentComapnyName: JSON.parse(sessionStorage.getItem('corpList')).corpName,
                    }
                }
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
            border-bottom: 1px solid #e6e6e6;
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
            border: 1px solid #e6e6e6;
            margin-bottom: 20px;

            border-radius: 4px;

            .mainht {
                color: #262626;
                font-size: 16px;
                font-weight: bold;
                text-indent: 32px;
                display: inline-block;
                border-bottom: 1px solid #e6e6e6;
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

            .el-carousel__item:nth-child(2n + 1) {
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
                color: #f5212d;
            }
        }

        .el-input.is-disabled .el-input__inner {
            color: #606266;
        }
    }
</style>
