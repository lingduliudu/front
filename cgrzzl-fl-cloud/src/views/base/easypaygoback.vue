<template>
    <div class="content easypay-manager">
        <div class="content-inner">
            <el-tabs v-model="activetab">
                <el-tab-pane label="东风金融-创格详情" name="first">
                    <section class="info-card-A">
                        <div
                                class="card-bd card-bd-row refuseback"
                                style="font-size: 14px;padding: 0px; background:rgba(255,242,244,1);border:1px solid rgba(255,204,205,1);
"
                        >
                            <el-row>
                                <el-col :span="8" class="lb_body">
                                    <img
                                            src="../../assets/cuowu.png"
                                            alt
                                            style="
    margin-left: -27px;
    vertical-align: middle;
"
                                    />
                                    <span class="info-key">被退回原因:</span>
                                    <span class="info-value index">{{refusereason.refuseReason}}</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="lb_body" style="font-size: 14px;">
                                    <span class="info-key">退回节点:</span>
                                    <span class="info-value index">{{refusereason.approveNodeValus}}</span>
                                </el-col>
                                <el-col :span="8" class="lb_body" style="font-size: 14px;">
                                    <span class="info-key">退回时间:</span>
                                    <span
                                            class="info-value index"
                                    >{{refusereason.createTime ? moment(refusereason.createTime).format('YYYY-MM-DD HH:mm'): ''}}</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24" class="lb_body" style="font-size: 14px; margin-bottom: 20px;">
                                    <span class="info-key">备注:</span>
                                    <span class="info-value index">{{refusereason.reason}}</span>
                                </el-col>
                            </el-row>
                        </div>
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
                        <div class="easypayby goback yfdtwo">
                            <div class="yfdsize">基本信息</div>
                            <div class="formstyle">
                                <el-form
                                        :model="PayableBillAddRequest"
                                        :rules="rules"
                                        ref="PayableBillAddRequest"
                                        label-width="198px"
                                        class="demo-ruleForm"
                                        v-if="$route.query.type!=3"
                                >
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="资金机构: " prop="fundCorpId">
                                                <el-select
                                                        v-model="PayableBillAddRequest.fundCorpName"
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
                                        <el-col :span="12">
                                            <el-form-item label="授信编号: " prop="grantCreditId">
                                                <el-select
                                                        v-model="PayableBillAddRequest.grantCreditNo"
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
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="授信截止日期: ">
                                                <el-input v-model="PayableBillAddRequest.grantCloseTime"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="可用授信额度(元): " class="elspan">
                                                <el-input v-model="PayableBillAddRequest.grantableAmount"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="资金年化利率(%): " class="elspan pec">
                                                <el-input v-model="PayableBillAddRequest.fundYearInterest"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="融资年化利率(%): " class="elspan pec">
                                                <el-input v-model="PayableBillAddRequest.financeYearInterest"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="接收企业全称: " prop="receivedCorpId">
                                                <el-select
                                                        v-model="PayableBillAddRequest.receivedCorpName"
                                                        filterable
                                                        placeholder="请选择"
                                                        @change="receivedCorpIdfn"
                                                        disabled
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
                                            <el-form-item label="企业社会统一信用代码: ">
                                                <el-input v-model="PayableBillAddRequest.receivedCorpCreditCode"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="接收企业确认时限: " prop="receivedCorpAck">
                                                <el-select
                                                        v-model="PayableBillAddRequest.receivedCorpAck"
                                                        placeholder="请选择确认时限"
                                                >
                                                    <el-option label="自审批完毕24小时" value="0"></el-option>
                                                    <el-option label="自审批完毕48小时" value="1"></el-option>
                                                    <el-option label="自审批完毕72小时" value="2"></el-option>
                                                    <!--<el-option label="无时限" value="3"></el-option>-->
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                                <el-form
                                        :model="ruleform"
                                        :rules="rules2"
                                        ref="ruleform"
                                        label-width="198px"
                                        class="demo-ruleForm"
                                        v-if="$route.query.type==3"
                                >
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="东风金融-创格金额(元): " prop="payableAmount">
                                                <el-input v-model="ruleform.payableAmount" placeholder="请输入东风金融-创格金额"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="东风金融-创格余额(元): " class="minsizer">
                                                <el-input v-model="ruleform.parentBalanceAmount" disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="东风金融-创格净额(元): " class="minsizer">
                                                <el-input v-model="ruleform.payableBillNet" disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="承诺兑付日: " prop="promisePayTime">
                                                <el-date-picker
                                                        disabled
                                                        type="date"
                                                        placeholder="选择日期"
                                                        v-model="ruleform.promisePayTime"
                                                        style="width: 100%;"
                                                        value-format="yyyy-MM-dd"
                                                        :picker-options="pickerOptions"
                                                ></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                                <el-form
                                        :model="PayableBillAddRequest"
                                        :rules="rules"
                                        ref="PayableBillAddRequest"
                                        label-width="198px"
                                        class="demo-ruleForm"
                                        v-if="$route.query.type==3"
                                >
                                    <el-row :gutter="20">
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
                                            <el-form-item label="企业社会统一信用代码: ">
                                                <el-input v-model="PayableBillAddRequest.receivedCorpCreditCode"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="融资年化利率(%): " class="elspan pec">
                                                <el-input v-model="PayableBillAddRequest.financeYearInterest"
                                                          disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="接收企业确认时限: " prop="receivedCorpAck">
                                                <el-select
                                                        v-model="PayableBillAddRequest.receivedCorpAck"
                                                        placeholder="请选择确认时限"
                                                >
                                                    <el-option label="自审批完毕24小时" value="0"></el-option>
                                                    <el-option label="自审批完毕48小时" value="1"></el-option>
                                                    <el-option label="自审批完毕72小时" value="2"></el-option>
                                                    <!--<el-option label="无时限" value="3"></el-option>-->
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                            <div class="yfdsize">金额信息</div>
                            <div class="yfdbaseline">
                                <el-form
                                        :model="ruleform"
                                        :rules="rules2"
                                        ref="ruleform"
                                        label-width="182px"
                                        class="demo-ruleForm"
                                        v-if="$route.query.type!=3"
                                >
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="东风金融-创格金额(元): " prop="payableAmount">
                                                <el-input
                                                        v-model="ruleform.payableAmount"
                                                        placeholder="请输入东风金融-创格金额"
                                                        @change="tocapital"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="东风金融-创格金额(大写): " class="minsizer">
                                                <el-input v-model="ruleform.remark" disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="承诺兑付日: " prop="promisePayTime">
                                                <el-date-picker
                                                        type="date"
                                                        placeholder="选择日期"
                                                        v-model="ruleform.promisePayTime"
                                                        style="width: 100%;"
                                                        value-format="yyyy-MM-dd"
                                                        :picker-options="pickerOptions"
                                                ></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                                <el-form
                                        :model="ruleform"
                                        :rules="rules2"
                                        ref="ruleform"
                                        label-width="182px"
                                        class="demo-ruleForm"
                                        v-if="$route.query.type==3"
                                >
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="转让金额(元): " prop="transferAmount">
                                                <el-input
                                                        v-model="ruleform.transferAmount"
                                                        :placeholder="'最多可输入'+ruleform.payableBillNet"
                                                        @change="tocapital2"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="转让金额(大写): " class="jezdx">
                                                <el-input v-model="ruleform.remark2" disabled></el-input>
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
                                                        <el-form-item label="合同编号: " prop="contractNo"
                                                                      label-width="100px">
                                                            <el-input v-model="item.contractNo"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <el-form-item label="合同金额: " prop="contractAmount"
                                                                      label-width="100px">
                                                            <el-input
                                                                    v-model="item.contractAmount"
                                                                    @blur="jsmount(item.contractAmount)"
                                                            ></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <el-form-item label="签署日期: " prop="contractTime"
                                                                      label-width="100px">
                                                            <el-date-picker
                                                                    type="date"
                                                                    placeholder="选择日期"
                                                                    v-model="item.contractTime"
                                                                    :editable='false'
                                                                    :picker-options="expireTimerOptions"
                                                                    value-format="yyyy-MM-dd"
                                                            ></el-date-picker>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <div class="uploadlist">
                                                    <el-form-item label="上传相关合同: " prop="files">
                                                        <!-- <el-input v-model="item.files[0]" v-show="false" type='file'></el-input>                          -->
                                                        <div class="uploadfont wxtsk">
                                                            温馨提示：仅支持JPG、PNG、PDF、ZIP格式。上传的合同必须加盖骑缝章，按照合同页数进行排列。
                                                            <br/>
                                                            <span class="pt16">使用高质量图片，尽量拍摄清晰防止审批造成不必要的时间损失。由于拍摄质量造成的审批不合格平台概不负责。</span>
                                                        </div>
                                                        <el-upload
                                                                :ref="item.name+index+'a'"
                                                                class="upload-demo upload-contentr"
                                                                :action="baseURL+'/web/file/uploadFile'"
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
                                                    <el-form-item label="上传相关发票: " prop="img">
                                                        <div class="uploadfont wxtsk">
                                                            温馨提示：仅支持JPG、PNG格式。上传的发票必须真实不能重复
                                                            <br/>
                                                            <span class="pt16">使用高质量图片，尽量拍摄清晰防止审批造成不必要的时间损失。由于拍摄质量造成的审批不合格平台概不负责。</span>
                                                        </div>
                                                        <el-upload
                                                                class="upload-demo upload-contentr"
                                                                :action="baseURL+'/web/file/uploadInvoice'"
                                                                :on-success="(a,b,c)=>handleupfn(a,b,c,item,index)"
                                                                :on-remove="(a,b)=>handleRemove(a,b,item,index)"
                                                                :on-error="erruploadfp"
                                                                :file-list="item.filelistfp"
                                                                :headers="Authorization"
                                                                accept="image/png, image/jpeg, image/jpg"
                                                                :before-upload="beforeupfn"
                                                                list-type="picture"
                                                                drag
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
                                                            <el-table-column type="index" label="序号"
                                                                             width="80"></el-table-column>
                                                            <el-table-column label="购买方" align="left">
                                                                <template slot-scope="scope">
                                                                    <input type="text"
                                                                           v-model.trim="scope.row.invoiceBuyer"/>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column label="销售方" align="left">
                                                                <template slot-scope="scope">
                                                                    <input type="text"
                                                                           v-model.trim="scope.row.invoiceSeller"/>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column label="发票代码" align="left">
                                                                <template slot-scope="scope">
                                                                    <input type="text"
                                                                           v-model.trim="scope.row.invoiceCode"/>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column label="发票号码" align="left">
                                                                <template slot-scope="scope">
                                                                    <input type="text"
                                                                           v-model.trim="scope.row.invoiceNo"/>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column label="开票日期" align="left">
                                                                <template slot-scope="scope">
                                                                    <input type="text"
                                                                           v-model.trim="scope.row.invoiceOpenTime"/>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column label="开具金额" align="right">
                                                                <template slot-scope="scope">
                                                                    <input
                                                                            type="text"
                                                                            v-model.trim="scope.row.invoiceAmount"
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
                                                            <br/>
                                                            <span class="pt16">上传其他补充资料包括但不限于出入库单，物流单，结算单，银行流水等。</span>
                                                        </div>
                                                        <el-upload
                                                                class="upload-demo upload-contentr"
                                                                :action="baseURL+'/web/file/uploadFile'"
                                                                :on-success="(a,b,c)=>dragupotherfn(a,b,c,item,index)"
                                                                :on-remove="(a,b)=>dragremoveotherfn(a,b,item,index)"
                                                                :on-error="erruploadfp"
                                                                :file-list="item.otherListfp"
                                                                :headers="Authorization"
                                                                accept="image/png, image/jpeg, application/zip, application/rar, application/pdf"
                                                                :before-upload="beforeupfnfile"
                                                                list-type="picture"
                                                                drag
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
                                                        <!--accept="image/png, image/jpeg, application/zip, application/rar, application/pdf"-->
                                                        <!--:before-upload="beforeupfnfile"-->
                                                        <!--drag-->
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
                            </div>
                        </div>
                    </section>
                </el-tab-pane>
                <!--<el-tab-pane label="流转详情" name="second">-->
                <!--<div class="text-center">-->
                <!--<vue2-org-tree-->
                <!--name="test"-->
                <!--:data="lzdata"-->
                <!--:horizontal="horizontal"-->
                <!--:collapsable="collapsable"-->
                <!--:render-content="renderContent"-->
                <!--labelWidth="320px"-->
                <!--labelClassName="label-box"-->
                <!--/>-->
                <!--</div>-->
                <!--</el-tab-pane>-->
            </el-tabs>
            <div class="card-footer" v-if="$route.query.isshowbtn!=2">
                <el-button class="card-btn" @click="openAbolishdiag">此单作废</el-button>
                <el-button class="card-btn" type="primary" @click="nextbtn">变更东风金融-创格</el-button>
                <!--<el-button class="card-btn" @click="goBack">返回</el-button>-->
            </div>
            <div class="card-bottom" v-if="$route.query.isshowbtn==2">
                <el-button class="card-btn" type="primary" @click="goBack">返回</el-button>
            </div>
        </div>
        <el-dialog title :visible.sync="centerDialogVisible" width="80%" center>
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
    import api from "@/api/api";
    import {convertCurrency, adds} from "@/util/common.js";
    import {baseURL} from "@/api/sys";
    import moment from "moment";
    import {changeMoneyThousand} from "@/util/common";
    import pdf from "vue-pdf";
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
    export default {
        computed: {
            refuselist2() {
                return this.refuselist;
            }
        },
        components: {
            pdf
        },
        data() {
            var checkmaxmount = (rule, value, callback) => {
                if (!/^\d{1,12}(\.\d{1,2})?$/.test(value)) {
                    callback(new Error("请输入12位以内的数字,小数点后最多2位"));
                } else {
                    if (value > this.ruleform.payableBillNet) {
                        callback(new Error("转让金额必须小于等于东风金融-创格净额"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                expireTimerOptions: {
                    disabledDate(time) {
                        return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
                    }
                },
                changeMoneyThousand: changeMoneyThousand,
                moment: moment,
                activetab: "first",
                baseURL: baseURL,
                loading: false,
                bclick: false,
                breadcrumblist: ["东风金融-创格编辑"],
                rules: {
                    fundCorpId: [
                        {required: true, message: "请选择资金机构", trigger: "change"}
                    ],
                    grantCreditId: [
                        {required: true, message: "请选择授信编号", trigger: "change"}
                    ],
                    grantCloseTime: [{required: true}],
                    fundYearInterest: [{required: true}],
                    financeYearInterest: [{required: true}],
                    receivedCorpId: [
                        {required: true, message: "请选择接收企业", trigger: "change"}
                    ],
                    receivedCorpCreditCode: [{required: true}],
                    receivedCorpAck: [
                        {required: true, message: "请选择确认时限", trigger: "change"}
                    ]
                },
                rules2: {
                    payableAmount: [
                        {
                            pattern: /^\d{1,12}(\.\d{1,2})?$/,
                            message: "请输入12位以内的数字,小数点后最多2位"
                        },
                        {required: true, message: "请输入东风金融-创格金额"}
                    ],
                    promisePayTime: [{required: true, message: "请选择承诺兑付日"}],
                    transferAmount: [
                        {validator: checkmaxmount, trigger: "blur"},
                        {required: true, message: "请输入东风金融-创格金额"}
                    ]
                },
                PayableBillAddRequest: {
                    fundCorpId: "",
                    fundCorpName: "",
                    grantCreditId: "",
                    grantCloseTime: "",
                    fundYearInterest: "",
                    financeYearInterest: "",
                    receivedCorpId: "",
                    receivedCorpName: "",
                    receivedCorpCreditCode: "",
                    receivedCorpAck: "",
                    grantCreditNo: "",
                    grantableAmount: ""
                },
                refusereason: {},
                zjlist: [],
                sxbhlist: [],
                qyallname: [],
                ruleform: {
                    remark: "",
                    payableAmount: "",
                    promisePayTime: "",
                    transferAmount: "",
                    remark2: "",
                    payableBillNet: ""
                },
                ruleform2: {
                    contractList: []
                },
                pickerOptions: {
                    disabledDate: function disabledDate(time) {
                        return (
                            time.getTime() <= new Date(new Date().toLocaleDateString()).getTime() || time.getTime() > new Date(this.PayableBillAddRequest.grantCloseTime).getTime()
                        );
                    }.bind(this)
                },
                convertCurrency: convertCurrency,
                mounttoall: 0,
                Authorization: {Authorization: sessionStorage.token},
                refuselist: [],
                lzdata: {},
                horizontal: false,
                collapsable: false,
                expandAll: false,
                centerDialogVisible: false,
                src: "",
                financInfo: {}
            };
        },
        created() {
            this.getGrantCreditCorpList();
            this.getrefuselist();
            this.getCorpList3();
        },
        methods: {
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
            //获取详情
            getInfo(param) {
                const loading = this.$loading({
                    lock: true,
                    text: "Loading",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                api
                    .createfirstdetail(param)
                    .then(res => {
                        loading.close();
                        if ((res.code = "100000")) {
                            this.financInfo = res.datas.PayableBill;
                            this.refusereason = res.datas.approve;
                            this.changefundCorpName(this.financInfo);
                            //基础信息赋值
                            Object.keys(this.PayableBillAddRequest).map(el => {
                                Object.keys(this.financInfo).map(ele => {
                                    if (el == ele) {
                                        this.PayableBillAddRequest[el] = this.financInfo[ele];
                                    }
                                });
                            });
                            this.PayableBillAddRequest.grantCloseTime = moment(
                                this.PayableBillAddRequest.grantCloseTime
                            ).format("YYYY-MM-DD");
                            //金额信息赋值
                            this.ruleform.remark = this.financInfo.remark;
                            this.ruleform.payableAmount = this.financInfo.payableAmount;
                            this.ruleform.payableBillNet = this.financInfo.payableBillNet;
                            this.PayableBillAddRequest.balanceAmount = this.financInfo.balanceAmount;
                            this.ruleform.promisePayTime = moment(
                                this.financInfo.promisePayTime
                            ).format("YYYY-MM-DD");
                            this.PayableBillAddRequest.corpName = this.financInfo.fundCorpName;
                            //子单赋值逻辑
                            if (this.$route.query.type == 3) {
                                this.ruleform.payableAmount = res.datas.parentAmount;
                                this.ruleform.parentBalanceAmount = res.datas.parentBalanceAmount;
                                this.ruleform.payableBillNet = this.financInfo.payableBillNet;
                                this.ruleform.remark2 = this.convertCurrency(
                                    this.ruleform.parentBalanceAmount
                                );
                            }
                            //合同信息赋值
                            var arr = [];
                            this.financInfo.payableBillContract.map((el, index) => {
                                arr.push(el.contractAmount);
                                this.ruleform2.contractList.push({
                                    name: "form",
                                    contractAmount: "",
                                    contractNo: "",
                                    contractTime: "",
                                    imageList: [],
                                    invoiceList: [],
                                    otherList: [],
                                    fptotal: 0,
                                    rules: {
                                        contractNo: [
                                            {required: true, message: "请输入合同编号"},
                                            {pattern: /^.{1,50}$/, message: "请输入50位以内的编号"}
                                        ],
                                        contractAmount: [
                                            {required: true, message: "请输入合同金额"},
                                            {
                                                pattern: /^\d{1,12}(\.\d{1,2})?$/,
                                                message: "请输入12位以内的数字,小数点后最多2位"
                                            }
                                        ],
                                        contractTime: [{required: true, message: "请选择签署日期"}]
                                    },
                                    filelist: [],
                                    filelistfp: [],
                                    otherListfp: [],
                                    otherListfp2: [],
                                    isactive: false
                                });
                                this.ruleform2.contractList[index].contractAmount =
                                    el.contractAmount;
                                this.ruleform2.contractList[index].contractNo = el.contractNo;
                                this.ruleform2.contractList[index].contractTime = moment(
                                    el.contractTime
                                ).format("YYYY-MM-DD");
                                //合同
                                el.payableBillContractList.map(ele => {
                                    this.ruleform2.contractList[index].filelist.push({
                                        name: ele.fileName,
                                        url: api.getImgURL(ele.fileUrl),
                                        uid: ele.uid,
                                    });
                                    this.ruleform2.contractList[index].imageList.push({
                                        fileCode: 14,
                                        fileUrl: ele.fileUrl,
                                        uid: ele.uid,
                                        fileName: ele.fileName
                                    });
                                });
                                //发票
                                el.payableBillInvoiceList.map(ele => {
                                    this.ruleform2.contractList[index].filelistfp.push({
                                        name: ele.fileName,
                                        url: api.getImgURL(ele.fileUrl)
                                    });
                                    this.ruleform2.contractList[index].invoiceList.push({
                                        payableBillFilleId: ele.payableBillFilleId,
                                        invoiceBuyer: ele.invoiceBuyer,
                                        invoiceSeller: ele.invoiceSeller,
                                        invoiceCode: ele.invoiceCode,
                                        invoiceNo: ele.invoiceNo,
                                        invoiceOpenTime: ele.invoiceOpenTime,
                                        invoiceAmount: ele.invoiceAmount,
                                        fileCode: 15,
                                        uid: ele.uid,
                                        fileName: ele.fileName
                                    });
                                });
                                //发票总金额
                                this.ruleform2.contractList[index].fptotal = +el.invoiceAllAmount;
                                //其他附件
                                //物流
                                el.payableBillWuliuList.map(ele => {
                                    this.ruleform2.contractList[index].otherListfp.push({
                                        name: ele.fileName,
                                        url: api.getImgURL(ele.fileUrl),
                                        uid: ele.uid,
                                    });
                                    this.ruleform2.contractList[index].otherList.push({
                                        fileCode: 16,
                                        name: ele.fileName,
                                        fileUrl: ele.fileUrl,
                                        uid: ele.uid,
                                        fileName: ele.fileName
                                    });
                                });
                                //银行
                                el.payableBillBankList.map(ele => {
                                    this.ruleform2.contractList[index].otherListfp2.push({
                                        name: ele.fileName,
                                        url: api.getImgURL(ele.fileUrl),
                                        uid: ele.uid,
                                    });
                                    this.ruleform2.contractList[index].otherList.push({
                                        fileCode: 17,
                                        name: ele.fileName,
                                        fileUrl: ele.fileUrl,
                                        uid: ele.uid,
                                        fileName: ele.fileName
                                    });
                                });
                            });
                            this.mounttoall = (0).adds(...arr);
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                    .catch(err => {
                        loading.close();
                    });
            },
            tocapital() {
                this.ruleform.remark = this.convertCurrency(this.ruleform.payableAmount);
            },
            tocapital2() {
                this.ruleform.remark2 = this.convertCurrency(
                    this.ruleform.transferAmount
                );
            },
            addDomain() {
                this.ruleform2.contractList.push({
                    name: "form",
                    contractAmount: "",
                    contractNo: "",
                    contractTime: "",
                    defaultvalue: "",
                    imageList: [],
                    invoiceList: [],
                    otherList: [],
                    fptotal: 0,
                    rules: {
                        contractNo: [
                            {required: true, message: "请输入合同编号"},
                            {pattern: /^.{1,50}$/, message: "请输入50位以内的编号"}
                        ],
                        contractAmount: [
                            {required: true, message: "请输入合同金额"},
                            {
                                pattern: /^\d{1,12}(\.\d{1,2})?$/,
                                message: "请输入12位以内的数字,小数点后最多2位"
                            }
                        ],
                        contractTime: [{required: true, message: "请选择签署日期"}]
                    },
                    filelist: [],
                    filelistfp: [],
                    otherListfp: [],
                    otherListfp2: [],
                    isactive: false,
                    invoiceAmounttotal: 0
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
                this.$refs["PayableBillAddRequest"].validate(valid => {
                    if (valid) {
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
                                    // if (el.contractAmount != amount) {
                                    //   this.$message.error(
                                    //     "合同编号:" + el.contractNo + "的发票累计金额不等于合同金额"
                                    //   );
                                    //   return;
                                    // }
                                    if (this.financInfo.parendId == 0) {
                                        if (
                                            this.ruleform.payableAmount >
                                            this.PayableBillAddRequest.grantableAmount +
                                            this.financInfo.payableAmount
                                        ) {
                                            this.$message.error("东风金融-创格金额必须小于等于可用授信额度");
                                            return;
                                        }
                                    } else {
                                        if (this.ruleform.payableBillNet) {
                                            if (
                                                this.ruleform.transferAmount > this.ruleform.payableBillNet
                                            ) {
                                                this.$message.error("东风金融-创格金额必须小于等于东风金融-创格净额");
                                                return;
                                            }
                                        }
                                    }
                                    this.$refs[el.name + index][0].validate(valid => {
                                        if (valid) {
                                            index++;
                                            if (this.ruleform2.contractList.length == index) {
                                                if (this.ruleform.transferAmount > this.mounttoall) {
                                                    this.$message.error("东风金融-创格金额必须小于合同金额");
                                                    return;
                                                }
                                                if (this.$route.query.type == 3) {
                                                    if (this.ruleform.transferAmount <= 0) {
                                                        this.$message.error("东风金融-创格金额必须大于0");
                                                        return;
                                                    }
                                                    var invoiceAmounttotal = []
                                                    this.ruleform2.contractList.map(el => {
                                                        el.invoiceList.map(ele => {
                                                            invoiceAmounttotal.push(ele.invoiceAmount)
                                                        })
                                                    })
                                                    this.invoiceAmounttotal = 0..adds(...invoiceAmounttotal)
                                                    if (this.invoiceAmounttotal < this.ruleform.transferAmount) {
                                                        this.$message.error('发票总金额必须大于东风金融-创格金额')
                                                        return
                                                    }
                                                } else if (this.$route.query.type == 1) {
                                                    if (this.ruleform.payableAmount <= 0) {
                                                        this.$message.error("东风金融-创格金额必须大于0");
                                                        return;
                                                    }
                                                    var invoiceAmounttotal = []
                                                    this.ruleform2.contractList.map(el => {
                                                        el.invoiceList.map(ele => {
                                                            invoiceAmounttotal.push(ele.invoiceAmount)
                                                        })
                                                    })
                                                    this.invoiceAmounttotal = 0..adds(...invoiceAmounttotal)
                                                    if (this.invoiceAmounttotal < this.ruleform.payableAmount) {
                                                        this.$message.error('发票总金额必须大于东风金融-创格金额')
                                                        return
                                                    }
                                                }
                                                var a = Object.assign(
                                                    {payableBillId: this.$route.query.id},
                                                    this.ruleform2,
                                                    this.PayableBillAddRequest,
                                                    this.ruleform,
                                                    {contractAmount: this.mounttoall}
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
                                                if (this.$route.query.type == 3) {
                                                    a.grantCloseTime = null;
                                                    a.payableAmount = this.ruleform.transferAmount;
                                                    a.remark = this.ruleform.remark2;
                                                }
                                                api
                                                    .changePayableBill(a)
                                                    .then(res => {
                                                        loading.close();
                                                        if (res.code == 100000) {
                                                            // this.$alert("开立成功");
                                                            // history.go(-1);
                                                            this.$alert("开立成功，提交内部审核", "", {
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
                                                        this.bclick = false;
                                                        loading.close();
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
                        return;
                    }
                });
            },
            dragupfn(response, file, fileList, item, index) {
                //上传的合同
                if (response.code == "100000") {
                    var data = response.datas.uploadDate.message;
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
                if (response.code == 0) {
                    var data = response.message.datas.payableBillFile;
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
                    item.fptotal = (+item.fptotal).adds(data.invoiceAmount);
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
                    var data = response.datas.uploadDate.message;
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
            getGrantCreditCorpList() {
                //调取资金机构数据
                api.getGrantCreditCorpList().then(res => {
                    if (res.code == 100000) {
                        this.zjlist = res.datas.list;
                        this.getInfo({payableBillId: this.$route.query.id});
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            changefundCorpName(val) {
                //获取授信编号
                this.PayableBillAddRequest.fundCorpName = val.corpName;
                this.PayableBillAddRequest.fundCorpId = val.corpId;
                this.sxbhlist = [];
                this.PayableBillAddRequest.grantCreditNo = "";
                this.PayableBillAddRequest.grantCreditId = "";
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
                this.PayableBillAddRequest.grantCreditId = item.grantCreditId;
                this.PayableBillAddRequest.grantCloseTime = moment(item.closeDate).format(
                    "YYYY-MM-DD"
                );
                this.PayableBillAddRequest.grantableAmount = item.remainAmount;
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
            openAbolishdiag() {
                this.$confirm("该东风金融-创格将作废, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
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
                            .easypaydel({payableBillId: this.$route.query.id})
                            .then(res => {
                                loading.close();
                                if (res.code == "100000") {
                                    this.$alert("废除成功", "", {
                                        confirmButtonText: "确定",
                                        callback: action => {
                                            history.go(-1);
                                        }
                                    });
                                } else {
                                    this.bclick = false;
                                    this.$message.error(res.message);
                                }
                            })
                            .catch(err => {
                                loading.close();
                                this.bclick = false;
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消废除"
                        });
                    });
            },
            beforeupfn(file) {
                let index = file.name.lastIndexOf('.')
                let suffix = file.name.substr(index + 1)
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
                let index = file.name.lastIndexOf('.')
                let suffix = file.name.substr(index + 1)
                if (!/jpg|gif|bmp|png|jpeg|zip|rar|pdf/.test(suffix)) {
                    this.$message.error("请上传png,jpg,jpeg,zip,rar,pdf格式的文件");
                    return false;
                }
            },
            getrefuselist() {
                api.getDicListByType({type: 6}).then(res => {
                    if (res.code == "100000") {
                        this.refuselist = res.datas.list;
                    }
                });
            },
            refuseReasonfn(val) {
                var name = "";
                name = this.refuselist.find(el => {
                    return el.code == val;
                });
                return name && name.name;
            },
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
                    )
                ];
                return h("div", {domProps: {className: currentData}}, content);
            },
            goBack() {
                //   this.$router.push({name:'开立审批'})
                window.history.go(-1);
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
            }
        }
    };
</script>
<style lang="scss">
    .common-page-dataList {
        width: 100%;
        overflow: hidden;
    }
    .yfdbaseline {
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 18px;
        margin-bottom: 37px;
    }
    .easypayby {
        padding-bottom: 40px;
        &.goback {
            padding-top: 20px;
        }
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
            border: 1px solid #e6e6e6;
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
            background-color: #FF4D60;
        }
        button:nth-last-child(2) {
            span {
                color: #595959;
            }
        }
        button:hover {
            background-color: #edf5ff;
            span {
                color: #FF4D60;
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
        text-indent: 32px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
        margin-bottom: 29px;
        &.rback {
            margin-bottom: 10px;
        }
    }
    .refuseback {
        margin-bottom: 20px;
        text-indent: 5em;
        .el-row {
            margin: 20px 0;
        }
        .info-value.index {
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .pt16 {
        position: relative;
        top: -16px;
    }
    .text-center {
        text-align: center;
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
            background-color: #FF4D60;
            color: #fff;
            border-radius: 3px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        }
    }
    .container {
        .el-tabs__nav-wrap.is-top {
            padding: 0 32px;
        }
    }
</style>
