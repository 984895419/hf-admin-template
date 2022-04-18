<template>
  <el-form-item
    v-if="conditionEval"
    :label="item.label"
    :prop="item.value"
    v-bind="item.labelProps"
    :rules="item.rules"
  >
    <!-- 如果没有配置，默认所有addShowable的字段都可以填写 -->
    <div v-if="!item.createConfig || item.createConfig.addable !== false">
      <!-- 下拉 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="value[item.value]"
        clearable
        v-bind="item.props"
        :placeholder=" item.placeholder ||`请选择${item.label}`"
      >
        <el-option
          v-for="option in item.children"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        />
      </el-select>
      <!-- 级联 -->
      <el-date-picker
        v-else-if="item.type === 'picker'"
        v-model="value[item.value]"
        clearable
        :placeholder="item.placeholder || '选择日期'"
        v-bind="item.props || { type: 'date' }"
      />
      <el-cascader
        v-else-if="item.type === 'cascader'"
        v-model="value[item.value]"
        :options="item.options"
      />
      <!--数字 -->
      <el-input
        v-else-if="item.inputType === 'number'"
        v-model="value[item.value]"
        clearable
        v-bind="item.props"
        :placeholder="item.placeholder || `请输入${ item.label}`"
      />
      <!--文本-->
      <el-input
        v-else-if="item.type === 'text'"
        v-model="value[item.value]"
        clearable
        v-bind="item.props"
        :placeholder="item.placeholder || `请输入${item.label}`"
      />

      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="value[item.value]"
        v-bind="item._props"
      />
      <div v-else-if="item.type === 'switchSet'">
        <!-- 切换栏选项设置 -->
        <el-row>
          <el-col :span="12">
            选中文本
          </el-col>
          <el-col :span="12">
            <el-input v-model="value[item.value].activeText" />
          </el-col>
          <el-col :span="12">
            选中的值
          </el-col>
          <el-col :span="12">
            <el-input v-model="value[item.value].activeValue" />
          </el-col>
          <el-col :span="12">
            未选中的文本
          </el-col>
          <el-col :span="12">
            <el-input v-model="value[item.value].inactiveText" />
          </el-col>
          <el-col :span="12">
            为选中的值
          </el-col>
          <el-col :span="12">
            <el-input v-model="value[item.value].inactiveValue" />
          </el-col>
        </el-row>
      </div>
      <div v-else-if="item.type === 'table'">
        <el-button type="primary" @click="addRow">新增</el-button>
        <el-table :data="value[item.value]">
          <el-table-column
            v-for="head in item.tableHeader"
            :key="head.value"
            :prop="head.value"
            :label="head.label"
          >
            <template slot-scope="scopeRow">
              <el-input v-model="scopeRow.row[head.value]" type="text" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="50"
          >
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteRow(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- TODO 其他类型的添加-->
      <dynamic-refer v-else :item="item" />
    </div>
    <div v-else>
      <span v-if="item.type === 'select'">
        {{ labelOption(value[item.value]) }}
      </span>
      <span v-else>
        {{ value[item.value] }}
      </span>
    </div>
  </el-form-item>
</template>

<script>

export default {
  name: 'ConfigFormItem',
  components: {
    'DynamicRefer': {
      props: {
        item: Object
      },
      render(createElement, context) {
        const it = this.item
        return createElement('div', it.label + ':' + it.value)
      }
    }
  },
  props: {
    /**
     * 查询字段定义
     */
    item: Object,
    value: Object
  },
  computed: {
    labelOption() {
      return function(val) {
        if (this.item.children) {
          for (const ind in this.item.children) {
            const tag = this.item.children[ind]
            if (tag.value === val) {
              return tag.label
            }
          }
        }
        return val
      }
    },
    conditionEval() {
      if (this.item.condition) {
        const value = this.value
        const res = eval(this.item.condition)
        return res
      }
      return true
    }
  },
  watch: {
    conditionEval() {
      if (this.conditionEval && this.item.type === 'switchSet') {
        if (Array.isArray(this.value[this.item.value])) {
          this.$set(this.value, this.item.value, {})
        } else {
          this.$set(this.value, this.item.value, this.value[this.item.value] || {})
        }
      } else if (this.conditionEval && this.item.type === 'table') {
        if (Array.isArray(this.value[this.item.value])) {
          this.$set(this.value, this.item.value, this.value[this.item.value] || [])
        } else {
          this.$set(this.value, this.item.value, [])
        }
      }
    }
  },
  methods: {
    /**
     * 添加一行
     */
    addRow() {
      if (this.value[this.item.value]) {
        this.value[this.item.value].splice(this.value[this.item.value].length, 0, { label: '', value: '' })
      } else {
        this.$set(this.value, this.item.value, [
          { label: '', value: '' }
        ])
      }
    },
    deleteRow(row) {
      this.value[this.item.value].splice(this.value[this.item.value].indexOf(row), 1)
    }
  }
}
</script>

<style scoped>

</style>
