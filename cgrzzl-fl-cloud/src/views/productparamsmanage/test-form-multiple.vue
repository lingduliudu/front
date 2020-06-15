<template>
  <div>
    <layout-main-view :breadcrumb="breadcrumblist">
      <!-- 将文件名作为最外层类名，为避免相互影响如果直接复制文件请务必更改最外层类名-->
      <div class="common-page-dataList">
        <el-tabs type="border-card" v-model="activeName" class="n-tabs">
          <el-form :model="ruleForm" :rule="rules" ref="ruleForm">
            <el-form-item label="生效日期:" prop="effectiveDate" :rules="rules.effectiveDate">
              <el-date-picker
                v-model="ruleForm.effectiveDate"
                type="date"
                placeholder="请选择生效日期">
              </el-date-picker>
            </el-form-item>

            <el-table
              :data="ruleForm.evidenceTemplateList"
              :header-cell-style="headerStyle"
              highlight-current-row
              style="width: 100%;"
            >
              <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
              <el-table-column label="贷款期限" min-width="170">
                <template slot-scope="scope">
                  <el-form-item :prop="'evidenceTemplateList.' + scope.$index + '.loanPeriod'" :rules="rules.loanPeriod">
                    <el-select
                      v-model="scope.row.loanPeriod"
                      placeholder="请选择贷款期限"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="ratePA" label="年化利率(%)" min-width="170">
                <template slot-scope="scope">
                  <el-form-item :prop="'evidenceTemplateList.' + scope.$index + '.ratePA'" :rules="rules.ratePA">
                    <el-input  v-model="scope.row.ratePA" placeholder="请输入年化利率"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="260" align="left">
                <template slot-scope="scope">
                  <!-- <h1>{{"index:" + scope.$index}}</h1>
                  <h1>{{"length:" + ruleForm.evidenceTemplateList.length}}</h1> -->
                  <el-button size="medium" type="text" @click="handleDelete(scope.row)">删除</el-button>
                  <el-button 
                    v-if="scope.$index != 0" 
                    style="margin-left: 20px;" size="medium" icon="el-icon-top" type="text" 
                    @click="handleUp(scope.$index)">上移</el-button>
                  <el-button 
                  v-if="scope.$index != ruleForm.evidenceTemplateList.length - 1" 
                  style="margin-left: 20px;" size="medium" icon="el-icon-bottom" type="text" 
                  @click="handleDown(scope.$index)">下移</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-button type="primary" @click="addRow">新增</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-tabs>
      </div>
    </layout-main-view>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      breadcrumblist: [],
      isShowAll: false,
      isHedden: false,
      loading: false,
      filterList: [
      ],
      activeName: "1",
      listLoading: false,
      ruleForm: {
        effectiveDate: '',
        evidenceTemplateList: [
          {loanPeriod: '', ratePA: ''}
        ],
      },
      rules:{
        effectiveDate:[
          { required: true, message: '请选择生效日期', trigger: 'change'}
        ],
        loanPeriod:[
          { required: true, message: '请选择贷款期限', trigger: 'change'}
        ],
        ratePA:[
          { required: true, message: '请输入年化利率', trigger: 'blur'}
        ]
      },
      options: [
        {label: '1年期', value: 1},
        {label: '2年期', value: 2},
        {label: '3年期', value: 3},
        {label: '4年期', value: 4},
        {label: '5年期', value: 5},
      ],
			removeSealDescriptionIdArray:[],//要删除的table每一行 的SealDescriptionId数组
    };
  },
  created() {
  },
  mounted() {
    this.showtab = this.$route.params.state;
  },
  methods: {
    filterShowAll() {
      this.isShowAll = !this.isShowAll;
    },
    headerStyle({ row, rowIndex }) {
      return { background: "#FAFAFA" };
    },
    addRow() {
      this.ruleForm.evidenceTemplateList.push({loanPeriod: '', ratePA: ''})
    },
    handleDelete(row) {
      this.ruleForm.evidenceTemplateList.splice(row.$index, 1)
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {

        }
      })
      console.log(this.ruleForm, '-------this.ruleForm')
    },
    handleUp(index) {
      let temp = this.ruleForm.evidenceTemplateList[index]
      console.log(temp, '-------temp')
      this.ruleForm.evidenceTemplateList.splice(index, 1)
      this.ruleForm.evidenceTemplateList.splice(index - 1, 0, temp)
    },
    handleDown(index) {
      let temp = this.ruleForm.evidenceTemplateList[index]
      console.log(temp, '-------temp')
      console.log(index, '-------index')
      this.ruleForm.evidenceTemplateList.splice(index, 1)
      this.ruleForm.evidenceTemplateList.splice(index + 1, 0, temp)
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/
.el-form {
  .el-table {
    .el-form-item__error {
      color: #F56C6C!important;
    }
    .el-input__inner {
      padding: 0 15px!important;
    }
  }
  
}
</style>
