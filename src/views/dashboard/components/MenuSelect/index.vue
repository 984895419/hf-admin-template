<template>
  <el-container
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <el-main>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form
            ref="searchForm"
            :rules="rules"
            :model="searchForm"
            label-width="80px"
          >
            <el-row>
              <el-col :span="4">
                <el-form-item
                  :label="$t('common.menu.metaTitle')"
                  prop="metaTitle"
                >
                  <el-input
                    v-model="searchForm.metaTitle"
                    :placeholder="$t('common.menu.metaTitle')"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button
                    v-if="hasPerm('/menu/queryMenus')"
                    class="filter-item"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleSearch"
                  >
                    {{ $t('common.common.search') }}
                  </el-button>
                  <el-button
                    v-if="hasPerm('/menu/queryMenus')"
                    class="filter-item"
                    type="danger"
                    icon="el-icon-reset"
                    @click="handleReset"
                  >
                    {{ $t('common.common.reset') }}
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            ref="menuTable"
            v-loading="listLoading"
            :data="data.list"
            tooltip-effect="dark"
            height="36vh"
            :row-style="{padding:'0px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{padding:'0px'}"
            :header-cell-style="{padding:'0px'}"
            border
            fit
            highlight-current-row
            @row-dblclick="handleDbClick"
          >
            <el-table-column
              :label="$t('common.menu.metaTitle')"
              prop="metaTitle"
              align="center"
              min-width="110"
              show-overflow-tooltip
            />
            <el-table-column
              :label="$t('common.menu.location')"
              prop="location"
              align="center"
              min-width="110"
              show-overflow-tooltip
            />
          </el-table>
          <pagination
            v-show="data.total>0"
            :total="data.total"
            :page.sync="pageData.pageNum"
            :limit.sync="pageData.pageSize"
            :page-sizes="[10, 50, 100, 1000]"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { fetchMenuList } from '@/api/menu'
import Pagination from '@/components/Pagination'
import { messageErrorHandle } from '@/utils/message-handle'
import { specificationRegExp } from '@/utils/validate'
import { isEmpty } from 'element-ui/src/utils/util'

export default {
  name: 'MenuSelect', // 组件名称  Pascal命名法
  components: { Pagination },
  props: {
    param: {
      type: Object,
      default: () => {
      }
    }
  },
  data() { // vue 数据函数，可以理解为对象属性
    return {
      multipleSelection: [], // 表格 勾选记录
      multipleSelectData: [], // 表格 勾选记录详细，用于导出
      /**
       * 空的查询表单，用于重置的时候的复制
       */
      emptySearchForm: {
        metaTitle: ''
      },
      /**
       * 搜索表单字段
       */
      searchForm: {
        metaTitle: ''
      },
      rules: { // 校验规则
        metaTitle: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ]
      },
      /**
       * 列表字段
       */
      data: {
        list: [],
        total: 0
      },
      /**
       * 加载中是否显示
       */
      listLoading: false,
      /**
       * 分页数据
       */
      pageData: {
        pageNum: 1,
        pageSize: 10
      },
      /**
       * 全屏加载中是否显示
       */
      fullscreenLoading: false
    }
  },
  /**
   * 组件加载时调用；可以理解为初始化函数
   */
  created() {
    this.getList()
  },
  /**
   * 可以理解为组件成员方法
   */
  methods: {

    setFormData() {
      this.data.list = []
      this.data.total = 0
      this.multipleSelection = []
      this.multipleSelectData = []
      this.handleReset()
      this.getList()
      const _this = this
      this.$nextTick(() => { // 操作列错位
        _this.$refs.menuTable.doLayout()
      })
    },
    /**
     * 查询
     */
    getList() {
      let param = this.param
      if (isEmpty(param)) {
        param = {}
      }
      param = Object.assign(param, this.searchForm, this.pageData)
      this.listLoading = true
      const _this = this
      fetchMenuList(param).then(response => {
        if (response.res === '1') {
          _this.data.list = response.obj.list
          _this.data.total = response.obj.total
        } else {
          messageErrorHandle(_this, response, _this.$t('common.table.search'))
        }
        _this.listLoading = false
      }).catch(() => {
        _this.data.list = []
        _this.data.total = 0
        _this.listLoading = false
      })
    },
    /**
     * 搜索按钮触发时间
     */
    handleSearch() {
      this.$refs.searchForm.validate((valid) => { // 校验
        if (valid) {
          this.pageData.pageNum = 1
          this.pageData.pageSize = 10
          this.getList()
        }
      })
    },
    /**
     * 重置查询条件
     */
    handleReset() {
      for (const key in this.searchForm) {
        if (this.emptySearchForm[key]) {
          this.searchForm[key] = this.emptySearchForm[key]
        } else {
          this.searchForm[key] = ''
        }
      }
    },
    handleDbClick(row, column, event) { //
      this.$emit('submit-menu', row)
    }
  }
}
</script>

<style scoped>
/* 按钮右靠齐*/
.operate-nav {
  margin-bottom: 10px;
  direction: rtl;
}
</style>
