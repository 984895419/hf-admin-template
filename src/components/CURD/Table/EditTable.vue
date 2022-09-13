<template>
  <div>
    <!-- 子表内容 -->
    <!-- 批量操作 -->
    <el-button size="mini" style="margin:0px 10px 10px 0" type="primary" icon="el-icon-circle-plus-outline"
      @click="handleAdd()">新增行</el-button>
    <el-dropdown :hide-on-click="false" trigger="click" v-if="conf.urlMethods.disableUrl
    && toggleRowSelectionArray.length > 0">
      <el-button>
        批量操作<i class="el-icon-arrow-down el-icon--right" />
      </el-button>

      <!-- 下拉框 -->
      <el-dropdown-menu slot="dropdown">
        <!-- 删除 -->
        <el-dropdown-item icon="el-icon-circle-plus-outline">
          <del-btn :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
            :value="toggleRowSelectionArray" :label="$t('common.batchDelete')" :btn-type="'text'" />
        </el-dropdown-item>
        <!-- 其他批量操作拓展 -->
        <slot name="dropdownList"></slot>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 主表内容 -->
    <el-table ref="editMainTable" :size="size" :data="tableData" border :row-key="rowKey" v-bind="$attrs"
      :max-height="maxheight" v-on="$listeners" @selection-change="selectionChange">
      <slot></slot>
      <operate-table-column>
        <template slot-scope="scope">
          <!-- 主表基本操作  可拓展 -->
          <slot name="operation" :row="scope.row">
            <el-button size="mini" type="text" v-if="!scope.row.editable"
              @click="valChange(scope.row,scope.$index,true)">{{ $t('common.edit') }}</el-button>
            <el-button size="mini" type="text" v-else @click="valChange(scope.row,scope.$index,true)">{{
            $t('common.save') }}</el-button>
            <el-button size="mini" style="color:red" type="text" v-if="!scope.row.editable"
              @click="handleDelete(scope.$index, scope.row)">{{ $t('common.delete') }}</el-button>
            <el-button size="mini" style="color:red" type="text" v-else
              @click="valChange(scope.row,scope.$index,false)">{{ $t('common.cancel') }}</el-button>
          </slot>
        </template>
      </operate-table-column>
    </el-table>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
import CurdMixin from '@/components/CURD/curd.mixin'
import DelBtn from '@/components/CURD/Btns/DelBtn'// 删除按钮
import OperateTableColumn from '@/components/CURD/Table/column/OperateTableColumn'
import { deepClone } from '@/utils'
export default {
  name: 'EditTable',
  created() { },
  data() {
    return {
      toggleRowSelectionArray: []
    }
  },
  mixins: [CurdMixin],
  props: {
    tableData: {
      type: Array,
      default: []
    },
    rowKey: {
      type: String
    },
    maxheight: {
      default: 300,
      type: Number
    },
    conf: {
      type: Object
    },
    rowData: {
      type: Object,
      default: {}
    }
  },
  components: {
    DelBtn, OperateTableColumn
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
    /**
    * 选中后处理的事件
    * @param section
    */
    selectionChange(section) {
      this.toggleRowSelectionArray = section
    },
    // 添加
    handleAdd() {
      const row = deepClone(this.rowData)
      this.tableData.push(row)
      this.$emit("handleAddBtn", this.tableData)
    },
    //修改
    valChange(row, index, qx) {
      console.log(this.tableData, "this.tableData")
      //点击修改，判断是否已经保存所有操作
      for (let i of this.tableData) {
        if (i.editable && i.id != row.id) {
          this.$message({
            message: '请保存',
            type: 'warning'
          });
          return false
        }
      }
      //是否是取消操作
      if (!qx) {
        if (!this.tableData) {
          this.tableData.splice(index, 1)
        }
        return (row.editable = !row.editable)
      }
      //提交数据
      if (row.editable) {
        console.log('tableData.sel', this.rowData)
        const v = this.rowData
        // 必填项判断(预留)
        if (v.code == '' || v.name == '') {
          this.$message({
            message: '请填写必填项',
            type: 'warning'
          });
        } else {
          row.editable = false
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }
      } else {
        row.editable = true
      }
    },
    // 删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.tableData.splice(index, 1)
    },

  }
}
</script>
  
<style scoped lang="less">
.sonTableBtn {
  display: flex;
  justify-content: flex-end;
}

.el-table /deep/ .el-table__row td:not(.is-hidden):last-child {
  border-left: 1px solid #EBEEF5;
}

/deep/ .el-dropdown-menu__item {
  display: flex;
  align-items: center;
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
  