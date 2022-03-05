<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <el-form
      ref="searchForm"
      :rules="rules"
      :model="searchForm"
      label-width="100px"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item
            :label="$t('common.log.menuName')"
            prop="logName"
          >
            <el-input
              v-model="searchForm.menuName"
              :placeholder="$t('common.log.menuName')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('common.log.userName')"
            prop="userName"
          >
            <el-input
              v-model="searchForm.userName"
              :placeholder="$t('common.log.userName')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            :label="$t('common.log.logDesc')"
            prop="logDesc"
          >
            <el-input
              v-model="searchForm.logDesc"
              :placeholder="$t('common.log.logDesc')"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('common.log.operateTime')">
            <el-date-picker
              v-model="operateTimeList"
              type="datetimerange"
              align="right"
              :start-placeholder="$t('common.common.beginTime')"
              :end-placeholder="$t('common.common.endTime')"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          :offset="4"
        >
          <el-form-item>
            <el-button
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
            >
              {{ $t('common.common.search') }}
            </el-button>
            <el-button
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
      v-loading="listLoading"
      :data="data.list"
      tooltip-effect="dark"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        :label="$t('common.log.operateType')"
        prop="operateType"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.method')"
        prop="method"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.menuName')"
        prop="menuName"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.logContent')"
        prop="logContent"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.logDesc')"
        prop="logDesc"
        align="center"
        min-width="110"
        show-overflow-tooltip
      >
        <template slot-scope="rowData">
          <el-button
            type="text"
            size="mini"
            @click="handleDetail(rowData)"
          >
            {{ $t('common.common.detail') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.log.operateTime')"
        prop="operateTime"
        :formatter="dateFormat"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.userIp')"
        prop="userIp"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.url')"
        prop="url"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.userName')"
        prop="userName"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('common.log.userCode')"
        prop="userCode"
        align="center"
        min-width="110"
        show-overflow-tooltip
      />
      <el-table-column
        class-name="status-col"
        :label="$t('common.log.isSuccess')"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isSuccess=='1'?'是':'否' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogFormVisible"
      :title="$t('common.common.detail')"
      width="60vw"
      :close-on-click-modal="false"
    >
      <textarea
        v-model="logDescDetail"
        style="width: 100%; height: 60vh"
      />
    </el-dialog>
    <pagination
      v-show="data.total>0"
      :total="data.total"
      :page.sync="pageData.pageNum"
      :limit.sync="pageData.pageSize"
      :page-sizes="[10, 50, 100, 1000]"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { fetchLogList } from '@/api/log'
import Pagination from '@/components/Pagination'
import elDragDialog from '@/directive/el-drag-dialog'
import { specificationRegExp } from '@/utils/validate'
import { parseTime } from '@/utils/index.js'
import { messageErrorHandle } from '@/utils/message-handle'
import { isEmpty } from 'element-ui/src/utils/util'

export default {
  name: 'LogList',
  directives: { elDragDialog },
  components: { Pagination },
  data() {
    return {
      /**
       * 空的查询表单，用于重置的时候的复制
       */
      operateTimeList: [],
      emptySearchForm: {
        userName: '',
        menuName: '',
        logDesc: ''
      },
      /**
       * 搜索表单字段
       */
      searchForm: {
        userName: '',
        menuName: '',
        logDesc: ''
      },
      /**
       * 列表字段
       */
      data: {
        list: [],
        total: 0
      },
      rules: {
        userName: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        menuName: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ],
        logDesc: [
          { pattern: specificationRegExp, message: this.$t('common.validate.pleaseInputLegal'), trigger: 'change' }
        ]

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
       * 新增编辑的弹框显示与否
       */
      dialogFormVisible: false,
      logDescDetail: '',
      fullscreenLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /* 日期处理*/
    dateFormat: function(row, column) {
      const date = row[column.property]
      if (isEmpty(date)) {
        return ''
      }
      return parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
    },
    /**
     * 查询
     */
    getList() {
      this.listLoading = true
      let param = {}
      if (this.operateTimeList.length > 0) {
        param.beginTime = this.operateTimeList[0]
        param.endTime = this.operateTimeList[1]
      }
      param = Object.assign(param, this.searchForm, this.pageData)
      const _this = this
      fetchLogList(param).then(response => {
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
    handleDetail(rowData) {
      this.logDescDetail = rowData.row.logDesc
      this.dialogFormVisible = true
    },
    /**
     * 搜索按钮触发时间
     */
    handleSearch() {
      this.pageData.pageNum = 1
      this.pageData.pageSize = 10
      this.getList()
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
    }
  }
}
</script>

<style scoped>
.log-nav {
  margin-bottom: 10px;
  direction: rtl;
}
</style>
