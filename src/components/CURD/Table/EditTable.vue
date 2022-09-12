<template>
    
    <div>
      <el-table ref="mainTable" :size="size" :data="tableData" border :row-key="rowKey" v-bind="$attrs"
        :max-height="maxheight" v-on="$listeners">
        <slot />
      </el-table>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'EditTable',
    props: {
      tableData: { type: Array },
      rowKey: {
        type: String
      },
      maxheight: {
        default: 600,
        type: Number
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
  
  .el-table /deep/ thead tr th {
    &:first-child {
      .cell {
        padding-right: 14px;
      }
    }
  }
  
  .el-table /deep/ th>.cell {
    text-align: center;
  }
  
  .el-table /deep/ td div div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .el-table /deep/ td {
    &:last-child {
      div {
        div {
          white-space: normal;
          overflow: visible;
          text-overflow: normal;
        }
      }
    }
  }
  </style>
  