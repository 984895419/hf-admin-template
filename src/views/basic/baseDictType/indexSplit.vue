<template>
  <el-row>
    <el-col :span="12">
      <base-dict-type-index-vue :cell-class-name="cellClassName" @row-click="rowClick" />
    </el-col>
    <el-col :span="12">
      <base-dict-value-index-vue
        :code="selectRow ? selectRow.code : undefined"
        :name="selectRow ? selectRow.name : undefined"
      />
    </el-col>
  </el-row>
</template>

<script>
    import BaseDictTypeIndexVue from './index'
    import BaseDictValueIndexVue from '../baseDictValue/index'
    export default {
        name: 'IndexSplit',
        components: { BaseDictValueIndexVue, BaseDictTypeIndexVue },
        data() {
            return {
                selectRow: null
            }
        },
        methods: {
            rowClick(row, column, event) {
              this.selectRow = row
            },
            cellClassName({ row, column, rowIndex, columnIndex }) {
                if (this.selectRow && this.selectRow.code === row.code) {
                    return 'success-row'
                }
            }
        }
    }
</script>

<style scoped>
  /deep/ .el-table .success-row {
    background: #f0f9eb;
  }
</style>
