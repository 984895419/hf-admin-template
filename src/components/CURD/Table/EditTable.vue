<template>
  <div>
    <!-- 子表内容 -->
    <!-- 批量操作 -->
    <el-button
      size="mini"
      style="margin:0px 10px 10px 0"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="handleAdd()"
    >新增行</el-button>
    <el-dropdown
      v-if="conf.urlMethods.disableUrl
        && toggleRowSelectionArray.length > 0"
      :hide-on-click="false"
      trigger="click"
    >
      <el-button>
        批量操作<i class="el-icon-arrow-down el-icon--right" />
      </el-button>

      <!-- 下拉框 -->
      <el-dropdown-menu slot="dropdown">
        <!-- 删除 -->
        <el-dropdown-item icon="el-icon-circle-plus-outline">
          <del-btn
            :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
            :value="toggleRowSelectionArray"
            :label="$t('common.batchDelete')"
            :btn-type="'text'"
            @success="doSearch"
          />
        </el-dropdown-item>
        <!-- 其他批量操作拓展 -->
        <slot name="dropdownList" />
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 主表内容 -->
    <el-table
      ref="editMainTable"
      :size="size"
      :data="tableData"
      border
      :row-key="rowKey"
      v-bind="$attrs"
      :max-height="maxheight"
      v-on="$listeners"
      @selection-change="selectionChange"
    >
      <slot />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurdMixin from '@/components/CURD/curd.mixin'
import DelBtn from '@/components/CURD/Btns/DelBtn'// 删除按钮
import { deepClone } from '@/utils'
export default {
  name: 'EditTable',
  components: {
    DelBtn
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
  data() {
    return {
      toggleRowSelectionArray: []
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
      this.$emit('handleAddBtn', this.tableData)
    }
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

