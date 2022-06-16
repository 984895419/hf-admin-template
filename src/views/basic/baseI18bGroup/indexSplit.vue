<template>
  <el-row>
    <el-col :span="12">
      <base- @row-click="rowClick" :cell-class-name="cellClassName"/>
    </el-col>
    <el-col :span="12">
      <base-dict-value-index-vue
        :code="selectRow ? selectRow.code : undefined"
         :name="selectRow ? selectRow.name : undefined"/>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: 'indexSplit',
        data(){
            return {
                selectRow: null
            }
        },
        methods: {
            rowClick(row, column, event) {
              this.selectRow = row
            },
            cellClassName({ row, column, rowIndex, columnIndex }) {
                if (this.selectRow === row) {
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
