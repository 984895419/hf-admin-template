<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <div class="">{{ dataList.roleName }}绑定用户</div>
    <el-row>
      <el-col :span="3">
        <tree-search :data="companydepartsdata" @treeNodeval="treeNodeval" />
      </el-col>
      <el-col :span="21">
        <hfBaseUserInfo />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import hfBaseUserInfo from '@/views/basic/hfBaseUserInfo'
import TreeSearch from '../oa/TreeSearch.vue'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
export default {
  components: { hfBaseUserInfo, TreeSearch },
  props: {
    dataList: []
  },
  data() {
    return {
      filterText: '',
      companydepartsdata: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      /**
     * 加载中是否显示
     */
      listLoading: false,
      /**
      * 列表字段
      */
      data: {
        list: [],
        total: 0
      },
      tableData: [],
      searchForm: {
        userCode: '',
        userName: '',
        deptName: '',
        companyName: ''
      },
      currentPage4: 4,
      pageData: {
        pageNum: 1,
        pageSize: 10
      },
      fullscreenLoading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getCompanyDeparts()

    this.init()
  },
  methods: {
    filterNode(value, data) {
      console.log(value, data, 33)
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    handleClick(row) {
      console.log(row)
    },
    treeNodeval(data) {
      console.log(data, 'treedata')
      let param = {}
      param = Object.assign(this.searchForm, this.pageData)

      baseApiGetMethod('/api/hfBaseUserInfo/nameQuery', param).then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.data.list = resp.data.list
            this.data.total = resp.data.total
            console.log(resp.data, 111)
          }
        }
      )
    },

    // 一页多个
    handleSizeChange(val) {
      this.pageData.pageSize = val
      this.init()
    },
    // 翻页
    handleCurrentChange(val) {
      this.pageData.pageNum = val
      this.init()
    },
    // 通用
    getBaseUserInfo(val) {
      this.listLoading = true
      baseApiGetMethod('/api/hfBaseUserInfo/nameQuery', val).then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.listLoading = false
            this.data.list = resp.data.list
            this.data.total = resp.data.total
          }
        }
      )
    },
    // 获取公司与部门
    getCompanyDeparts() {
      baseApiGetMethod('/api/hfBaseCompanyInfo/companyDeparts').then(
        (resp) => {
          this.fullscreenLoading = true
          if (resp.retCode === '00001') {
            this.companydepartsdata = resp.data.companyInfos
            this.fullscreenLoading = false
          }
        }
      )
    },
    // 从NC同步用户信息
    syncNcData() {
      // syncNcInfoData().then((resp) => {
      //   this.listLoading = true
      //   if (resp.retCode === '00001') {
      //     this.listLoading = false
      //     this.$message({ message: resp.message, type: 'success' })
      //   }
      // })
    },
    // 初始化数据
    init() {
      let param = {}
      const pageInfos = {
        pageInfo: {
          pageNo: this.pageData.pageNum,
          pageSize: this.pageData.pageSize
        }
      }
      param = Object.assign(pageInfos)
      this.getBaseUserInfo(param)
    },
    handleSelectionChange() {
      alert('未选择')
    }

  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.app-container {

  .content-rt {
    padding: 20px 0 0 0;
    box-sizing: border-box;

    /deep/ .el-input__inner {
      height: 28px;
      line-height: 36px;
    }

    /deep/ .el-form-item__label {
      font-size: 12px;
    }
  }

  .accout-nav {
    float: right;
    margin-bottom: 20px;
  }
}
</style>
