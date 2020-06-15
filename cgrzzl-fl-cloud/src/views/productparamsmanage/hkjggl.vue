<template>
  <div>
    <layout-main-view :breadcrumb="breadcrumblist">
      <!-- 将文件名作为最外层类名，为避免相互影响如果直接复制文件请务必更改最外层类名-->
      <div class="common-page-dataList">
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
              <el-table-column prop="intervalCode" label="间隔编码" min-width="150"></el-table-column>
              <el-table-column prop="period" label="还款间隔" min-width="150"></el-table-column>
              <el-table-column prop="intervalUnit" label="间隔单位" min-width="150"></el-table-column>
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
                  <el-form-item label="间隔单位:" prop="intervalUnit">
                    <el-select
                      v-model="ruleForm.intervalUnit"
                      popper-class="account-select-option"
                      placeholder="请选择间隔单位"
                    >
                      <el-option
                        v-for="(item,index) in options1"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="还款间隔:" prop="period">
                    <el-input v-model.trim="ruleForm.period" placeholder="请输入还款间隔"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="备注说明:" prop="remark">
                    <el-input class="remark" type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
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
        <el-dialog
          title="查看指标参数"
          :visible.sync="dialogVisible1"
          width="800px"
          class="base-dialog"
        >   
          <div class="common-style">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="info-key">间隔编码: </span>
                <span class="info-value index">{{ruleForm.intervalCode}}</span>
              </el-col>
              <el-col :span="12">
                <span class="info-key">还款间隔: </span>
                <span class="info-value index">{{ruleForm.period}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <span class="info-key">间隔单位: </span>
                <span class="info-value index">{{ruleForm.intervalUnit}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <span class="info-key">备注说明: </span>
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
      otherFunc: [{ text: "+ 新增还款间隔", func: this.openDialog }],
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
      options1: [
        { name: 'D-天', value: 1 },
        { name: 'W-周', value: 2 },
        { name: 'M-月', value: 3 },
      ],
      defaultform: {},
      ruleForm: {
        intervalUnit: '',
        period: '',
        remark: '',
      },
      rules: {
          period: [
            { required: true, message: '请输入还款间隔', trigger: 'blur'},
            { pattern: /^[1-9]\d{0,19}$/, message: "还款间隔为20位以内有效数字" }
          ],
          intervalUnit: [{ required: true, message: '请选择间隔单位', trigger: 'change'},]
      },
    };
  },
  created() {
  },
  mounted() {
    this.showtab = this.$route.params.state;
  },
  computed: {
    // 操作完成后用当前页面参数更新列表数据
    baseParam() {
      let baseParam = {pageNum: this.$route.query.pageNum, pageSize: this.$route.query.pageSize}
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
      api.getRepaymentIntervalList(param).then(res => {
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
    statusfn(val){
      var state=''
      switch (val.status) {
        case 0:
          state = "启用";
          break;
        case 1:
          state = "停用";
          break;
      }
      return state
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
          api.upDateRepaymentIntervalStatus(params).then(res => {
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
      api.getRepaymentIntervalDetail(row.id).then(res=> {
        if (res.code == 200) {
          // 这里还需要再测一下
          let temp = res.data
          this.ruleForm.intervalCode = temp.intervalCode
          this.ruleForm.intervalUnit = temp.intervalUnit
          this.ruleForm.period = temp.period
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
          api.deleteRepaymentInterval(row.id).then(res => {
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
      this.isAdd = true //新增
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.resetForm()
      api.getRepaymentIntervalDetail(row.id).then(res=> {
        if (res.code == 200) {
          // 这里还需要再测一下
          let temp = res.data
          console.log(res, '----res')
          this.ruleForm.intervalCode = temp.intervalCode
          this.ruleForm.intervalUnit = temp.intervalUnit
          this.ruleForm.period = temp.period
          this.ruleForm.remark = temp.remark
          this.ruleForm.id = temp.id

          this.isAdd = false; //编辑
          this.dialogVisible = true;
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          if(this.isAdd) {
            // 新增
            console.log(this.ruleForm, "---------this.ruleForm");
            api.addRepaymentInterval(this.ruleForm).then(res=> {
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
            api.updateRepaymentInterval(this.ruleForm).then(res=> {
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
</style>