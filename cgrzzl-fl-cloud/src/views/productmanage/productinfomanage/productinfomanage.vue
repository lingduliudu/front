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
              <el-table-column prop="agencyCode" label="产品编码" min-width="170"></el-table-column>
              <el-table-column prop="agencyName" label="产品名称" min-width="150"></el-table-column>
              <el-table-column prop="businessType" :formatter="businessTypefn" label="所属业务" min-width="150"></el-table-column>
              <el-table-column prop="expenditureAccount" :formatter="expenditureAccountfn" label="审核状态" min-width="150"></el-table-column>
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

              <el-table-column label="操作" min-width="120" align="left">
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
                  <el-button size="medium" type="text" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button size="medium" type="text" @click="handleDetail(scope.row)">查看</el-button>
                  <el-button size="medium" type="text" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </data-list>
        </el-tabs>
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
      otherFunc: [{ text: "+ 产品发布", func: this.productlaunch }],
      filterList: [
        {
          label: "产品编号:",
          type: "input",
          field: "agencyCode",
          size: "small"
        },
        {
          label: "产品名称:",
          type: "input",
          field: "agencyName",
          size: "small"
        },
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
          field: ["promisePayTimeStr", "promisePayTimeEnd"],
          size: "small"
        }
      ],
      activeName: "1",
      total: 0,
      listLoading: false,
      listData: [],
      api: api,
      row: {},
      option: [],
    };
  },
  created() {},
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
    productlaunch() {
        this.$router.push('/productmanage/productlaunch')
    },
    //查询
    getLists(param) {
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
    businessTypefn(val) {
      let state = ""
      switch (val.usinessType) {
        case 0:
          state = "启用";
          break;
        case 1:
          state = "停用";
          break;
      }
      return state;
    },
    expenditureAccountfn() {
      let state = ""
      switch (val.usinessType) {
        case 0:
          state = "启用";
          break;
        case 1:
          state = "停用";
          break;
      }
      return state;
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
        }else {
          this.$message.error(res.msg)
        }
        this.dialogVisible1 = true;
      })
    },
  }
};
</script>
<style lang="scss" scoped>

</style>

