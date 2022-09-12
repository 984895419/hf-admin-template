<template>
  <div>
    <!-- 子表内容 -->
    <el-button v-model="handleAdd" size="mini" style="margin:0px 10px 10px 0" type="success" round plain
      @click="handleAdd()">{{$t('common.add')}}</el-button>
    <el-dropdown :hide-on-click="false" trigger="click">
      <el-button>
        批量操作<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <!-- 下拉框 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">
          启用
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">
          禁用
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline">
          删除
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">
          审核
          <!-- <examine :auditstatus="auditstatus" /> -->
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">
          导入
        </el-dropdown-item>
        <!-- 导出集合 -->
        <el-dropdown-item icon="el-icon-circle-check">
          <el-dropdown :hide-on-click="false" placement="bottom">
            <span class="el-dropdown-link">
              导出
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">
                选中导出
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">
                单页导出
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">
                全部导出
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">
                模板导出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 主表内容 -->
    <el-table ref="editMainTable" :size="size" :data="tableData.col" border :row-key="rowKey" v-bind="$attrs"
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
    tableData: {
      default: function () {
        return {
          sel: null, // 选中行
          col: []
        }
      }
    },
    rowKey: {
      type: String
    },
    maxheight: {
      default: 300,
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
      if (this.$refs.editMainTable && vals) {
        // 清空选中
        this.$refs.editMainTable.clearSelection()
        const valData = this.valTableData(vals)
        for (const ind in valData) {
          // 在选中
          this.$refs.editMainTable.toggleRowSelection(valData[ind], flag || true)
        }
      }
    },
    // 添加
    handleAdd() {
      for (let i of this.tableData.col) {
        if (i.editable) {
          return this.Message(
            this.$t('basicData.device.propDlg.pleSave'),
            'warning'
          )
        }
      }
      console.log(this.tableData, "1")
      const row = {
        GoodsCode: '',
        GoodsName: '',
        Specifications: '',
        GoodsUnit: '',
        QuantityRequired: '',
        id: '',
        UnitPrice: '',
        money: '',
        stock: '',
        editable: true
      }
      this.tableData.col.push(row)
      this.tableData.sel = row
      this.$emit("handleAddBtn", this.tableData)
    },


    // 导入前判断
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '文件大于1M 请重新上传',
        type: 'warning'
      })
      return false
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
  