<template>
  <el-dropdown
    ref="dragDropdown"
    :size="$store.size"
    trigger="click"
    :hide-on-click="false"
  >
    <el-button
      type="primary"
      icon="el-icon-s-grid"
      :size="$store.size"
    >
      +{{ checkedTableFieldsLength }}
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <el-button
          v-if="checkedTableFieldsLength < copyTableFields.length"
          :size="$store.size"
          type="text"
          @click="doChangeState(true)"
        >
          全选
        </el-button>
        <el-button
          v-if="checkedTableFieldsLength > 0"
          :size="$store.size"
          type="text"
          @click="doChangeState(false)"
        >
          取消
        </el-button>
      </el-dropdown-item>
      <div class="drag-down-items">
        <el-dropdown-item v-for="item in copyTableFields" :key="item.value" class="drag-down-item">
          <el-checkbox
            v-model="item.selectChecked"
            :size="$store.size"
            @change="changeCheckedState(item)"
          >{{
            item.label
          }}
          </el-checkbox>
          <i class="el-icon-rank" style="margin-left: 10px" />
        </el-dropdown-item>
      </div>
      <el-dropdown-item>
        <el-button :size="$store.size" type="text" @click="doSaveMyColumnInfos">保存为常用</el-button>
        <el-button :size="$store.size" type="text" style="float: right" @click="doRest">重置</el-button>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>/**
 * 表单字段选择
 * TODO 保存为常用的配置：
 * - 查询逻辑
 * 1、在created中根据tableId查询对应的表单字段
 * 2、将结果和tableFields进行合并
 * - 保存逻辑
 * - 将字段进行转化，将结果保存起来
 */
import { deepClone } from '@/utils'
import { saveMyColumnInfos } from '@/api/columnInfo'
import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import Sortable from 'sortablejs'

export default {
  name: 'TableColumnSelect',
  props: {
    tableFields: Array,
    tableId: String,
    myTableFields: Array,
    value: Array
  },
  data() {
    return {
      /**
       * 初始化的时候的配置
       */
      copyTableFields: deepClone(this.tableFields),
      /**
       * 初始化的字段
       */
      initTableFields: null,
      /**
       * 我的初始化字段
       */
      myInitTableFields: null,
      /**
       * emitInput是否马上响应变化
       */
      immediately: true
    }
  },
  computed: {
    /**
     * 计算属性，用来计算tableFields中有几个字段被选中进行显示的
     * @returns {number}
     */
    checkedTableFieldsLength() {
      const res = []
      if (this.copyTableFields) {
        for (const ind in this.copyTableFields) {
          if (this.copyTableFields[ind].selectChecked === true) {
            res.push(this.copyTableFields[ind])
          }
        }
      }
      return res.length
    }
  },
  created() {
    // 初始化，从远程查询字段
    this.mergeFieldShow(this.myTableFields)
    // 保存为初始配置
    this.doInit()
    // 初始化输出
    this.emitValue()
    this.$nextTick(() => {
      // 初始化拖拽
      this.setSort()
    })
  },
  methods: {
    /**
     * 更新状态
     * @param newState
     */
    doChangeState(newState) {
      this.immediately = false
      this.copyTableFields.forEach((item) => {
        this.$set(item, 'selectChecked', newState)
      })
      this.immediately = true
      this.emitValue()
    },
    /**
     * 合并字段的显示操作
     * @param myFields
     */
    mergeFieldShow(myFields) {
      const myFieldsMap = {}
      if (myFields) {
        for (const ind in myFields) {
          myFieldsMap[myFields[ind].value] = myFields[ind]
        }
      } else {
        for (const ind in this.copyTableFields) {
          if (this.copyTableFields[ind].expand !== true) {
            this.$set(this.copyTableFields[ind], 'selectChecked',
              this.copyTableFields[ind].selectChecked || true)
          }
        }
        return
      }
      if (this.copyTableFields) {
        for (const ind in this.copyTableFields) {
          this.$set(this.copyTableFields[ind], 'selectChecked',
            (myFieldsMap[this.copyTableFields[ind].value] && myFieldsMap[this.copyTableFields[ind].value].selectChecked) ||
            this.copyTableFields[ind].selectChecked || true)
        }
      }
    },
    changeCheckedState(item) {
      this.emitValue()
    },
    /**
     * 初始化
     */
    doInit() {
      // 拷贝为初始的字段
      if (this.copyTableFields) {
        this.initTableFields = deepClone(this.copyTableFields)
      }
      if (this.myTableFields) {
        this.myInitTableFields = deepClone(this.myTableFields)
      }
    },
    /**
     * 重置
     */
    doRest() {
      // 初始化，从远程查询字段
      // 对tableFields所有字段进行赋初始值
      if (this.initTableFields) {
        const intiValue = {}
        this.initTableFields.forEach((item) => {
          intiValue[item.value] = item.selectChecked
        })
        this.copyTableFields.forEach((item) => {
          this.$set(item, 'selectChecked', intiValue[item.value] === true)
        })
      }
      this.mergeFieldShow(this.myInitTableFields)
      this.emitValue()
      this.$message({
        message: '重置成功',
        type: 'success'
      })
    },
    /**
     * 保存字段信息
     */
    doSaveMyColumnInfos() {
      saveMyColumnInfos(this.copyTableFields).then(resp => {
        if (isSuccessResult(resp)) {
          this.$message({
            message: getMessage(resp),
            type: 'success'
          })
        } else {
          this.$message({
            message: getMessage(resp),
            type: 'danger'
          })
        }
      })
    },
    /**
     * 输出要显示的字段
     */
    emitValue() {
      if (this.immediately === true) {
        const res = this.copyTableFields.filter(s => s.selectChecked)
        this.$emit('input', res)
        this.$emit('selectedChange', res)
      }
    },
    /**
     * 对字段进行排序
     */
    setSort() {
      const el = this.$refs.dragDropdown.$el.querySelectorAll('.drag-down-items')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        onEnd: evt => {
          const targetRow = this.copyTableFields.splice(evt.oldIndex, 1)[0]
          this.copyTableFields.splice(evt.newIndex, 0, targetRow)
          if (targetRow.selectChecked === true) {
            this.emitValue()
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
