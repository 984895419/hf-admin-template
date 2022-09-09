<template>
  <HfResizeSplitPane>
    <base-i18b-group-index-vue :cell-class-name="cellClassName" @row-click="rowClick" />
    <template #right>
      <base-i18n-locale-index-vue
        :group-id="selectRow ? selectRow.groupId : undefined"
        :group-name="selectRow ? selectRow.groupName : undefined"
      />
    </template>
  </HfResizeSplitPane>
</template>

<script>
    import BaseI18bGroupIndexVue from './index'
    import BaseI18nLocaleIndexVue from '../baseI18nLocale/index'
    import HfResizeSplitPane from '@/components/CURD/Effect/HfResizeSplitPane'
    export default {
        name: 'IndexSplit',
        components: { BaseI18nLocaleIndexVue, BaseI18bGroupIndexVue, HfResizeSplitPane },
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
                if (this.selectRow && this.selectRow.groupId === row.groupId) {
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
