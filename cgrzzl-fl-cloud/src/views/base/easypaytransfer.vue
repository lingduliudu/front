<template>
  <layout-main-view :breadcrumb="breadcrumblist">
    <div class="common-page-dataList trans">
      <el-steps :active="activebtn" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="交易文件上传"></el-step>
        <el-step title="东风金融-创格转让申请"></el-step>
      </el-steps>
      <div class="easypayby">
        <div v-show="activebtn==0" class="yfdtwo">
          <div class="yfdsize">基本信息</div>
          <div class="formstyle">
            <el-form
              :model="PayableBillAddRequest"
              :rules="rules"
              ref="PayableBillAddRequest"
              label-width="198px"
              class="demo-ruleForm"
            >
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="东风金融-创格编号: ">
                    <el-input v-model="PayableBillAddRequest.payableBillNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="东风金融-创格金额（元）: " class="minsizer">
                    <el-input v-model="PayableBillAddRequest.payableAmount" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <!-- <el-col :span="12">
                  <el-form-item label="东风金融-创格余额（元）: ">
                    <el-input v-model="PayableBillAddRequest.balanceAmount" disabled></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="12">
                  <el-form-item label="可用额度（元）: " class="minsizer">
                    <el-input v-model="PayableBillAddRequest.payableBillNet" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="承诺付款日: ">
                    <el-input v-model="PayableBillAddRequest.promisePayTime" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                
                <!-- <el-col :span="12">
                                    <el-form-item label="东风金融-创格融资年化利率: " class="elspan pec">
                                        <el-input v-model="PayableBillAddRequest.financeYearInterest"
                                                  disabled></el-input><span>%</span>
                                    </el-form-item>
                </el-col>-->
                <el-col :span="12">
                  <el-form-item label="接收企业全称: " prop="receivedCorpId">
                    <el-select
                      v-model="PayableBillAddRequest.receivedCorpName"
                      filterable
                      placeholder="请选择"
                      @change="receivedCorpIdfn"
                    >
                      <el-option
                        v-for="(item,index) in qyallname"
                        :key="index"
                        :label="item.corpName"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="接收企业社会统一信用代码: ">
                    <el-input v-model="PayableBillAddRequest.receivedCorpCreditCode" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="wxtsk">
              <p class="wxts">温馨提示：没有找到可接收企业？请先在链属企业名单添加，并邀请企业完成注册。</p>
            </div>
          </div>
        </div>
        <div v-show="activebtn==1" class="yfdtwo">
          <div class="yfdsize">金额信息</div>
          <div class="yfdbaseline">
            <el-form
              :model="ruleform"
              :rules="rules2"
              ref="ruleform"
              label-width="182px"
              class="demo-ruleForm"
            >
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="转让金额: " prop="transferAmount">
                    <el-input
                      v-model="ruleform.transferAmount"
                      :placeholder="'最多可输入'+PayableBillAddRequest.payableBillNet"
                      @change="tocapital"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转让金额(大写): " class="jezdx">
                    <el-input v-model="ruleform.remark" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="yfdsize">合同信息</div>
          <div class="httotal">
            已添加合同
            <span>{{ruleform2.contractList.length}}</span> 笔，合同总计金额
            <span>{{mounttoall}}</span> 元。
          </div>
          <div class="formstyle">
            <div v-for="(item,index) in ruleform2.contractList" :key="index">
              <div class="htbox" :class="{'active':item.isactive }">
                <div class="htactive">
                  <span @click="item.isactive=!item.isactive">
                    交易合同
                    <i class="el-icon-caret-bottom" :class="{'iconactive':item.isactive }"></i>
                  </span>
                  <i class="el-icon-delete" @click="delDomain(index)"></i>
                </div>
                <div class="htpad">
                  <el-form
                    :model="item"
                    :rules="item.rules"
                    label-position="left"
                    :ref="item.name+index"
                    class="demo-ruleForm"
                  >
                    <el-row :gutter="20" class="htno">
                      <el-col :span="8">
                        <el-form-item label="合同编号: " prop="contractNo" label-width="100px">
                          <el-input v-model="item.contractNo"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="合同金额: " prop="contractAmount" label-width="100px">
                          <el-input
                            v-model="item.contractAmount"
                            @blur="jsmount(item.contractAmount)"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="签署日期: " prop="contractTime" label-width="100px">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            :editable="false"
                            :picker-options="expireTimerOptions"
                            v-model="item.contractTime"
                            value-format="yyyy-MM-dd"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="uploadlist ">
                      <span class="uploadlistContent">*</span>
                      <el-form-item label="上传相关合同: ">
                        <div class="uploadfont wxtsk">
                          温馨提示：仅支持JPG、PNG、PDF、ZIP格式。上传的合同必须加盖骑缝章，按照合同页数进行排列。
                          <br />
                          <span>使用高质量图片，尽量拍摄清晰防止审批造成不必要的时间损失。由于拍摄质量造成的审批不合格平台概不负责。</span>
                        </div>
                        <el-upload
                          :ref="item.name+index+'a'"
                          class="upload-demo upload-contentr"
                          :action="baseURL+'/finance-file/fast/file/upload'"
                          :on-success="(a,b,c)=>dragupfn(a,b,c,item,index)"
                          :on-remove="(a,b)=>dragremovefn(a,b,item,index)"
                          :headers="Authorization"
                          :file-list="item.filelist"
                          accept="image/png, image/jpeg, application/zip, application/rar, application/pdf"
                          :before-upload="beforeupfnfile"
                          drag
                          list-type="picture"
                        >
                          <i class="el-icon-plus"></i>
                          <div class="el-upload__text">上传图片</div>
                        </el-upload>
                      </el-form-item>
                    </div>
                    <div class="uploadlist">
                       <span class="uploadlistContent">*</span>
                      <el-form-item label="上传相关发票: ">
                        <div class="uploadfont wxtsk">
                          温馨提示：仅支持JPG、PNG格式。上传的发票必须真实不能重复。
                          <br />
                          <span>使用高质量图片，尽量拍摄清晰防止审批造成不必要的时间损失。由于拍摄质量造成的审批不合格平台概不负责。</span>
                        </div>
                        <el-upload
                          class="upload-demo upload-contentr"
                          multiple
                          :action="baseURL+'/finance-credit/web/file/uploadInvoice'"
                          :on-success="(a,b,c)=>handleupfn(a,b,c,item,index)"
                          :on-remove="(a,b)=>handleRemove(a,b,item,index)"
                          :on-error="erruploadfp"
                          :before-upload="beforeupfn"
                          accept="image/png, image/jpeg, image/jpg"
                          list-type="picture"
                          drag
                          :headers="Authorization"
                        >
                          <i class="el-icon-plus"></i>
                          <div class="el-upload__text">上传图片</div>
                        </el-upload>
                      </el-form-item>
                      <el-form-item>
                        <el-table
                          :data="item.invoiceList"
                          @cell-mouse-enter="cellhover"
                          @cell-mouse-leave="cellleave"
                          style="width: 100%;top:20px;"
                        >
                          <el-table-column type="index" label="序号" width="80"></el-table-column>
                          <el-table-column label="购买方" align="left" min-width="200">
                            <template slot-scope="scope">
                              <input type="text" v-model="scope.row.invoiceBuyer" />
                            </template>
                          </el-table-column>
                          <el-table-column label="销售方" align="left" min-width="200">
                            <template slot-scope="scope">
                              <input type="text" v-model="scope.row.invoiceSeller" />
                            </template>
                          </el-table-column>
                          <el-table-column label="发票代码" align="left" min-width="200">
                            <template slot-scope="scope">
                              <input type="text" v-model="scope.row.invoiceCode" />
                            </template>
                          </el-table-column>
                          <el-table-column label="发票号码" align="left" min-width="200">
                            <template slot-scope="scope">
                              <input type="text" v-model="scope.row.invoiceNo" />
                            </template>
                          </el-table-column>
                          <el-table-column label="开票日期" align="left" min-width="200">
                            <template slot-scope="scope">
                              <input type="text" v-model="scope.row.invoiceOpenTime" />
                            </template>
                          </el-table-column>
                          <el-table-column label="开具金额" align="right" min-width="200">
                            <template slot-scope="scope">
                              <input
                                type="text"
                                v-model="scope.row.invoiceAmount"
                                class="tabright"
                                @blur="blurfptotal(scope.row,scope.$index,item)"
                              />
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                      <div class="ljje">
                        累计发票金额:
                        <span>{{item.fptotal}}</span> 元
                      </div>
                    </div>
                    <div class="uploadlist">
                      <el-form-item label="上传其他资料: ">
                        <div class="uploadfont wxtsk">
                          温馨提示：仅支持JPG、PNG、PDF、ZIP格式。
                          <br />
                          <span>上传其他补充资料包括但不限于出入库单，物流单，结算单，银行流水等。</span>
                        </div>
                        <el-upload
                          class="upload-demo upload-contentr"
                          :action="baseURL+'/finance-file/fast/file/upload'"
                          :on-success="(a,b,c)=>dragupotherfn(a,b,c,item,index)"
                          :on-remove="(a,b)=>dragremoveotherfn(a,b,item,index)"
                          :on-error="erruploadfp"
                          :file-list="item.otherListfp"
                          list-type="picture"
                          drag
                          accept="image/png, image/jpeg, application/zip, application/rar, application/pdf"
                          :before-upload="beforeupfnfile"
                          :headers="Authorization"
                        >
                          <i class="el-icon-plus"></i>
                          <div class="el-upload__text">上传附件</div>
                        </el-upload>
                        <!--<el-upload-->
                        <!--class="upload-demo upload-contentr"-->
                        <!--:action="baseURL+'/web/file/uploadFile'"-->
                        <!--:on-success="(a,b,c)=>dragupotherfn2(a,b,c,item,index)"-->
                        <!--:on-remove="(a,b)=>dragremoveotherfn2(a,b,item,index)"-->
                        <!--:on-error="erruploadfp"-->
                        <!--:file-list="item.otherListfp2"-->
                        <!--list-type="picture"-->
                        <!--drag-->
                        <!--accept="image/png, image/jpeg, application/zip, application/rar, application/pdf"-->
                        <!--:before-upload="beforeupfnfile"-->
                        <!--&gt;-->
                        <!--<i class="el-icon-plus"></i>-->
                        <!--<div class="el-upload__text">上传银行流水</div>-->
                        <!--</el-upload>-->
                      </el-form-item>
                    </div>
                    <!-- <el-button @click="delDomain(index)">删除</el-button> -->
                  </el-form>
                </div>
              </div>
            </div>
            <div class="addbtn" @click="addDomain">
              <i class="el-icon-plus"></i>
              <span>添加合同</span>
            </div>
            <!-- <el-button @click="addDomain">新增域名</el-button> -->
          </div>
        </div>
        <div v-show="activebtn==2">
          <div class="easybaseline">东风金融-创格开立</div>
        </div>
        <div style="text-align:center" class="xytext" v-show="activebtn!=0">
          <el-checkbox v-model="checked" @change="showDialog(checked)">我已阅读并同意</el-checkbox>
          <a
            href="javascript:;"
            style="display: inline-block;margin: 0 5px;"
            @click="showDialog(checked,'1')"
          >《东风金融-创格转让协议》</a>
        </div>
        <div class="easyformbtn">
          <el-button style="margin-top: 12px;" @click="prevbtn" v-show="activebtn!=0">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="nextbtn">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      class="agreement-dialog"
      :visible.sync="agreementDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="50%"
      center
    >
      <transger-agreement></transger-agreement>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!showType && !readDisabled" @click="hasRead()">同意</el-button>
        <el-button type="primary" v-if="!showType && readDisabled" :disabled="readDisabled">阅读并同意 {{readCount}}秒</el-button>
        <el-button type="primary" @click="agreementDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </layout-main-view>
