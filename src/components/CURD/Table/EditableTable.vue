<template>
  <el-card style="margin-top: 10px">
    <el-row>
      <el-col :span="12">
        <el-select v-model="selectField" placeholder="选择字段进行批量设置">
          <el-option
            v-for="item in this.updatableFields"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <form-item-render
          v-if="selectFieldItem"
          style="display: inline-block;max-width: 200px;margin-left: 10px"
          :value="obj"
          :item="selectFieldItem"
        />
        <el-button
          v-if="toggleRowSelectionArray && toggleRowSelectionArray.length > 0"
          type="primary"
          style="margin-left: 10px"
          @click="doSetAll()"
        >
          批量设置
        </el-button>
      </el-col>
      <el-col :span="12">
        <div style="float: right">
          <slot name="btn-header-area" />
          <el-button v-if="batchUpdateUrl" type="primary" @click="doSave">批量保存</el-button>
          <el-button type="primary" @click="recoverAll">全部重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-form
      ref="form"
      :size="$store.size"
      :model="formData"
    >
      <el-table
        ref="mainTable"
        :size="$store.size"
        :data="formData.tableData"
        :cell-class-name="cellClassName"
        v-bind="$attrs"
        v-on="{ ...{
            'selection-change': this.handleSelectionChange
        }, ...$listeners}"
      >
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        />
        <el-table-column v-for="item in editFields" :key="item.value" :prop="item.vaue" :label="item.label">
          <template v-slot="scopeRow">
            <el-form-item
              :prop="'tableData.' + scopeRow.$index + '.' + item.value"
              v-bind="item.labelProps"
            >
              <form-item-render :value="scopeRow.row" :item="item" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template slot-scope="scopeRow">
            <el-button type="text" @click="recoverRow(scopeRow.row)">重置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-card>
</template>

<script>

import FormItemRender from '@/components/CURD/Add/FormItemRender'
import { deepClone } from '@/utils'
import { baseApiPutMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'

export default {
  name: 'EditableTable',
  components: { FormItemRender },
  props: {
    /**
     * 表单数据
     */
    tableData: Array,
    /**
     * 可编辑的字段
     */
    editableFields: Array,
    /**
     * 批量保存按钮
     */
    batchUpdateUrl: {
      type: String,
      required: true
    },
    /**
     * 防呆二次确认，默认不需要
     */
    needConfirm: {
      type: Boolean,
      default: false
    },
    templateUrl: Function
  },
  data() {
    return {
      selectField: undefined,
      obj: {},
      formData: {
        tableData: deepClone(this.tableData)
      },
      toggleRowSelectionArray: []
    }
  },
  computed: {
    editFields() {
      if (this.editableFields) {
        return this.editableFields.filter(s =>
          (s.updateConfig && s.updateConfig.updatable === true) ||
          s.primaryKey === true)
      }
      return []
    },
    updatableFields() {
      if (this.editableFields) {
        return this.editableFields.filter(s =>
          (s.updateConfig && s.updateConfig.updatable === true))
      }
      return []
    },
    selectFieldItem() {
      if (this.selectField) {
        return this.editableFields.filter(s => s.value === this.selectField)[0]
      }
      return undefined
    }
  },
  methods: {
    /**
     * 设置所有的
     */
    doSetAll() {
      this.toggleRowSelectionArray.forEach(t => {
        this.$set(t, this.selectField, this.obj[this.selectField])
      })
    },
    /**
     * 有更改的单元格样式
     * @param row
     * @param column
     * @param rowIndex
     * @param columnIndex
     * @returns {string|string}
     */
    cellClassName({ row, column, rowIndex, columnIndex }) {
      const originRow = this.tableData[rowIndex]
      // 此处-1是因为select多选框占了一列
      const fields = this.editFields[columnIndex - 1]
      if (fields === undefined) {
        return ''
      }
      if (row[fields.value] === originRow[fields.value]) {
        return ''
      }
      return 'warning-row'
    },
    /**
     * 还原某一列的值
     * @param row
     */
    recoverRow(row) {
      const index = this.formData.tableData.indexOf(row)
      if (index >= 0) {
        const originRow = this.tableData[index]
        for (const ind in row) {
          this.$set(row, ind, originRow[ind])
        }
      }
    },
    /**
     * 还原所有的
     */
    recoverAll() {
      this.formData.tableData = deepClone(this.tableData)
    },
    /**
     * 保存操作
     */
    doSave() {
      const ary = this.trimNoEditor()
      if (ary != null && ary.length > 0) {
        if (this.needConfirm) {
          // 需要提示，则弹窗提示
          this.$confirm('共有' + ary.length + '条记录有修改，确认是否提交', {
            cancelButtonText: '取消',
            confirmButtonText: '提交',
            type: 'warning'
          }).then(() => {
            this.putToServer(ary)
          })
        } else {
          this.putToServer(ary)
        }
      } else {
        this.$message.warning('没有检测有修改的记录，无需保存')
      }
    },
    /**
     * 发送到服务端
     * @param ary
     */
    putToServer(ary) {
      baseApiPutMethod(this.batchUpdateUrl, ary).then(resp => {
        if (isSuccessResult(resp)) {
          const data = getData(resp)
          if (data === true) {
            this.$emit('success')
            this.$message.success(getMessage(resp))
          } else {
            this.$message.error('操作失败')
          }
        } else {
          this.$message.error(getMessage(resp))
        }
      })
    },
    /**
     * 剔除没有编辑的行
     */
    trimNoEditor() {
      const ary = []
      for (const ind in this.formData.tableData) {
        const newObj = this.formData.tableData[ind]
        const originObj = this.tableData[ind]
        for (const attr in originObj) {
          if (originObj[attr] !== newObj[attr]) {
            ary.push(newObj)
            break
          }
        }
      }
      return ary
    },
    /**
     * 选中后处理的事件
     * @param section
     */
    handleSelectionChange(section) {
      this.toggleRowSelectionArray = section
    }
  }
}
</script>

<style scoped>
/deep/ .el-table .warning-row {
  background: oldlace;
}
</style>
