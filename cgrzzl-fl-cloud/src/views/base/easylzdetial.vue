<template>
    <div class="content easypay-manager">
        <div class="content-inner">
            <el-tabs v-model="activetab">
                <el-tab-pane label="东风金融-创格详情" name="first">
                    <steps :stepList="stepList" :current="current"></steps>
                    <section class="info-card-A">
                        <div class="card-number">
                            <span class="card-number-title">东风金融-创格编号:</span>
                            <span class="card-number-value">{{financInfo.payableBillNo}}</span>
                            <el-button
                                    class="card-number-btn"
                                    type="primary"
                                    size="small"
                                    icon="el-icon-zoom-in"
                                    @click="preview"
                            >预览
                            </el-button>
                        </div>
                        <div class="card-hd sub-title">
                            <span class="txbst">基本信息</span>
                            <!-- <el-button
                              type="text"
                              class="page-head-back"
                              style="color: rgba(227, 1, 32, 1);"
                              size="small"
                              @click="goBack"
                            >预览</el-button>-->
                        </div>
                        <div class="card-bd card-bd-row">
                            <el-row>
                                <!-- <el-col :span="8" class="lb_body">
                                  <span class="info-key">东风金融-创格编号:</span>
                                  <span class="info-value index">{{financInfo.payableBillNo}}</span>
                                </el-col>-->
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">开单企业:</span>
                                    <span class="info-value">{{financInfo.openCorpName}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">接收企业:</span>
                                    <span class="info-value">{{financInfo.receivedCorpName}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">东风金融-创格金额（元）:</span>
                                    <span class="info-value">{{changeMoneyThousand(financInfo.payableAmount)}}</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">开立日:</span>
                                    <span class="info-value">{{moment(financInfo.createTime).format('YYYY-MM-DD')}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">承诺兑付日:</span>
                                    <span
                                            class="info-value"
                                    >{{moment(financInfo.promisePayTime).format('YYYY-MM-DD')}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">资金机构:</span>
                                    <span class="info-value">{{financInfo.fundCorpName}}</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">融资年化利率:</span>
                                    <span class="info-value">{{financInfo.financeYearInterest}}％</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">授信编号:</span>
                                    <span class="info-value">{{financInfo.grantCreditNo}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">资金年化利率:</span>
                                    <span class="info-value">{{financInfo.fundYearInterest}}％</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">授信起始日:</span>
                                    <span class="info-value">{{moment(financnum.effectiveTime).format('YYYY-MM-DD')}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">授信到期日:</span>
                                    <span class="info-value">{{moment(financnum.closeDate).format('YYYY-MM-DD')}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">担保方:</span>
                                    <span class="info-value">{{financnum.guaranteeCorpName}}</span>
                                </el-col>
                            </el-row>
                            <el-row v-if="$route.query.isguantee==1">
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">授信担保编号:</span>
                                    <span class="info-value">{{financnum.guaranteeCode}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">业务担保编号:</span>
                                    <span class="info-value">{{financnum.payableGuaranteeCode}}</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="lb_body">
                                    <span class="info-key">付款承诺函:</span>
                                    <span
                                            class="info-value pdfpreviewc"
                                            @click="pdfpreview"
                                    >{{financInfo.promisePayNo}}</span>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="card-hd sub-title">
                            <span class="txbst">合同信息</span>
                        </div>
                        <div class="httotal" style="margin-top:20px;">
                            已添加合同
                            <span>{{financInfo.payableBillContract&&financInfo.payableBillContract.length}}</span>
                            笔，合同总计金额
                            <span>{{changeMoneyThousand(financInfo.contractAmount)}}</span> 元。
                        </div>
                        <div
                                class="maincontin"
                                v-for="(item,index) in financInfo.payableBillContract"
                                :key="index"
                        >
                            <div :class="{'collapse-active': item.isCollapse}">
                <span class="mainht">
                  <i
                          aria-hidden="true"
                          :class="item.isCollapse ? 'fa fa-plus-circle' : 'fa fa-minus-circle'"
                          @click="item.isCollapse = !item.isCollapse"
                  ></i>
                  <span class="info-key">合同编号:</span>
                  <span class="info-value">{{item.contractNo}}</span>
                  <a
                          class="page-head-back downsize"
                          size="small"
                          @click="downloadfn(item)"
                  >
                    <i class="el-icon-download"></i>
                    <span>一键下载</span>
                  </a>
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
                                <div class="card-bd marrimg" style="padding:24px 30px 51px 30px;">
                                    <el-row>
                                        <!-- <img
                                          :src="api.getImgURL(items.fileUrl)"
                                          alt
                                          style="margin-right:1%;"
                                          width="15%"
                                          height="100px"
                                          preview-text="发票"
                                          :preview="index+'2'"
                                          v-for="(items,key) in  item.payableBillInvoiceList"
                                          :key="key"
                                        /> -->
                                        <picfile :picfilelist='item.payableBillInvoiceList'></picfile>
                                    </el-row>
                                    <div style="padding: 0px 0px 30px 0px ;">
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
                                            <el-table-column type="index" label="序号" width="80"></el-table-column>
                                            <el-table-column prop="invoiceBuyer" label="购买方" min-width="200">
                                                <template slot-scope="scope">
                                                    <el-badge
                                                            class="isdot"
                                                            :value="scope.row.invoiceBuyerChange==2?'改':''"
                                                    >{{scope.row.invoiceBuyer}}
                                                    </el-badge>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="invoiceSeller" label="销售方" min-width="200">
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
                                            <el-table-column prop="invoiceNo" label="发票号码" min-width="120">
                                                <template slot-scope="scope">
                                                    <el-badge
                                                            class="isdot"
                                                            :value="scope.row.invoiceNoChange==2?'改':''"
                                                    >{{scope.row.invoiceNo}}
                                                    </el-badge>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="invoiceOpenTime" label="开票日期" min-width="120">
                                                <template slot-scope="scope">
                                                    <el-badge
                                                            class="isdot"
                                                            :value="scope.row.invoiceOpenTimeChange==2?'改':''"
                                                    >{{scope.row.invoiceOpenTime}}
                                                    </el-badge>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="invoiceAmount"
                                                    label="开具金额(元)"
                                                    width="200"
                                                    align="left"
                                            >
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
                                <div class="card-bd marrimg" style="padding-bottom: 51px;padding-left:30px;">
                                    <!--<span class="info-key">物流类型:</span>-->
                                    <el-row>
                                        <transition
                                                name="fade"
                                                v-if="item.payableBillWuliuList&&item.payableBillWuliuList.length&&item.payableBillWuliuList.length>0"
                                        >
                                            <el-row>
                                                <div style="overflow:hidden">
                                                    <picfile :picfilelist='item.payableBillWuliuList'></picfile>
                                                    <!-- <div
                                                      v-for="(items,key) in  item.payableBillWuliuList"
                                                      :key="key"
                                                      class="htleft"
                                                    >
                                                      <img
                                                        :src="api.getImgURL(items.fileUrl)"
                                                        alt
                                                        width="100%"
                                                        height="100px"
                                                        preview-text="物流文件"
                                                        :preview="'wl'+index+'-'+key"
                                                        v-show="/jpg|gif|bmp|png|jpeg/.test(items.fileName.split('.'[1]))"
                                                      />
                                                    </div> -->
                                                </div>
                                                <!-- <div
                                                  v-for="(items,key) in  item.payableBillWuliuList"
                                                  :key="key"
                                                  class="htleft files"
                                                  v-show="!/jpg|gif|bmp|png|jpeg/.test(items.fileName.split('.'[1]))"
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
                                                <picfile :picfilelist='item.payableBillBankList'></picfile>
                                                <!-- <div style="overflow:hidden">
                                                  <div
                                                    v-for="(items,key) in  item.payableBillBankList"
                                                    :key="key"
                                                    class="htleft"
                                                  >
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
                                                      download
                                                    >{{items.fileName}}</a>
                                                    <p>
                                                      <i class="fa fa-file-text-o"></i>
                                                    </p>
                                                  </div>
                                                </div> -->
                                            </el-row>
                                        </transition>
                                    </el-row>
                                    <div>
                                        共有文件:
                                        <span
                                                class="numcolor"
                                        >{{item.payableBillWuliuList.length+item.payableBillBankList.length}}</span> 个
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="流转详情" name="second">
                    <div class="text-center">
                        <vue2-org-tree
                                name="test"
                                :data="lzdata"
                                :horizontal="horizontal"
                                :collapsable="collapsable"
                                :render-content="renderContent"
                                labelWidth="320px"
                                labelClassName="label-box"
                                @on-node-click="orgclickfn"
                        />
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="card-footer" v-if="$route.query.isshowbtn==1&&$route.query.checkbtn==1">
                <div style="position:absolute;left:60px;" class="xytext">
                    <el-checkbox v-model="checked" @change="showDialog(checked)">我已阅读并同意</el-checkbox>
                    <a href="javascript:;" style="display: inline-block;margin: 0 5px;"
                       @click="showDialog(checked,'1')">《东风金融-创格开单协议》</a>
                    <!-- <a href="javascript:;" @click="showDialog(checked,'2')">《付款承诺函》</a> -->
                </div>
                <el-button class="card-btn" @click="openrefusediag">退回</el-button>
                <el-button class="card-btn" type="primary" @click="openagreediag">同意</el-button>
            </div>
            <div class="card-footer" v-if="$route.query.isshowbtn==2||$route.query.checkbtn==2">
                <el-button class="card-btn" type="primary" @click="goBack">返回</el-button>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog
                title="审核意见"
                :visible.sync="showAddDialog"
                :close-on-click-modal="false"
                :show-close="false"
                width="40%"
        >
            <el-form :model="agreedetail" label-width="60px" ref="addform">
                <el-form-item label="备注：" prop="content">
                    <el-input v-model="agreedetail.content" type="textarea" :rows="6" maxlength="200"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddDialog=false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm" :disabled="bclick">提交</el-button>
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
        <el-dialog title :visible.sync="centerDialogVisible" width="80%" center>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <pdf class="pdf" ref="pdf" :src="src"></pdf>
            <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 融资列表 -->
        <el-dialog
                title="融资列表"
                :visible.sync="showAddDialog3"
                :close-on-click-modal="false"
                :show-close="false"
                width="1000px"
        >
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="payableBillFinanceNo" label="融资项目编号" width="180"></el-table-column>
                <el-table-column prop="financePayableBillNo" label="融资东风金融-创格编号" width="180"></el-table-column>
                <el-table-column prop="fundCorpName" label="融资机构" width="180"></el-table-column>
                <el-table-column label="融资金额">
                    <template slot-scope="scope">{{scope.row.amount|formatMoney}}</template>
                </el-table-column>
                <el-table-column label="融资完成时间">
                    <template slot-scope="scope">{{scope.row.financeTime|formatDate}}</template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showAddDialog3=false">确定</el-button>
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
            <!-- <promise-agreement v-if="fileType == '2'" :payInfo = "payInfo"></promise-agreement> -->
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
    import pdf from "vue-pdf";
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
            steps,
            picfile,
            "open-order": openOrder,
            "promise-agreement": promiseAgreement,
        },
        data() {
            return {
                activetab: "first",
                financnum: {},
                pid: "", //pid
                state: "", //是否入库
                financInfo: {}, //基本信息
                approveInfo: {}, //基本信息
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
                    status: ""
                },
                refusedetail: {
                    approveType: 1,
                    content: "",
                    denialReason: "",
                    payableBillId: "",
                    result: 2,
                    status: ""
                },
                showAddDialog: false,
                showAddDialog2: false,
                bclick: false,
                refuselist: [],
                lzdata: {},
                horizontal: false,
                collapsable: false,
                changeMoneyThousand: changeMoneyThousand,
                expandAll: false,
                centerDialogVisible: false,
                src: "",
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
                financeFile: {},
                showAddDialog3: false,
                tableData: [],
                fileType: '1',
                agreementDialog: false,
                checked: false,
                showType: '',
                readCount: '',
                readDisabled: true,
            };
        },
        created() {
            this.current = 4;
            if (this.$route.query.isshowbtn == 2 || this.$route.query.checkbtn == 2) {
                this.current = 7;
            }
            this.getInfo({payableBillId: this.$route.query.id}); //获取基本信息
            this.getrefuselist(); //获取拒绝原因
            this.circulation();
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
            pdfpreview() {
                // window.open(this.downloadsingle({fileUrl:this.financeFile.fileUrl}));
                this.downloadsingle({fileUrl: this.financeFile.fileUrl})
            },
            //获取详情
            getInfo(param) {
                api.createfirstdetail(param).then(res => {
                    if ((res.code = "100000")) {
                        this.financInfo = res.datas.PayableBill;
                        this.financnum = res.datas.grantCredit;
                        this.financeFile = res.datas.financeFile;
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
                            } else if (
                                this.financInfo.payableBillApproveStatus > 20 &&
                                this.financInfo.payableBillApproveStatus <= 25
                            ) {
                                this.current = 2;
                            } else if (
                                this.financInfo.payableBillApproveStatus > 25 &&
                                this.financInfo.payableBillApproveStatus <= 31
                            ) {
                                this.current = 3;
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
                        if (this.financInfo.payableBillContract.length > 0) {
                            this.financInfo.payableBillContract.forEach(el => {
                                this.$set(el, "isCollapse", false);
                            });
                        }
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            openagreediag() {
                if (!this.checked) {
                    this.$message.error('请同意东风金融-创格开单协议')
                    return
                }
                this.showAddDialog = true;
                this.agreedetail.content = "";
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
            submitAddForm() {
                var user = JSON.parse(sessionStorage.getItem("user"));
                var yfdMessageDto = {
                    itemId: this.$route.query.id,
                    itemType: 1,
                    operatorAction: 1,
                    operatorType: 4,
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
                            yfdMessageDto.verifyCode = value
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
                            this.agreedetail.payableBillId = this.financInfo.payableBillId;
                            this.agreedetail.status = this.financInfo.payableBillApproveStatus;
                            var params = Object.assign({yfdMessageDto}, this.agreedetail)
                            api
                                .submitPayableBillResult(params)
                                .then(res => {
                                    loading.close();
                                    if (res.code == "100000") {
                                        this.showAddDialog = false;
                                        this.$alert("接收通过，请等待平台审核", "", {
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
            submitAddForm2() {
                var user = JSON.parse(sessionStorage.getItem("user"));
                var yfdMessageDto = {
                    itemId: this.$route.query.id,
                    itemType: 1,
                    operatorAction: 2,
                    operatorType: 4,
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
                            yfdMessageDto.verifyCode = value;
                            const loading = this.$loading({
                                lock: true,
                                text: "Loading",
                                spinner: "el-icon-loading",
                                background: "rgba(0, 0, 0, 0.7)"
                            });
                            if (this.bclick) {
                                return;
                            }
                            // this.$alert("拒绝接收，退回开单方！");
                            this.bclick = true;
                            this.refusedetail.payableBillId = this.financInfo.payableBillId;
                            this.refusedetail.status = this.financInfo.payableBillApproveStatus;
                            var params = Object.assign({yfdMessageDto}, this.refusedetail)
                            api
                                .submitPayableBillResult(params)
                                .then(res => {
                                    loading.close();
                                    if (res.code == "100000") {
                                        this.showAddDialog2 = false;
                                        this.$alert("拒绝接收，退回开单方！", "", {
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
            // downloadfn(item) {
            //   api
            //     .filesdownLoadFile({
            //       payableBillId: item.payableBillId,
            //       payableBillContractId: item.payableBillContractId,
            //       fileName: item.contractNo
            //     })
            //     .then(res => {
            //       openDownloadDialog(res.datas.fileStream, "aaa");
            //     })
            //     .catch(err => {});
            // },
            circulation() {
                api
                    .circulation({payableBillId: this.$route.query.id})
                    .then(res => {
                        if (res.code == "100000") {
                            this.lzdata = res.datas.payableBillDetail[0];
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                    .catch(err => {
                    });
            },
            renderContent(h, data) {
                if (!data.hild) {
                    let currentData = "";
                    if (this.$route.query.id == data.payableBillId) {
                        currentData = "flow-style active";
                    } else {
                        currentData = "flow-style";
                    }
                    let content = [
                        h("div", {}, "东风金融-创格编号:" + data.payableBillNo),
                        h("div", {}, "原始开立方:" + data.originalName),
                        data.openCorpName ? h("div", {}, "转让方:" + data.openCorpName) : "",
                        h("div", {}, "持有方:" + data.receiveName),
                        h(
                            "div",
                            {},
                            "金额：" + changeMoneyThousand(data.payableBillAmount) + " 元"
                        ),
                        h(
                            "div",
                            {},
                            "承诺兑付日：" +
                            (data.paymentDate
                                ? moment(data.paymentDate).format("YYYY-MM-DD")
                                : "")
                        ),
                        h(
                            "div",
                            {},
                            "是否已融资：" +
                            (data.payableBillFinanceList.length > 0 ? "是(点击查看)" : "否")
                        )
                    ];
                    return h("div", {domProps: {className: currentData}}, content);
                } else {
                    return "多次流转";
                }
            },
            preview(row) {
                this.row = row;
                api
                    .DownloadContract({contractNo: this.financInfo.contractNo})
                    .then(res => {
                        var binaryData = [];
                        binaryData.push(res);
                        this.src = window.URL.createObjectURL(
                            new Blob(binaryData, {type: "application/zip"})
                        );
                        this.centerDialogVisible = true;
                    });
            },
            orgclickfn(val, data) {
                if (data.payableBillFinanceList.length > 0) {
                    this.showAddDialog3 = true;
                    this.tableData = data.payableBillFinanceList;
                }
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
                        receiveCompanyName: this.PayableBillAddRequest.receivedCorpName,
                        amountMoney: this.ruleform.remark,
                        promisePayDate: this.ruleform.promisePayTime,
                        currentComapnyName: JSON.parse(sessionStorage.getItem('corpList')).corpName,
                    }
                }
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
                    }
                    this.agreementDialog = false;
                    this.readDisabled = true;
                    if (this.showType1) {
                        this.checked = true;
                        this.$set(this.$data, 'fileType', '1')
                    }
                } else {
                    var Id = document.getElementById("dialog")
                    Id.getElementsByClassName("el-dialog")[0].scrollTop = 0
                    if (this.fileType == '1') {
                        this.readCountDown();
                        this.readDisabled = true;
                        this.agreementDialog = false;
                        this.checked = true;
                    }
                }
            }
        }
    };
</script>
<style lang='scss'>
    @import "../../styles/moreDetail/moudleDetail.scss";
    .content {
        //padding: 0px 0px 0px 30px;
        width: 100%;
        height: 100%;
        &.easypay-manager {
            background-color: #f1f1f1 !important;
            padding: 16px;
        }
        &-inner {
            background-color: #fff;
            .el-tabs {
                &__nav-wrap {
                    &.is-top {
                        background-color: #f1f1f1;
                    }
                }
            }
        }
        .el-tabs__nav-wrap.is-top {
            padding: 0 32px;
        }
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
            height: calc(100vh - 203px);
            overflow-y: auto;
        }
        .card-bd-row {
            line-height: 24px;
        }
        .page-head-back {
            color: rgba(227, 1, 32, 1);
            float: right;
            margin-right: 40px;
            margin-top: 16px;
            border: 0px scope #fff;
            i {
                font-size: 14px;
            }
            &.downsize {
                margin-top: 0;
                font-weight: normal;
                font-size: 12px;
                cursor: pointer;
                text-decoration: none;
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
                padding-left: 11px;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 3px;
                    height: 17px;
                    background-color: #d19f53;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
        .card-number {
            // display: inline-block;
            position: relative;
            padding: 0 24px;
            background: #f4f5f9;
            border-radius: 2px 2px 0 0;
            height: 72px;
            border-bottom: 2px rgba(227, 1, 32, 1) solid;
            line-height: 72px;
            &-title {
                display: inline-block;
                font-size: 14px;
                color: #595959;
            }
            &-value {
                display: inline-block;
                font-size: 22px;
                color: rgba(0, 0, 0, 0.85);
            }
            &-btn {
                position: absolute;
                top: 36px;
                right: 24px;
                margin-top: -16px;
            }
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
            margin-top: 30px;
            .marrimg {
                img {
                    margin-right: 1%;
                }
            }
            border: 1px solid #e6e6e6;
            margin-bottom: 20px;
            border-radius: 4px;
            .mainht {
                background-color: #f1f1f1;
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
        .label-box {
            line-height: 24px;
            text-align: left !important;
            cursor: pointer;
        }
        .org-tree-node-label .org-tree-node-label-inner {
            padding: 0px;
        }
        .flow-style {
            padding: 10px 15px;
            &.active {
                background-color: #409eff;
                color: #fff;
                border-radius: 3px;
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
            }
        }
        .text-center {
            text-align: center;
            min-height: calc(100vh - 203px);
        }
    }
</style>
