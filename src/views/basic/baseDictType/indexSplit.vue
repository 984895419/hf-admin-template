<template>
  <HfResizeSplitPane>
    <template v-slot="{width}" timestampProps="">
      <base-dict-type-index-vue :fixed="width > 300" :cell-class-name="cellClassName" @row-click="rowClick" />
    </template>
    <div slot="right">
      <base-dict-value-index-vue
        :code="selectRow ? selectRow.code : undefined"
        :name="selectRow ? selectRow.name : undefined"
      />
    </div>
  </HfResizeSplitPane>
</template>
<script>
    import BaseDictTypeIndexVue from './index'
    import BaseDictValueIndexVue from '../baseDictValue/index'
    import HfResizeSplitPane from '@/components/CURD/Effect/HfResizeSplitPane'
    export default {
        name: 'IndexSplit',
        components: { BaseDictValueIndexVue, BaseDictTypeIndexVue, HfResizeSplitPane },
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
