<template>
  <div>
    <!-- 子表内容 -->
    <!-- 批量操作 -->
    <el-button v-model="handleAdd" size="mini" style="margin:0px 10px 10px 0" type="primary"
      icon="el-icon-circle-plus-outline" @click="handleAdd()">新增行</el-button>
    <el-dropdown :hide-on-click="false" trigger="click" v-if="conf.urlMethods.disableUrl
            && toggleRowSelectionArray.length > 0">
      <el-button>
        批量操作<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <!-- 下拉框 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">
          <template-confirm-btn :url="templateUrl(conf.urlMethods.enableUrl, toggleRowSelectionArray)"
            :btn-type="'text'" :label="$t('common.batchEnable')" :value="toggleRowSelectionArray" @success="doSearch" />
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">
          <template-confirm-btn :url="templateUrl(conf.urlMethods.disableUrl, toggleRowSelectionArray)"
            :btn-type="'text'" :value="toggleRowSelectionArray" :label="$t('common.batchDisable')"
            @success="doSearch" />
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline">
          <del-btn :url="templateUrl(conf.urlMethods.deleteUrl, toggleRowSelectionArray)"
            :value="toggleRowSelectionArray" :label="$t('common.batchDelete')" :btn-type="'text'" @success="doSearch" />
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">
          审核
          <!-- <examine :auditstatus="auditstatus" /> -->
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">
          <dialog-btn-page :type="'text'" :label="'导入'" :title="'导入'">
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
          </dialog-btn-page>
        </el-dropdown-item>
        <!-- 导出集合 -->
        <el-dropdown-item icon="el-icon-circle-check">
          <el-dropdown :hide-on-click="false" placement="bottom">
            <span class="el-dropdown-link">
              导出
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">
                <template-confirm-btn :url="templateUrl(conf.urlMethods.batchExportSelectUrl, toggleRowSelectionArray)"
                  :btn-type="'text'" :label="'选中导出'" @success="doSearch" />
              </el-dropdown-item>

              <el-dropdown-item icon="el-icon-circle-plus">
                <template-confirm-btn
                  :url="templateUrl(conf.urlMethods.batchExportSinglePageUrl, toggleRowSelectionArray)"
                  :btn-type="'text'" :label="'单页导出'" @success="doSearch" />
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">
                <template-confirm-btn :url="templateUrl(conf.urlMethods.batchExportAllUrl, toggleRowSelectionArray)"
                  :btn-type="'text'" :label="'全部导出'" @success="doSearch" />
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">
                <template-confirm-btn
                  :url="templateUrl(conf.urlMethods.batchExportTemplateUrl, toggleRowSelectionArray)" :btn-type="'text'"
                  :label="'模板导出'" @success="doSearch" />
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
import CurdMixin from '@/components/CURD/curd.mixin'
import TemplateConfirmBtn from '@/components/CURD/Btns/TemplateConfirmBtn'// 按钮弹窗
import DelBtn from '@/components/CURD/Btns/DelBtn'// 删除按钮
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'// 按钮弹窗
export default {
  name: 'EditTable',
  created() {
    this.doSearch()
  },
  mixins: [CurdMixin],
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
    },
    conf: {},
    toggleRowSelectionArray:{
      type:Array,
      default:[]
    }
  },
  watch:{
    toggleRowSelectionArray(oldval,val){
      console.log(oldval,val,"123123")
    }
  },
  components: {
    TemplateConfirmBtn,
    DelBtn,
    UploadExcelComponent,
    DialogBtnPage
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
    },
    doSearch() {

    },
    handleSuccess() {
      // 导入成功回调
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
  