</template>
<script>
import api from "@/api/api";
import { convertCurrency, adds } from "@/util/common.js";
import { baseURL } from "@/api/sys";
import moment from "moment";
import { changeMoneyThousand } from "@/util/common";
import transgerAgreement from "@/components/agreementList/transger-agreement";
Number.prototype["adds"] = function(...arg) {
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
export default {
  components: {
    "transger-agreement": transgerAgreement
  },
  data() {
    var checkmaxmount = (rule, value, callback) => {
      if (!/^\d{1,12}(\.\d{1,2})?$/.test(value)) {
        callback(new Error("请输入12位以内的数字,小数点后最多2位"));
      } else {
        if (value > this.PayableBillAddRequest.payableBillNet) {
          callback(new Error("转让金额必须小于等于东风金融-创格净额"));
        } else {
          callback();
        }
      }
    };
    return {
      expireTimerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > new Date(new Date().toLocaleDateString()).getTime()
          );
        }
      },
      agreementDialog: false,
      readCount: "",
      readDisabled: true,
      bclick: false,
      baseURL: baseURL,
      loading: false,
      breadcrumblist: ["东风金融-创格转让"],
      activebtn: 0,
      rules: {
        fundCorpId: [
          { required: true, message: "请选择资金机构", trigger: "change" }
        ],
        grantCreditId: [
          { required: true, message: "请选择授信编号", trigger: "change" }
        ],
        grantCloseTime: [{ required: true }],
        fundYearInterest: [{ required: true }],
        financeYearInterest: [{ required: true }],
        receivedCorpId: [
          { required: true, message: "请选择接收企业", trigger: "change" }
        ],
        receivedCorpCreditCode: [{ required: true }],
        receivedCorpAck: [
          { required: true, message: "请选择确认时限", trigger: "change" }
        ]
      },
      rules2: {
        transferAmount: [
          { validator: checkmaxmount, trigger: "blur" },
          { required: true, message: "请输入东风金融-创格金额" }
        ]
      },
      PayableBillAddRequest: {
        payableBillNo: "",
        payableAmount: "",
        remark2: "",
        promisePayTime: "",
        fundYearInterest: "",
        financeYearInterest: "",
        receivedCorpId: "",
        receivedCorpName: "",
        receivedCorpCreditCode: "",
        receivedCorpAck: "",
        balanceAmount: "",
        payableBillNet: "",
        grantCreditNo: ""
      },
      zjlist: [],
      sxbhlist: [],
      qyallname: [],
      ruleform: {
        remark: "",
        transferAmount: ""
      },
      ruleform2: {
        contractList: [
          {
            name: "form",
            contractAmount: "",
            contractNo: "",
            contractTime: moment(new Date()).format("YYYY-MM-DD"),
            imageList: [],
            invoiceList: [],
            fptotal: 0,
            otherList: [],
            rules: {
              contractNo: [
                { required: true, message: "请输入合同编号" },
                { pattern: /^.{1,50}$/, message: "请输入50位以内的编号" }
              ],
              contractAmount: [
                { required: true, message: "请输入合同金额" },
                {
                  pattern: /^\d{1,12}(\.\d{1,2})?$/,
                  message: "请输入12位以内的数字,小数点后最多2位"
                }
              ],
              contractTime: [{ required: true, message: "请选择签署日期" }]
            },
            filelist: [],
            filelistfp: [],
            otherListfp: [],
            otherListfp2: [],
            isactive: false
          }
        ]
      },
      checked: false,
      invoiceAmounttotal: 0,
      pickerOptions: {
        disabledDate: function disabledDate(time) {
          return (
            time.getTime() >
            new Date(this.PayableBillAddRequest.grantCloseTime).getTime()
          );
        }.bind(this)
      },
      listfile: [
        { name: 1, name2: 222, name3: 333 },
        { name: 1, name2: 222, name3: 333 }
      ],
      convertCurrency: convertCurrency,
      mounttoall: 0,
      Authorization: { "Finance-Auth": sessionStorage.token },
      showType: '',
    };
  },
  created() {
    this.getCorpList();
    this.getCorpList3();
    this.getPayableBillById();
    // this.showDialog();
  },
  methods: {
    getPayableBillById() {
      api
        .getPayableBillById({ payableBillId: this.$route.query.id })
        .then(res => {
          if (res.code == 100000) {
            var data = res.datas.payableBill;
            this.PayableBillAddRequest.payableBillNo = data.payableBillNo;
            this.PayableBillAddRequest.payableBillNet = data.payableBillNet;
            this.PayableBillAddRequest.payableAmount = data.payableAmount;
            this.PayableBillAddRequest.balanceAmount = data.balanceAmount;
            this.PayableBillAddRequest.promisePayTime = moment(
              data.promisePayTime
            ).format("YYYY-MM-DD");
            this.PayableBillAddRequest.financeYearInterest =
              data.financeYearInterest;
            this.PayableBillAddRequest.payableBillId = data.payableBillId;
          } else {
            this.$message.error(res.message);
          }
        });
    },
    tocapital() {
      this.ruleform.remark = this.convertCurrency(this.ruleform.transferAmount);
    },
    addDomain() {
      this.ruleform2.contractList.push({
        name: "form",
        contractAmount: "",
        contractNo: "",
        contractTime: moment(new Date()).format("YYYY-MM-DD"),
        imageList: [],
        invoiceList: [],
        fptotal: 0,
        rules: {
          contractNo: [
            { required: true, message: "请输入合同编号" },
            { pattern: /^.{1,50}$/, message: "请输入50位以内的编号" }
          ],
          contractAmount: [
            { required: true, message: "请输入合同金额" },
            {
              pattern: /^\d{1,12}(\.\d{1,2})?$/,
              message: "请输入12位以内的数字,小数点后最多2位"
            }
          ],
          contractTime: [{ required: true, message: "请选择签署日期" }]
        },
        filelist: [],
        filelistfp: [],
        otherListfp: [],
        otherListfp2: [],
        isactive: false
      });
    },
    delDomain(index) {
      this.ruleform2.contractList.splice(index, 1);
      var arr = [];
      this.ruleform2.contractList.map(el => {
        arr.push(Number(el.contractAmount));
      });
      this.mounttoall = (0).adds(...arr);
    },
    cellhover(row, column, cell, event) {
      cell.children[0].children[0].style.border = "1px solid #ccc";
    },
    cellleave(row, column, cell, event) {
      cell.children[0].children[0].style.border = "1px solid #fff";
    },
    nextbtn() {
      if (this.activebtn == 0) {
        this.$refs["PayableBillAddRequest"].validate(valid => {
          if (valid) {
            this.activebtn++;
          } else {
            return false;
          }
        });
      } else if (this.activebtn == 1) {
        var index = 0;
        this.$refs["ruleform"].validate(valid => {
          if (valid) {
            this.ruleform2.contractList.map(el => {
              var amount = 0,
                issome = false,
                amountarr = [];
              el.invoiceList.map(ele => {
                amountarr.push(Number(ele.invoiceAmount));
                Object.keys(ele).forEach(els => {
                  if (ele[els] == "") {
                    issome = true;
                  }
                });
              });
              amount = (0).adds(...amountarr);
              // htamount+=+el.contractAmount
              if (el.imageList.length == 0) {
                this.$message.error(
                  "请上传合同编号:" + el.contractNo + "的合同"
                );
                return;
              }
              if (issome) {
                this.$message.error(
                  "合同编号:" + el.contractNo + "发票信息不全"
                );
                return;
              }
              // if(el.contractAmount!=amount){
              // this.$message.error('合同编号:'+el.contractNo+'的发票累计金额不等于合同金额')
              //       return
              // }
              this.$refs[el.name + index][0].validate(valid => {
                if (valid) {
                  index++;
                  if (this.ruleform2.contractList.length == index) {
                    // this.activebtn++
                    if (this.ruleform.transferAmount > this.mounttoall) {
                      this.$message.error("转让金额必须小于等于合同金额");
                      return;
                    }
                    if (this.ruleform.transferAmount <= 0) {
                      this.$message.error("转让金额必须大于0");
                      return;
                    }
                    var invoiceAmounttotal = [];
                    this.ruleform2.contractList.map(el => {
                      el.invoiceList.map(ele => {
                        invoiceAmounttotal.push(ele.invoiceAmount);
                      });
                    });
                    this.invoiceAmounttotal = (0).adds(...invoiceAmounttotal);
                    if (
                      this.invoiceAmounttotal < this.ruleform.transferAmount
                    ) {
                      this.$message.error("发票总金额必须大于东风金融-创格金额");
                      return;
                    }
                    if (!this.checked) {
                      this.$message.error("请阅读并同意东风金融-创格转让协议");
                      return;
                    }
                    var user = JSON.parse(sessionStorage.getItem("user"));
                    var yfdMessageDto = {
                      itemId: this.$route.query.id,
                      itemType: 1,
                      operatorAction: 1,
                      operatorType: 10,
                      phone: user.phone
                    };
                    api.sendPhoneMessage(yfdMessageDto).then(res => {
                      if (res.success) {
                        let meessage =
                          "提示信息：CFCA向您尾号为" +
                          sessionStorage.getItem("account") +
                          "的手机号码发送了验证短信。请在下方输入框中输入短信中的验证码";
                        this.$prompt(meessage, "请输入短信验证码", {
                          confirmButtonText: "确定",
                          cancelButtonText: "取消"
                        }).then(({ value }) => {
                          yfdMessageDto.verifyCode = value;
                          var a = Object.assign(
                            { contractAmount: this.mounttoall },
                            this.ruleform2,
                            this.PayableBillAddRequest,
                            this.ruleform,
                            { yfdMessageDto }
                          );
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
                          api
                            .transferPayableBill(a)
                            .then(res => {
                              loading.close();
                              if (res.code == 100000) {
                                // this.$alert("转让成功");
                                // history.go(-1);
                                this.$alert(
                                  "转让申请提交成功，等待内部审核",
                                  "",
                                  {
                                    confirmButtonText: "确定",
                                    callback: action => {
                                      history.go(-1);
                                    }
                                  }
                                );
                              } else {
                                this.$message.error(res.message);
                                this.bclick = false;
                              }
                            })
                            .catch(err => {
                              loading.close();
                              this.bclick = false;
                            });
                        });
                      } else {
                        this.$message.error(res.message);
                      }
                    });
                  }
                } else {
                  return false;
                }
              });
            });
          }
        });
      } else {
        this.activebtn = 0;
      }
    },
    prevbtn() {
      this.activebtn--;
    },
    dragupfn(response, file, fileList, item, index) {
      //上传的合同
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
        this.$message.error(file.name + "发票识别错误，请重新上传");
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
    handleupfn(response, file, fileList, item) {
      //上传发票
      if (response.code == "100000") {
        var data = response.datas.payableBillFile;
        item.filelistfp.push(file);
        item.filelistfp.forEach((el, index) => {
          el.name = index + 1;
        });
        item.invoiceList.push({
          invoiceBuyer: data.invoiceBuyer,
          fileUrl: data.fileUrl,
          invoiceSeller: data.invoiceSeller,
          invoiceCode: data.invoiceCode,
          invoiceNo: data.invoiceNo,
          invoiceOpenTime: data.invoiceOpenTime,
          invoiceAmount: data.invoiceAmount,
          payableBillFilleId: data.payableBillFilleId,
          fileCode: 15,
          uid: file.uid,
          fileName: file.name
        });
        item.fptotal = item.fptotal.adds(data.invoiceAmount);
      } else {
        this.$message.error(file.name + "发票识别错误，请重新上传");
      }
    },
    handleRemove(file, fileList, item) {
      //移除发票
      if (item.filelistfp.findIndex(el => el.uid == file.uid) != -1) {
        item.filelistfp.splice(
          item.filelistfp.findIndex(el => el.uid == file.uid),
          1
        );
        item.filelistfp.forEach((el, index) => {
          el.name = index + 1;
        });
        item.invoiceList.splice(
          item.invoiceList.findIndex(el => el.uid == file.uid),
          1
        );
        var arr = [];
        item.invoiceList.map(el => {
          arr.push(Number(el.invoiceAmount));
        });
        item.fptotal = (0).adds(...arr);
      }
    },
    dragupotherfn(response, file, fileList, item, index) {
      //上传的其他附件
      if (response.code == "100000") {
        // var data = response.datas.uploadDate.message;
        //此处回调的值参数  用的不对，因此需要修改一下。
        var data = response.datas.fileModel;

        item.otherListfp.push(file);
        item.otherList.push({
          fileCode: 16,
          fileUrl: data.fullPath,
          uid: file.uid,
          fileName: file.name
        });
      } else {
        this.$message.error(file.name + "发票识别错误，请重新上传");
      }
    },
    dragremoveotherfn(file, fileList, item, index) {
      //移除其他的附件
      if (item.otherList.findIndex(el => el.uid == file.uid) != -1) {
        item.otherList.splice(
          item.otherList.findIndex(el => el.uid == file.uid),
          1
        );
        item.otherListfp.splice(
          item.otherListfp.findIndex(el => el.uid == file.uid),
          1
        );
      }
    },
    dragupotherfn2(response, file, fileList, item, index) {
      //上传的其他附件
      if (response.code == "100000") {
        var data = response.datas.uploadDate.message;
        item.otherListfp2.push(file);
        item.otherList.push({
          fileCode: 17,
          fileUrl: data.fullPath,
          uid: file.uid,
          fileName: file.name
        });
      } else {
        this.$message.error(file.name + "发票识别错误，请重新上传");
      }
    },
    dragremoveotherfn2(file, fileList, item, index) {
      //移除其他的附件
      if (item.otherListfp2.findIndex(el => el.uid == file.uid) != -1) {
        item.otherListfp2.splice(
          item.otherListfp2.findIndex(el => el.uid == file.uid),
          1
        );
        item.otherList.splice(
          item.otherList.findIndex(el => el.uid == file.uid),
          1
        );
      }
    },
    erruploadfp(err) {
      this.$message.error("服务器错误");
    },
    jsmount() {
      var arr = [];
      this.ruleform2.contractList.map(el => {
        arr.push(el.contractAmount);
      });
      this.mounttoall = (0).adds(...arr);
    },
    getCorpList3() {
      //调取企业全称
      api.getSubordinateList().then(res => {
        if (res.code == 100000) {
          this.qyallname = res.datas.list;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getCorpList() {
      //调取资金机构数据
      api.getCorpList({ type: 1 }).then(res => {
        if (res.code == 100000) {
          this.zjlist = res.datas.corp;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    changefundCorpName(val) {
      //获取授信编号
      this.PayableBillAddRequest.fundCorpName = val.corpName;
      this.PayableBillAddRequest.fundCorpId = val.corpId;
      api.getGrantCreditListByCorp({ fundCorpId: val.corpId }).then(res => {
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
      this.PayableBillAddRequest.grantCloseTime = moment(item.closeDate).format(
        "YYYY-MM-DD"
      );
      this.PayableBillAddRequest.grantableAmount = item.availableAmount;
      this.PayableBillAddRequest.fundYearInterest = item.fundYearInterest;
      this.PayableBillAddRequest.financeYearInterest = item.financeYearInterest;
      this.PayableBillAddRequest.grantCreditNo = item.grantCreditNo;
    },
    receivedCorpIdfn(val) {
      //获取信用代码
      this.PayableBillAddRequest.receivedCorpName = val.corpName;
      this.PayableBillAddRequest.receivedCorpId = val.corpId;
      var item = this.qyallname.find(el => {
        return el.corpId == val.corpId;
      });
      this.PayableBillAddRequest.receivedCorpCreditCode = item.creditCode;
    },
    blurfptotal(val, index, item) {
      var arr = [];
      item.invoiceList.map(el => {
        arr.push(Number(el.invoiceAmount));
      });
      item.fptotal = (0).adds(...arr);
    },
    beforeupfn(file) {
      let index = file.name.lastIndexOf(".");
      let suffix = file.name.substr(index + 1);
      if (!/jpg|gif|bmp|png|jpeg/.test(suffix)) {
        this.$message.error("请上传png,jpg,jpeg格式的图片");
        return false;
      }
      if (file.size > 1048576) {
        this.$message.error("请上传1M以内的图片");
        return false;
      }
    },
    beforeupfnfile(file) {
      let index = file.name.lastIndexOf(".");
      let suffix = file.name.substr(index + 1);
      if (!/jpg|gif|bmp|png|jpeg|zip|rar|pdf/.test(suffix)) {
        this.$message.error("请上传png,jpg,jpeg,zip,rar,pdf格式的文件");
        return false;
      }
    },
    // 弹出协议
    showDialog(isRead, type) {
      this.showType = type;
      if(type) {
          this.agreementDialog = true;
          // this.readCountDown();  // 单独打开协议时，不进行倒计时，不展示同意按钮
      }else {
          if(this.checked) {
              this.checked = false;
               this.agreementDialog = true;
               this.readDisabled = true;
               this.readCountDown();
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
      if(this.showType) {
          this.readDisabled = false;
          this.agreementDialog = false;
          this.readDisabled = true;
      }else {
          this.readDisabled = true;
          this.agreementDialog = false;
          this.checked = true;
      }
    }
  }
};
</script>
<style lang="scss">
.trans {
  .formstyle .htbox .uploadfont {
    line-height: 35px;
  }
}
.yfdbaseline {
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 18px;
  margin-bottom: 37px;
}
.easypayby {
  padding-bottom: 40px;
}
.yfdtwo {
  padding: 0 42px;
  .el-input.is-disabled .el-input__inner {
    color: rgb(96, 98, 102);
  }
}
.httotal {
  height: 35px;
  background: #f0f7ff;
  border-radius: 4px;
  line-height: 35px;
  padding-left: 17px;
  margin-bottom: 18px;
  color: #828282;
  span {
    color: #da2b2b;
    line-height: 22px;
  }
}
.formstyle {
  .jezdx {
    font-size: 12px;
  }
  & > div {
    margin-bottom: 20px;
  }
  .el-select,
  .el-date-editor {
    width: 100%;
  }
  .elspan {
    .el-input__inner {
      border-radius: 4px 0 0 4px;
    }
    .el-input {
      width: 80%;
    }
    .el-form-item__content {
      span {
        width: 20%;
        display: inline-block;
        height: 40px;
        background: #f7f7f7;
        border: 1px solid #d9d9d9;
        border-radius: 4px 0 0 4px;
        border-radius: 0 4px 4px 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 40px;
        border-left: none;
        position: relative;
        top: 1px;
        text-align: center;
      }
    }
  }
  .pec.elspan {
    .el-input {
      width: 90%;
    }
    .el-form-item__content {
      span {
        width: 10%;
      }
    }
  }
  .el-table__body-wrapper {
    input[type="text"] {
      border: 1px solid #fff;
    }
    .el-table__row {
      input {
        padding: 6px 10px;
      }
    }
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #fff !important;
  }
  .htbox {
    border-radius: 4px;
    border: 1px solid #cfcfcf;
    .htpad {
      padding: 0 17px;
      form {
        overflow: hidden;
      }
    }
    .htactive {
      height: 43px;
      overflow: hidden;
      background: #f1f1f1;
      line-height: 43px;
      span {
        display: inline-block;
        width: 100px;
        margin-left: 17px;
        float: left;
        cursor: pointer;
      }
    }
    .htno {
      height: 90px;
      border-bottom: 1px solid #e6e6e6;
      padding-top: 25px;
    }
    .uploadfont {
      color: rgba(0, 0, 0, 0.45);
      line-height: 42px;
      span {
        text-indent: 8em;
        display: inline-block;
      }
    }
    .uploadlistContent{
      color: red;
      float: left;
      margin-top: 12px;
      margin-left: -10px;
    }
    .uploadlist {
      padding: 30px 16px 0 16px;
      .upload-demo {
        margin-left: 8em;
      }
      .el-form-item {
        margin-bottom: 40px;
      }
      .el-form-item__label {
        font-size: 16px;
        color: #000000;
      }
      .el-upload-dragger {
        width: 300px;
      }
      .el-upload-dragger .el-upload__text,
      .el-icon-plus {
        color: rgba(0, 0, 0, 0.45);
      }
      .el-icon-plus {
        font-size: 30px;
      }
    }
    .el-icon-delete {
      float: right;
      padding: 12px 20px 0 0;
      cursor: pointer;
      font-size: 18px;
    }
    .ljje {
      text-align: right;
      margin-bottom: 40px;
      color: #595959;
      span {
        color: #f5212d;
      }
    }
  }
}
.easyformbtn {
  text-align: center;
  button {
    width: 160px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 18px;
    span {
      color: #ffffff;
    }
  }
  button:nth-last-child(1) {
    background-color: #2937a6;
  }
  button:nth-last-child(2) {
    span {
      color: #595959;
    }
  }
  button:hover {
    background-color: #edf5ff;
    span {
      color: #67a9fd;
    }
  }
}
.formstyle {
  .active {
    height: 133px;
    overflow: hidden;
  }
  .iconactive {
    transform: scaleY(-1);
  }
}
.addbtn {
  border: 1px dashed #cfcfcf;
  height: 44px;
  text-align: center;
  border-radius: 4px;
  line-height: 44px;
  font-size: 14px;
  color: #828282;
  cursor: pointer;
  i {
    margin-right: 6px;
  }
}
.yfdsize {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  margin-bottom: 29px;
}
</style>
