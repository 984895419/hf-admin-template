<template>
  <div>
    <simple-table
      v-loading="importTableLoading || loading"
      :table-fields="tableFields"
      :table-data="tableData"
      :table-item-option="{showSelected: true}"
      :element-loading-text="importTableLoading ? '正在导入中' : '正在加载中'"
    >
      <template v-slot:btn-area-right>
        <el-button :loading="loading" type="primary" icon="el-icon-refresh" @click="datasourceChangeHandler" />
      </template>
      <template v-slot:table-bottom-area="{ toggleRowSelectionArray }">
        <el-button
          v-if="toggleRowSelectionArray
            && toggleRowSelectionArray.length > 0"
          type="primary"
          @click="importTable(toggleRowSelectionArray)"
        >
          确认
        </el-button>
      </template>
      <template v-slot:btn-area-left="{ toggleRowSelectionArray }">
        <el-button
          v-if="toggleRowSelectionArray
            && toggleRowSelectionArray.length > 0"
          type="primary"
          @click="importTable(toggleRowSelectionArray)"
        >
          确认
        </el-button>
      </template>
    </simple-table>
  </div>
</template>

<script>
import * as conf from './api'
import SimpleTable from '@/components/CURD/Table/SimpleTable'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiGetMethod, baseApiPostMethod } from '@/components/CURD/baseApi'

export default {
  name: 'OriginTableInfo',
  components: { SimpleTable },
  props: {
    datasource: Object,
    baseUrl: String,
    closeDialog: Function
  },
  data() {
    return {
      conf: conf,
      value: undefined,
      loading: false,
      importTableLoading: false,
      tableFields: [
        {
          label: '表名',
          value: 'tableName',
          primaryKey: true
        },
        {
          label: '表备注',
          value: 'tableComment'
        },
        {
          label: '是否有主键',
          value: 'havePrimaryKey',
          type: 'select',
          children: [
            {
              label: '有',
              value: 1
            }, {
              label: '无',
              value: 0
            }
          ]
        }
      ],
      tableData: []
    }
  },
  watch: {
    datasource: {
      handler: () => this.datasourceChangeHandler(),
      deep: true
    }
  },
  created() {
    this.datasourceChangeHandler()
  },
  methods: {
    datasourceChangeHandler() {
      if (this.datasource) {
        this.loading = true
        baseApiPostMethod(this.conf.urlMethods.originUrl, this.datasource).then(resp => {
          this.loading = false
          if (isSuccessResult(resp)) {
            this.tableData = getData(resp)
          } else {
            this.$message.error(getMessage(resp))
          }
        }).catch(e => {
          this.loading = false
        })
      }
    },
    importTable(toggleRowSelectionArray) {
      baseApiGetMethod(this.conf.urlMethods.checkUrl,
        { tableInfos: toggleRowSelectionArray.map(s => s.tableName).join(',') }).then(resp => {
        if (isSuccessResult(resp)) {
          const allowTables = getData(resp)
          if (allowTables && allowTables.length > 0) {
            // 如果存在且两个不相等,则说明
            const h = this.$createElement
            this.$confirm(h('div', [allowTables.map(s => (h('p', s))), '导入以上不存在的表?']), '导入提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.postData(allowTables)
            })
          } else {
            this.$message.warning('这些表单都已同步')
          }
        }
      })
    },
    postData(allowTables) {
      this.importTableLoading = true
      baseApiPostMethod(this.conf.urlMethods.syncUrl,
        {
          ...this.datasource,
          tableInfos: allowTables
        }).then(res => {
        if (isSuccessResult(res)) {
          this.$message.success(getMessage(res))
          this.$emit('success')
          if (this.closeDialog) {
            this.closeDialog()
          }
        } else {
          this.$message.error(getMessage(res))
        }
        this.importTableLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
