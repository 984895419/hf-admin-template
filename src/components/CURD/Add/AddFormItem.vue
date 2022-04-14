<template>
  <el-form-item
    :label="item.label"
    :prop="item.value"
    v-bind="item.labelProps"
    :rules="item.rules"
  >
    <div v-if="item.addable === true">
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
        :maxlength="item.maxlength"
      />
      <!--文本-->
      <el-input
        v-else-if="item.type === 'text'"
        v-model="value[item.value]"
        clearable
        v-bind="item.props"
        :placeholder="item.placeholder || `请输入${item.label}`"
        :maxlength="item.maxlength"
      />
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
  name: 'AddFormItem',
  components: {
    'DynamicRefer': {
      props: {
        item: Object
      },
      render(createElement, context) {
        const it = this.item
        debugger
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
    }
  }
}
</script>

<style scoped>

</style>
