<template>
  <el-card style="margin-top: 10px">
    <slot name="btn-header-area">
      <el-row v-if="$attrs['show-btn-area'] !== false">
        <el-col :span="24" class="area-left">
          <slot
            name="btn-area-left"
            :toggleRowSelectionArray="toggleRowSelectionArray"
            :showSelected="tableItemOption && tableItemOption.showSelected"
          />
          <div style="float: right">
            <div style="display: inline-block;margin-right: 10px">
              <table-column-select
                v-model="showTableFields"
                :table-fields="tableFields"
                @selectedChange="selectedChange"
              />
            </div>
          </div>
          <div style="float:right">
            <div
              v-if="$scopedSlots['btn-area-right']"
              style="display: inline-block;"
              class="area-right"
            >
              <slot
                name="btn-area-right"
                :toggleRowSelectionArray="toggleRowSelectionArray"
                :showSelected="tableItemOption && tableItemOption.showSelected"
              />
            </div>
          </div>
        </el-col>
      </el-row>
    </slot>
    <el-row v-if="finallyShowTableFields != null && finallyShowTableFields.length > 0">
      <el-col :span="24">
        <el-table
          ref="mainTable"
          :size="$store.size"
          :data="tableData"
          :row-key="primaryKeyName"
          border
          :lazy="$attrs['tree-grid'] === true && $attrs['tree-grid-lazy'] === true"
          :load="loadChildren"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          style="width: 100%"
          v-bind="$attrs"
          v-on="{ ...{
            'selection-change': this.handleSelectionChange
          }, ...$listeners}"
        >
          <el-table-column
            v-if="showExpand === true || notInFinallyShowTableFields.length > 0"
            label="展开"
            type="expand"
          >
            <template slot-scope="props">
              <slot name="expand-area" :data="props.row">
                <el-row>
                  <el-col v-for="item in notInFinallyShowTableFields" :key="item.value" :span="6">
                    {{ item.label }}: {{ props.row[item.value] }}
                  </el-col>
                </el-row>
              </slot>
            </template>
          </el-table-column>
          <el-table-column
            v-if="tableItemOption && (tableItemOption.showIndex === true)"
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            v-if="tableItemOption && tableItemOption.showSelected"
            label="选择"
            type="selection"
            width="55"
          />
          <table-column-item
            v-for="item in finallyShowTableFields"
            :key="item.value"
            :item="item"
          />
          <el-table-column
            v-if="tableItemOption && (tableItemOption.showItemOperate !== false)"
            fixed="right"
            label="操作"
            width="150"
          >
            <template slot-scope="scopeRow">
              <div class="col-btn-display">
                <slot :data="scopeRow.row" name="col-btn" />
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <el-button type="text">更多操作
                      <i class="el-icon-arrow-down" />
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <slot name="col-btn-dropdown" :data="scopeRow.row" />
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="$attrs['table-bottom-area'] !== false" style="float: right;margin-top: 10px">
          <slot
            name="table-bottom-area"
            :toggleRowSelectionArray="toggleRowSelectionArray"
            :showSelected="tableItemOption && tableItemOption.showSelected"
          />
        </div>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col :span="24">
        <el-alert
          v-if="!(reRending === true)"
          title="请选择要展示的字段"
          type="warning"
          :closable="false"
          center
          show-icon
        />
      </el-col>
    </el-row>
    <el-row v-if="$scopedSlots['pageInfo']" style="margin-top: 10px">
      <el-col :span="24">
        <slot name="pageInfo" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import TableColumnSelect from '@/components/CURD/Table/TableColumnSelect'
import TableColumnItem from '@/components/CURD/Table/TableColumnItem'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'

/**
 * TODO 排序字段的查询
 */
export default {
  name: 'SimpleTable',
  components: { TableColumnItem, TableColumnSelect },
  props: {
    /**
     * 表单数据
     */
    tableData: Array,
    /**
     * 表单字段
     */
    tableFields: Array,
    /**
     * 表单选项
     */
    tableItemOption: Object,
    /**
     * 树形结构子项查询
     */
    listUrl: String,
    /**
     * 显示扩展信息
     */
    showExpand: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: false,
      showTableFields: [],
      notInFinallyShowTableFields: [],
      finallyShowTableFields: this.tableFields || [],
      reRending: false,
      toggleRowSelectionArray: []
    }
  },
  computed: {
    /**
     * 主键名
     */
    primaryKeyName() {
      return this.tableFields.filter(s => s.primaryKey === true)[0].value
    }
  },
  methods: {
    /**
     * 选择变化
     * @param res
     */
    selectedChange(res) {
      // 最终显示的字段
      this.finallyShowTableFields = []
      // 扩展显示的字段
      this.notInFinallyShowTableFields = []
      // 标记为重新渲染中
      this.reRending = true
      // 此处需要延迟一小段时间，否则没有效果
      setTimeout(() => {
        this.finallyShowTableFields = res
        // 标记为重新渲染中
        this.reRending = false
        let columns = []
        if (this.finallyShowTableFields) {
          columns = this.finallyShowTableFields.map(t => t.value)
        }
        this.notInFinallyShowTableFields = this.tableFields.filter(s => {
            return (columns.indexOf(s.value) < 0 && s.tableConfig && s.tableConfig.expand === true)
          }
        )
        this.$emit('colSelectedChange')
      }, 50)
    },
    toggleRowSelection(vals, flag) {
      if (this.$refs.mainTable) {
        // 清空选中
        this.$refs.mainTable.clearSelection()
        for (const ind in vals) {
          // 在选中
          this.$refs.mainTable.toggleRowSelection(vals[ind], flag || true)
        }
      }
    },
    /**
     * 选中后处理的事件
     * @param section
     */
    handleSelectionChange(section) {
      this.toggleRowSelectionArray = section
    },
    /**
     * 加载子项
     */
    loadChildren(row, treeNode, resolve) {
      if (this.$attrs['tree-grid'] === true && this.$attrs['tree-grid-lazy'] === true) {
        if (this.listUrl) {
          const data = { parentId: row.id }
          baseApiGetMethod(this.listUrl, data).then(resp => {
            if (isSuccessResult(resp)) {
              resolve(resp.data)
            } else {
              this.$message.error(getMessage(data))
            }
          })
        } else {
          this.$message.warning('加载子项失败')
        }
      }
    }
  }
}
</script>

<style scoped>
/deep/ .el-row + .el-row {
  margin-top: 5px;
}

/deep/ .area-right > div {
  display: inline-block;
  margin-left: 10px;
}

/deep/ .area-left > div, .btn-area > div {
  display: inline-block;
  margin-right: 10px;
}

/deep/ .col-btn-display > div,
.col-btn-display > .el-button {
  display: inline-block;
  margin-right: 10px;
}
</style>
