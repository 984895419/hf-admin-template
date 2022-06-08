<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" style="float: right" @click="openDialog">导入</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <simple-table
          :table-fields="tableFields"
          :table-data="value"
          :table-item-option="{ ...tableItemOption}"
          v-bind="$attrs"
          :max-height="400"
          highlight-current-row
          v-on="$listeners"
        >
          <template v-slot:btn-area-right>
            <el-button
              v-if="value && value.length > 0"
              type="danger"
              icon="el-icon-delete"
              @click="deleteTheDatas"
            >清空
            </el-button>
          </template>
          <template v-slot:col-btn="{data}">
            <el-button type="text" icon="el-icon-delete" @click="deleteTheData(data)" />
          </template>
        </simple-table>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="showDialog"
      width="75%"
      append-to-body
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
    >
      <div style="margin-top: 10px">
        <slot :data="value" :closeDialog="closeDialog">
          <div v-if="!(baseUrl)">
            没有配置参照的请求地址baseUrl属性
          </div>
          <div v-else-if="!tableConfig">
            没有配置参照的列表配置tableConfig属性
          </div>
          <div v-else>
            <refer-table-data
              ref="refTableData"
              :base-url="baseUrl"
              :table-config="myTableConfig"
              :url-methods="urlMethods"
              v-bind="$attrs"
              :toggle-row-selection="initData"
              :unique-column="uniqueColumn"
              :fixed-condition="fixedCondition"
            />
            <div style="direction: rtl;margin-top: 10px">
              <el-button type="primary" @click="doEnsure">确认</el-button>
            </div>
          </div>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SimpleTable from '@/components/CURD/Table/SimpleTable'
import ReferTableData from '@/components/CURD/referTableData'
import { deepClone } from '@/utils'

export default {
  name: 'MultipleRefer',
  components: { ReferTableData, SimpleTable },
  props: {
    /**
     * 字段
     */
    tableFields: Array,
    tableItemOption: Object,
    /**
     * 值
     */
    value: Array,
    /**
     * 基础的url
     */
    baseUrl: {
      type: [String]
    },
    /**
     * 表单的配置
     */
    tableConfig: {
      type: Object
    },
    /**
     * url地址: {
     *   pageUrl: // 分页查询地址，
     *   addUrl: // 添加时候的url
     *   updateUrl: // 更新时候的u'r'l
     *   queryUrl: // 查询单条时候的url
     * }
     */
    urlMethods: {
      type: Object
    },
    /**
     * 判重字段
     */
    uniqueColumn: {
      type: String,
      default: 'id'
    },
    /**
     * 删除前的确认操作
     */
    deleteBefore: Function,
    /**
     * 固定的查询条件
     */
    fixedCondition: [Object, Array]
  },
  data() {
    return {
      initData: deepClone(this.value || []),
      showDialog: false
    }
  },
  computed: {
    myTableConfig() {
      return Object.assign({}, this.tableConfig, {
        tableItemOption: {
          showSelected: true
        }
      })
    }
  },
  methods: {
    /**
     * 打开弹框
     */
    openDialog() {
      this.initData = deepClone(this.value || [])
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.refTableData.triggerSelection()
      })
    },
    /**
     * 关闭弹框
     */
    closeDialog() {
      this.showDialog = false
    },
    /**
     * 去确认
     */
    doEnsure() {
      this.$emit('input', this.initData)
      this.$emit('success', this.initData)
      this.closeDialog()
    },
    /**
     * 删除某个数据
     * @param row
     */
    deleteTheData(row) {
      if (this.deleteBefore) {
        this.deleteBefore(row, () => {
          if (this.value.indexOf(row) >= 0) {
            this.value.splice(this.value.indexOf(row), 1)
          }
        })
      } else {
        this.$confirm('确认删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            debugger
          if (this.value.indexOf(row) >= 0) {
            this.value.splice(this.value.indexOf(row), 1)
          }
          this.$emit('input', this.value)
          this.$emit('success', this.value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    /**
     * 清空
     */
    deleteTheDatas() {
      if (this.deleteBefore) {
        this.deleteBefore(this.value, () => {
          this.value.splice(0, this.value.length)
        })
      } else {
        this.$confirm('确认清空所有记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.value.splice(0, this.value.length)
          this.$emit('input', this.value)
          this.$emit('success', this.value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
