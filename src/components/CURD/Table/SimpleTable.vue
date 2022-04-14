<template>
  <el-card style="margin-top: 10px">
    <slot name="btn-header-area">
      <el-row v-if="$attrs['show-btn-area'] !== false">
        <el-col :span="24" class="area-left">
          <slot name="btn-area-left" />
          <div style="float: right">
            <div style="display: inline-block;">
              <table-column-select
                v-model="showTableFields"
                :table-fields="tableFields"
                @selectedChange="selectedChange"
              />
            </div>
          </div>
          <div style="float:right">
            <div
              v-if="$slots['btn-area-right']"
              style="display: inline-block;"
              class="area-right"
            >
              <slot name="btn-area-right" />
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
          border
          style="width: 100%"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <el-table-column v-if="notInFinallyShowTableFields.length > 0" type="expand">
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
            type="index"
            width="50"
          />
          <el-table-column
            v-if="tableItemOption && tableItemOption.showSelected"
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
            min-width="100"
          >
            <template slot-scope="scopeRow">
              <div class="col-btn-display">
                <slot :data="scopeRow.row" name="col-btn" />
              </div>
            </template>
          </el-table-column>
        </el-table>
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
    <el-row v-if="$slots['pageInfo']" style="margin-top: 10px">
      <el-col :span="24">
        <slot name="pageInfo" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import TableColumnSelect from '@/components/CURD/Table/TableColumnSelect'
import TableColumnItem from '@/components/CURD/Table/TableColumnItem'

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
    tableItemOption: Object
  },
  data() {
    return {
      open: false,
      showTableFields: [],
      notInFinallyShowTableFields: [],
      finallyShowTableFields: this.tableFields || [],
      reRending: false
    }
  },
  methods: {
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
        if (this.showTableFields) {
          columns = this.showTableFields.map(t => t.value)
        }
        this.notInFinallyShowTableFields = this.tableFields.filter(s => (columns.indexOf(s.value) < 0 && s.expand === true))
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
