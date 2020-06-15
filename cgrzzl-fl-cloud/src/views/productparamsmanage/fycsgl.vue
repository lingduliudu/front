<template>
  <div>
    <layout-main-view :breadcrumb="breadcrumblist">
      <!-- 将文件名作为最外层类名，为避免相互影响如果直接复制文件请务必更改最外层类名-->
      <div class="common-page-dataList fycsgl">
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
              <el-table-column prop="costCode" label="费应编码" min-width="150"></el-table-column>
              <el-table-column prop="costName" label="费用名称" min-width="150"></el-table-column>
              <el-table-column prop="remark" label="备注说明" min-width="150"></el-table-column>
              <el-table-column prop="onoff" :formatter="statusfn" label="启用状态" min-width="150"></el-table-column>
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
          :title="isAdd ? '新增指标参数' : '编辑指标参数'"
          :visible.sync="dialogVisible"
          width="800px"
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
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="费用编码:" prop="costCode">
                    <el-input
                      disabled
                      v-model.trim="ruleForm.costCode"
                      placeholder="请输入费用编码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="费用名称:" prop="costName">
                    <el-input v-model.trim="ruleForm.costName" placeholder="请输入费用名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="有效期" prop="isLongTerm">
                    <el-checkbox v-model="islong" @change="handelCheckbox">长期</el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="islong === false">
                  <el-form-item label="时间选择" prop="expirydate">
                    <el-date-picker
                      v-model="ruleForm.expirydate"
                      @change='expirydatefn'
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
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
        <el-dialog title="查看指标参数" :visible.sync="dialogVisible1" width="800px" class="base-dialog">
          <div class="common-style">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="info-key">费用编码:</span>
                <span class="info-value index">{{ruleForm.costCode}}</span>
              </el-col>
              <el-col :span="12">
                <span class="info-key">费用名称:</span>
                <span class="info-value index">{{ruleForm.costName}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <span class="info-key">备注说明:</span>
                <span class="info-value index">{{ruleForm.remark}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="dialog-footer">
            <span slot="footer">
              <el-button @click="dialogVisible1 = false">确 定</el-button>
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
      otherFunc: [{ text: "+ 新增费用参数", func: this.openDialog }],
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
        costCode: "fycs001", //先写死
        costName: "",
        isLongTerm: 0,
        expirydate: "",
        cycleStart: "",
        cycleEnd: "",
        remark: ""
      },
      rules: {
        costCode: [{ required: true, message: "请选择费用编码", trigger: "blur" }],
        costName: [
          { required: true, message: "请选择费用名称", trigger: "blur" },
          { max: 20, message: "费用名称为20位以内有效字符" }
        ],
        isLongTerm: [{ required: true, message: "请选择费编码", trigger: "change" }],
        expirydate: [{ required: true, message: "请选择有效期", trigger: "change" }],
      },
      islong: true, //有效期默认长期有效，
    };
  },
  created() {
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
      api.getFactoryCostList(param).then(res => {
        // console.log(res, '----------res查询列表')
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
      var state = "";
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
    expirydatefn(val) {
      if(val) {
        this.ruleForm.cycleStart = val[0]
        this.ruleForm.cycleEnd = val[1]
      }else {
        this.ruleForm.cycleStart = ''
        this.ruleForm.cycleEnd = ''
      }
    },
    handelCheckbox() {
      // 选框切换状态时清空日期
      // let fields = this.$refs.ruleForm.fields;
      // fields.forEach(el => {
      //   if (el.prop == "expirydate") {
      //     el.resetField();
      //     return;
      //   }
      // });
      if(this.islong) {
        this.ruleForm.isLongTerm = 0
      }else {
        this.ruleForm.isLongTerm = 1
      }
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
          api.upDateFactoryCostStatus(params).then(res => {
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
      api.getFactoryCostDetail(row.id).then(res=> {
        if (res.code == 200) {
          // 这里还需要再测一下
          let temp = res.data
          this.ruleForm.costCode = temp.costCode
          this.ruleForm.costName = temp.costName
          this.ruleForm.remark = temp.remark
          this.dialogVisible1 = true;
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    handleDelete(row) {
      this.$confirm("确认删除该条数据？")
        .then(_ => {
          api.deleteFactoryCost(row.id).then(res => {
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
      // 费用编码从后台获取
      this.islong = true
      this.isAdd = true; //新增
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.resetForm()
      api.getFactoryCostDetail(row.id).then(res=> {
        if (res.code == 200) {
          // 这里还需要再测一下
          let temp = res.data
          console.log(res, '----res')
          this.ruleForm.costName = temp.costName
          this.ruleForm.costCode = temp.costCode
          this.ruleForm.remark = temp.remark
          this.ruleForm.cycleStart = temp.cycleStart
          this.ruleForm.cycleEnd = temp.cycleEnd
          // this.ruleForm.expirydate = [moment(temp.cycleStart).format('YYYY-MM-DD'), moment(temp.cycleEnd).format('YYYY-MM-DD')]
          this.ruleForm.expirydate = [temp.cycleStart, temp.cycleEnd]
          this.ruleForm.isLongTerm = temp.isLongTerm
          if(temp.isLongTerm == 0) {
            this.islong = true
          }else if(temp.isLongTerm == 1) {
            this.islong = false 
          }
          this.ruleForm.id = temp.id
          this.isAdd = false;  //编辑
          this.dialogVisible = true;
          console.log(this.ruleForm, '----------this.ruleForm')
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 提交前现格式化时间
          this.ruleForm.cycleStart = moment(this.ruleForm.cycleStart).format('YYYY-MM-DD')
          this.ruleForm.cycleEnd = moment(this.ruleForm.cycleEnd).format('YYYY-MM-DD')
          if(this.isAdd) {
            // 新增
            console.log(this.ruleForm, "---------this.ruleForm");
            api.addFactoryCost(this.ruleForm).then(res=> {
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
            api.updateFactoryCost(this.ruleForm).then(res=> {
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
.fycsgl {
  // 日期选择器宽度设置
  .el-range-editor.el-input__inner {
    width: 100%;
  }
}
</style>