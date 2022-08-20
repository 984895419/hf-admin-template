<template>
  <div>
    <el-table ref="mainTable" v-if="tableData" :size="size" :data="tableData" border :row-key="rowKey" v-bind="$attrs"
      :max-height="maxheight" v-on="$listeners">
      <slot />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HfTable',
  props: {
    tableData: Array,
    rowKey: {
      type: String
    },
    maxheight: {
      type: String,
      default: '600px'
    }
  },
  computed: {
    ...mapGetters([
      'size'
    ]),
    valTableData() {
      return (vals) => {
        const sectionIds = vals ? vals.map(s => s[this.rowKey]) : []
        return this.tableData.filter(s => sectionIds.indexOf(s[this.rowKey]) >= 0)
      }
    }
  },
  methods: {
    toggleRowSelection(vals, flag) {
      if (this.$refs.mainTable && vals) {
        // 清空选中
        this.$refs.mainTable.clearSelection()
        const valData = this.valTableData(vals)
        for (const ind in valData) {
          // 在选中
          this.$refs.mainTable.toggleRowSelection(valData[ind], flag || true)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.el-table /deep/ .el-table__row td:not(.is-hidden):last-child {
  border-left: 1px solid #EBEEF5;
}

.el-table /deep/ thead th:not(.is-hidden):last-child {
  border-left: 1px solid #e4e7ec;
}

.el-table /deep/ th>.cell {
  text-align: center;
}
</style>
