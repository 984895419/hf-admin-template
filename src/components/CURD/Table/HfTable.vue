<template>
  <el-table
    ref="mainTable"
    :size="$store.size"
    :data="tableData"
    border
    :rowKey="rowKey"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-table>
</template>

<script>
export default {
    name: 'HfTable',
    props: {
        tableData: Array,
        rowKey: {
            type: String
        }
    },
    computed: {
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

<style scoped>

</style>
