<template>
  <div>
    <layout-main-view :breadcrumb="breadcrumblist">
      <!-- 将文件名作为最外层类名，为避免相互影响如果直接复制文件请务必更改最外层类名-->
      <div class="common-page-dataList txjggl">
        <el-tabs type="border-card" v-model="activeName" class="n-tabs">
          <data-list
            :filters="filterList"
            :isShowAll="isShowAll"
            :isHedden="isHedden"
            @data-showAll="filterShowAll"
            @data-refresh="handleRefresh"
            :total="total"
            ref="datalist"
            :otherFunc="otherFunc"
          >
            <el-table
              :data="listData"
              :header-cell-style="headerStyle"
              highlight-current-row
              v-loading="listLoading"
              style="width: 100%;"
            >
              <el-table-column prop="agencyCode" label="机构编码" min-width="150"></el-table-column>
              <el-table-column prop="agencyName" label="机构名称" show-overflow-tooltip min-width="250"></el-table-column>
              <!-- <el-table-column prop="expenditureAccount" label="支出账户" min-width="150"></el-table-column> -->
              <el-table-column prop="onoff" :formatter="statusfn" label="启用状态" min-width="150"></el-table-column>
              <el-table-column prop="remark" label="备注说明" min-width="150"></el-table-column>
              <el-table-column prop="createBy" label="创建人" min-width="150"></el-table-column>
              <el-table-column prop="createTime" label="发送时间" min-width="150">
                <template
                  slot-scope="scope"
                >{{scope.row.createTime ? moment(scope.row.createTime).format('YYYY-MM-DD') : ''}}</template>
              </el-table-column>
              <el-table-column prop="updateBy" label="更新人" min-width="150"></el-table-column>
              <el-table-column label="更新时间" min-width="130">
                <template
                  slot-scope="scope"
                >{{scope.row.updateTime ? moment(scope.row.updateTime).format('YYYY-MM-DD') : ''}}</template>
              </el-table-column>

              <el-table-column label="操作" width="260" align="left">
                <template slot-scope="scope">
                  <el-button
                    size="medium"
                    v-if="scope.row.onoff == 0"
                    type="text"
                    @click="handleStatus(scope.row,1)"
                  >停用</el-button>
                  <el-button
                    size="medium"
                    v-if="scope.row.onoff == 1"
                    type="text"
                    @click="handleStatus(scope.row,0)"
                  >启用</el-button>
                  <el-button v-if="scope.row.onoff == 1" size="medium" type="text" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button size="medium" type="text" @click="handleDetail(scope.row)">查看</el-button>
                  <el-button size="medium" type="text" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </data-list>
        </el-tabs>
        <!-- 新增/编辑 -->
        <el-dialog
          :title="isAdd ? '新增机构' : '编辑机构'"
          :visible.sync="dialogVisible"
          width="1000px"
          class="base-dialog"
        >
          <div class="common-style">
            <el-form
              :model="ruleForm"
              status-icon
              ref="ruleForm"
              label-width="90px"
              class="demo-ruleForm"
              :rules="rules"
            >
              <div class="row-title">机构基本信息</div>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="机构类型:" prop="agencyType">
                    <el-select
                      v-model="ruleForm.agencyType"
                      popper-class="account-select-option"
                      placeholder="请选择机构类型"
                      @change="selcetAgencyType"
                    >
                      <el-option
                        v-for="(item,index) in corpDataList"
                        :key="index"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机构名称:" prop="agencyName">
                    <el-autocomplete
                      class="inline-input"
                      v-model="ruleForm.agencyName"
                      :fetch-suggestions="queryFundSearchAsync"
                      placeholder="请输入机构名称"
                      :trigger-on-focus="false"
                      @select="handleAgencyNameSelect"
                    ></el-autocomplete>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="机构编码:" prop="agencyCode">
                    <el-input
                      :disabled="isDiabled"
                      v-model.trim="ruleForm.agencyCode"
                      placeholder="请输入机构编码"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <div class="row-title">机构账户管理</div>
                <el-table
                :data="ruleForm.discountAgencyAccountList"
                :header-cell-style="headerStyle"
                highlight-current-row
                style="width: 100%;"
                class="discountAgencyAccountList"
                >
                  <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
                  <el-table-column label="开户总行" min-width="150">
                    <template slot-scope="scope">
                      <el-form-item :prop="'discountAgencyAccountList.' + scope.$index + '.pheadOffice'" :rules="rules.pheadOffice">
                        <el-select
                          v-model="scope.row.pheadOffice"
                          placeholder="请选择开户总行"
                        >
                          <el-option
                            v-for="item in bankList"
                            :key="item.value"
                            :label="item.dictLabel"
                            :value="item.dictValue">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="psubbranch" label="开户支行" min-width="150">
                    <template slot-scope="scope">
                      <el-form-item :prop="'discountAgencyAccountList.' + scope.$index + '.psubbranch'" :rules="rules.psubbranch">
                        <el-input  v-model="scope.row.psubbranch" placeholder="请输入开户支行"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                   <el-table-column prop="pcorrespondent" label="联行号" min-width="120">
                    <template slot-scope="scope">
                      <el-form-item :prop="'discountAgencyAccountList.' + scope.$index + '.pcorrespondent'" :rules="rules.pcorrespondent">
                        <el-input  v-model="scope.row.pcorrespondent" placeholder="请输入银联号"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                   <el-table-column prop="pbankcard" label="银行卡号" min-width="200">
                    <template slot-scope="scope">
                      <el-form-item :prop="'discountAgencyAccountList.' + scope.$index + '.pbankcard'" :rules="rules.pbankcard">
                        <el-input  v-model="scope.row.pbankcard" placeholder="请输入银行卡号"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="90" align="left">
                    <template slot-scope="scope">
                      <el-button :disabled="ruleForm.discountAgencyAccountList.length<=1" size="medium" type="text" @click="deleteRow(scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              <el-button icon="el-icon-plus" type="text" @click="addRow">新增</el-button>
              <div class="row-title">机构备注</div>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="备注说明:" prop="remark">
                    <el-input
                      class="remark"
                      type="textarea"
                      v-model="ruleForm.remark"
                      placeholder="请输入备注"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="dialog-footer">
            <span slot="footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit()" :loading="loading">提 交</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 查看 -->
        <el-dialog title="查看机构" :visible.sync="dialogVisible1" width="1000px" class="base-dialog">
          <div class="common-style">
            <div class="row-title">机构基本信息</div>
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="info-key">机构类型：</span>
                <span class="info-value index">{{agencyTypeFn(ruleForm.agencyType)}}</span>
              </el-col>
              <el-col :span="12">
                <span class="info-key">机构名称：</span>
                <span class="info-value index">{{ruleForm.agencyName}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="info-key">机构编码：</span>
                <span class="info-value index">{{ruleForm.agencyCode}}</span>
              </el-col>
            </el-row>

            <div class="row-title">机构账户管理</div>
            <el-table
              :data="ruleForm.discountAgencyAccountList"
              :header-cell-style="headerStyle"
              highlight-current-row
              style="width: 100%;"
              class="discountAgencyAccountList"
              >
              <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
              <el-table-column label="开户总行" min-width="150">
              </el-table-column>
              <el-table-column prop="psubbranch" label="开户支行" min-width="150">
              </el-table-column>
              <el-table-column prop="pcorrespondent" label="联行号" min-width="120">
              </el-table-column>
              <el-table-column prop="pbankcard" label="银行卡号" min-width="200">
              </el-table-column>
            </el-table>

            <div class="row-title">机构备注</div>
            <el-row :gutter="20">
              <el-col :span="24">
                <span class="info-key">备注说明：</span>
                <span class="info-value index">{{ruleForm.remark}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="dialog-footer">
            <span slot="footer">
              <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
            </span>
          </div>
        </el-dialog>
      </div>
    </layout-main-view>
  </div>
</template>
<script>
import api from "@/api/api.js";
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      breadcrumblist: [],
      isShowAll: false,
      isHedden: false,
      loading: false,
      otherFunc: [{ text: "+ 新增机构", func: this.openDialog }],
      filterList: [
        {
          label: "启用状态:",
          type: "select",
          field: "onoff",
          size: "small",
          options: [
            { label: "启用", value: '0' },
            { label: "停用", value: '1' }
          ]
        },
        {
          label: "更新时间:",
          type: "daterange",
          field: ["updateStartTime", "updateEndTime"],
          size: "small"
        },
      ],
      activeName: "1",
      total: 0,
      listLoading: false,
      listData: [],
      api: api,
      row: {},
      dialogVisible: false,
      dialogVisible1: false,
      isAdd: true, //true 新增  false 编辑,
      defaultform: {},
      ruleForm: {
        agencyType: "",
        agencyName: "",
        agencyCode: "",
        remark: "",
        discountAgencyAccountList: [
          { pheadOffice: "", psubbranch: "", pcorrespondent: "", pbankcard: ""}
        ],
      },
      rules: {
        agencyType: [{ required: true, message: "请选择机构类型", trigger: "change"}],
        agencyCode: [
          { required: true, message: "请输入机构编码", trigger: "blur" },
          { max: 20, message: "机构编码为20位以内有效字符" }
        ],
        agencyName: [
          { required: true, message: "请输入构名称", trigger: "blur" },
          { max: 50, message: "机构名称为50个以内有效字符" }
        ],
        pheadOffice: [
          { required: true, message: "请选择开户总行", trigger: "change" }
        ],
        psubbranch: [
          { required: true, message: "请输入开户支行", trigger: "blur" },
          { max: 50, message: "开户支行为50个以内有效字符" }
        ],
        pcorrespondent: [
          { required: true, message: "请输入联行号", trigger: "blur" },
          { pattern: /^[1-9]\d{0,29}$/, message: "联行号为30位以内有效数字" }
        ],
        pbankcard: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          { pattern: /^[1-9]\d{0,29}$/, message: "银行卡号为30位以内有效数字" }
        ],
      },
      agencyNameList: [],
      isDiabled: false,
      corpDataList: [],
      bankList: [],
    };
  },
  created() {
    //   获取机构类型数据
    this.getTypeList(this.corpDataList, 'sys_organization_type');
    this.getTypeList(this.bankList, 'sys_bank_name');

    this.defaultform = JSON.parse(JSON.stringify(this.ruleForm))
  },
  mounted() {
    this.showtab = this.$route.params.state;
  },
  computed: {
    // 操作完成后用当前页面参数更新列表数据
    baseParam() {
      let baseParam = {pageNum: this.$route.query.pageNum, pageSize: this.$route.query.pageSize}
      console.log(baseParam, '----------baseParam')
      return baseParam
    } 
  },
  methods: {
    moment: moment,
    filterShowAll() {
      this.isShowAll = !this.isShowAll;
    },
    headerStyle({ row, rowIndex }) {
      return { background: "#FAFAFA" };
    },
    handleRefresh(filters) {
      this.getLists(filters);
    },
    //查询
    getLists(param) {
      this.listLoading = true;
      api.getDiscountAgencyList(param).then(res => {
        // console.log(res, "---------res查询列表");
        if (res.code == 200) {
          this.listData = res.data.rows;
          this.total = Number(res.data.total);
        }else {
          this.$message.error(res.msg)
        }
        this.listLoading = false;
      });
    },
    statusfn(val) {
      let state = "";
      switch (val.onoff) {
        case 0:
          state = "启用";
          break;
        case 1:
          state = "停用";
          break;
      }
      return state;
    },
    agencyTypeFn(val) {
      let type = ''
      switch (val) {
        case '1':
          type = "主机厂";
          break;
        case '2':
          type = "经销商";
          break;
        case '3':
          type = "供应商";
          break;
        case '4':
          type = "生产商";
          break;
      }
      return type
    },
    getTypeList(list, type) {
      api.baseSysDic(type).then(res => {
        if (res.code == 200) {
          let corpList = res.data
          if(corpList.length > 0) {
            corpList.forEach(v => {
              list.push({dictLabel: v.dictLabel, dictValue: v.dictValue})
            })
          }
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 选择机构类型
    selcetAgencyType(val) {
      console.log(val, "-----------val");
      this.agencyNameList = [];
      this.resetFields(1);
      this.isDiabled = false;
      //   根据选择的机构类型请求机构名称数据
      let temp = [
        [
          {
            agencyName: "哇哈哈1",
            agencyCode: "40000000000001",
            expenditureAccount: "6000000000000001"
          },
          {
            agencyName: "乐百氏1",
            agencyCode: "40000000000002",
            expenditureAccount: "6000000000000002"
          },
          { agencyName: "景甜1", agencyCode: "40000000000003", expenditureAccount: "6000000000000003" }
        ],

        [
          {
            agencyName: "哇哈哈2",
            agencyCode: "40000000000001",
            expenditureAccount: "6000000000000001"
          },
          {
            agencyName: "乐百氏2",
            agencyCode: "40000000000002",
            expenditureAccount: "6000000000000002"
          },
          { agencyName: "景甜2", agencyCode: "40000000000003", expenditureAccount: "6000000000000003" }
        ],

        [
          {
            agencyName: "哇哈哈3",
            agencyCode: "40000000000001",
            expenditureAccount: "6000000000000001"
          },
          {
            agencyName: "乐百氏3",
            agencyCode: "40000000000002",
            expenditureAccount: "6000000000000002"
          },
          { agencyName: "景甜3", agencyCode: "40000000000003", expenditureAccount: "6000000000000003" }
        ],

        [
          {
            agencyName: "哇哈哈4",
            agencyCode: "40000000000001",
            expenditureAccount: "6000000000000001"
          },
          {
            agencyName: "乐百氏4",
            agencyCode: "40000000000002",
            expenditureAccount: "6000000000000002"
          },
          { agencyName: "景甜4", agencyCode: "40000000000003", expenditureAccount: "6000000000000003" }
        ]
      ];
      temp[val - 1].map(el => {
        this.agencyNameList.push({
          value: el.agencyName,
          agencyCode: el.agencyCode,
          expenditureAccount: el.expenditureAccount
        });
      });
      console.log(this.agencyNameList, "----------this.agencyNameList")
    },
    // 修改贴息机构状态
    handleStatus(row, onoff) {
      let params = {
        id: row.id,
        onoff: onoff
      }
      let text = (onoff == 1 ? "确认停用？" : "确认启用？")
      this.$confirm(text)
        .then(_ => {
          console.log('----------确认了')
          api.upDateDiscountAgencyStatus(params).then(res => {
            console.log(res, '------------res')
            if (res.code == 200) {
              this.getLists(this.baseParam)
              this.$message.success("状态修改成功");
            } else {
              this.$message.error(res.msg);
            }
            this.listLoading = false;
          });
        })
        .catch(err => {});
    },
    handleDetail(row) {
      this.resetForm()
      api.getDiscountAgencyDetail(row.id).then(res=> {
        if (res.code == 200) {
          // 这里还需要再测一下
          let temp = res.data
          this.ruleForm.agencyType = temp.agencyType
          this.ruleForm.agencyName = temp.agencyName
          this.ruleForm.agencyCode = temp.agencyCode
          this.ruleForm.expenditureAccount = temp.expenditureAccount
          this.ruleForm.remark = temp.remark
          this.ruleForm.discountAgencyAccountList = temp.discountAgencyAccountList
        }else {
          this.$message.error(res.msg)
        }
        this.dialogVisible1 = true;
      })
    },
    handleDelete(row) {
      this.$confirm("确认删除该条数据？")
        .then(_ => {
          api.deleteDiscountAgency(row.id).then(res => {
            console.log(res, '----------res删除')
            if (res.code == 200) {
              this.getLists(this.baseParam)
              this.$message.success("删除成功");
            } else {
              this.$message.error(res.msg);
            }
            this.listLoading = false;
          });
        })
        .catch(err => {});
    },
    openDialog() {
      this.resetForm()
      this.isAdd = true; //新增
      this.isDiabled = false;
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.resetForm()
      api.getDiscountAgencyDetail(row.id).then(res=> {
        if (res.code == 200) {
          // 这里还需要再测一下
          temp = res.data
          console.log(res, '----res')
          this.ruleForm.agencyType = temp.agencyType
          this.ruleForm.agencyName = temp.agencyName
          this.ruleForm.agencyCode = temp.agencyCode
          this.ruleForm.remark = temp.remark
          this.ruleForm.id = temp.id
          this.ruleForm.discountAgencyAccountList = temp.discountAgencyAccountList

          this.isDiabled = true;
          this.isAdd = false; //编辑
          this.agencyNameList = [];
          this.dialogVisible = true;
        }else {
          this.$message.error(res.msg)
        }
      })

        // let val = this.option.find(el=>{el.agencyType == row.agencyType})
        let val = 2;
        let temp = [
          [
            {
              agencyName: "哇哈哈1",
              agencyCode: "40000000000001",
              expenditureAccount: "6000000000000001"
            },
            {
              agencyName: "乐百氏1",
              agencyCode: "40000000000002",
              expenditureAccount: "6000000000000002"
            },
            {
              agencyName: "景甜1",
              agencyCode: "40000000000003",
              expenditureAccount: "6000000000000003"
            }
          ],

          [
            {
              agencyName: "哇哈哈2",
              agencyCode: "40000000000001",
              expenditureAccount: "6000000000000001"
            },
            {
              agencyName: "乐百氏2",
              agencyCode: "40000000000002",
              expenditureAccount: "6000000000000002"
            },
            {
              agencyName: "景甜2",
              agencyCode: "40000000000003",
              expenditureAccount: "6000000000000003"
            }
          ],

          [
            {
              agencyName: "哇哈哈3",
              agencyCode: "40000000000001",
              expenditureAccount: "6000000000000001"
            },
            {
              agencyName: "乐百氏3",
              agencyCode: "40000000000002",
              expenditureAccount: "6000000000000002"
            },
            {
              agencyName: "景甜3",
              agencyCode: "40000000000003",
              expenditureAccount: "6000000000000003"
            }
          ],

          [
            {
              agencyName: "哇哈哈4",
              agencyCode: "40000000000001",
              expenditureAccount: "6000000000000001"
            },
            {
              agencyName: "乐百氏4",
              agencyCode: "40000000000002",
              expenditureAccount: "6000000000000002"
            },
            {
              agencyName: "景甜4",
              agencyCode: "40000000000003",
              expenditureAccount: "6000000000000003"
            }
          ]
        ];
        temp[val - 1].map(el => {
          this.agencyNameList.push({
            value: el.agencyName,
            agencyCode: el.agencyCode,
            expenditureAccount: el.expenditureAccount
          });
        });
    },
    addRow() {
      this.ruleForm.discountAgencyAccountList.push({ pheadOffice: "", psubbranch: "", pcorrespondent: "", pbankcard: ""})
    },
    deleteRow(index) {
      this.ruleForm.discountAgencyAccountList.splice(index, 1)
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          if(this.isAdd) {
            // 新增
            api.addDiscountAgency(this.ruleForm).then(res=> {
            console.log(res, "---------res");

              if(res.code == 200) {
                  this.getLists(this.baseParam)
                  this.$message.success("操作成功");
              }else {
                  this.$message.error(res.msg);
              }
              this.dialogVisible = false;
              this.loading = false
            })
          }else {
            // 修改
            api.updateDiscountAgency(this.ruleForm).then(res=> {
              if(res.code == 200) {
                  this.getLists(this.baseParam)
                  this.$message.success("操作成功");
              }else {
                  this.$message.error(res.msg);
              }
              this.dialogVisible = false;
              this.loading = false
            })
          }
        }
      });
    },

    queryFundSearchAsync(queryString, cb) {
      this.isDiabled = false;
      this.ruleForm.agencyCode = "";
      this.ruleForm.expenditureAccount = "";
      let agencyNameList = this.agencyNameList;
      let results = queryString
        ? agencyNameList.filter(this.createFilter(queryString))
        : agencyNameList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        );
      };
    },
    handleAgencyNameSelect(item) {
      this.isDiabled = true;
      this.resetFields();
      this.ruleForm.agencyCode = item.agencyCode;
      this.ruleForm.expenditureAccount = item.expenditureAccount;
    },
    resetFields(type) {
      let fields = this.$refs.ruleForm.fields;
      fields.forEach(el => {
        if (type) {
          if (el.prop == "agencyName") {
            el.resetField();
            return;
          }
        }
        if (el.prop == "agencyCode") {
          el.resetField();
          return;
        }
        if (el.prop == "expenditureAccount") {
          el.resetField();
          return;
        }
      });
    },
    resetForm() {
      if (this.$refs.ruleForm) {
        this.ruleForm = Object.assign({}, this.defaultform)
        this.$refs.ruleForm.resetFields();
      }
    },
  }
};
</script>
<style lang="scss" scoped>
// @import "../../../styles/moreDetail/moudleDetail.scss";
// .path {
//   margin-left: 20px;
// }
// .header-content {
//   background-color: white;
//   border: 1px solid #999;
//   width: 100%;
//   height: 175px;
//   .search-content {
//     width: 100%;
//     height: 36px;
//     background-color: #2ea1ff;
//     .text {
//       line-height: 36px;
//       height: 36px;
//       text-align: center;
//       color: #ffffff;
//     }
//   }
//   .header-content-body {
//     background-color: white;
//     width: 100%;
//     height: 139px;
//     .itemTop {
//       margin-top: 10px;
//     }
//     .fl {
//       float: left;
//     }
//     .fr {
//       float: right;
//     }
//     .header-content-body-item {
//       margin-left: 45px;
//       width: 40%;
//       background-color: red;
//       height: 30px;
//       .text {
//         line-height: 30px;
//         height: 30px;
//         text-align: center;
//       }
//       .text-input {
//         margin-left: 10px;
//         width: 300px;
//       }
//     }
//   }
// }

// .common-page-dataList {
//   overflow: hidden;

//   .pthold {
//     padding-top: 20px;
//   }
// }


</style>

<style lang="scss">
@import "../../styles/basedialog/basedialog.scss";
.txjggl {
  .row-title {
    padding: 10px 0 5px 0;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 700;
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  }
  .discountAgencyAccountList {
    .el-form-item.is-required{
      margin-bottom: 22px
    }
    .el-form-item__error {
      color: #F56C6C;
    }
    .el-form-item__content {
      margin-left: 0px !important;
    }
    .el-table__row .cell input {
      padding-left: 15px!important; 
    }
  }
}

</style>


