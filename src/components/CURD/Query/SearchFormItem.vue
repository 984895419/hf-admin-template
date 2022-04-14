<template>
  <el-form-item
    :label="item.label"
    :prop="item.value"
    v-bind="item.labelProps"
  >
    <!-- 下拉 -->
    <el-select
      v-if="item.type === 'select'"
      v-model="item.val"
      clearable
      v-bind="item.props"
      :placeholder=" item.placeholder ||`请选择${item.label}`"
      @change="changeHandler"
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
      v-model="item.val"
      clearable
      :placeholder="item.placeholder || '选择日期'"
      v-bind="item.props || { type: 'date' }"
      @change="changeHandler"
    />
    <el-cascader
      v-else-if="item.type === 'cascader'"
      v-model="item.val"
      :options="item.options"
    />
    <!--数字 -->
    <el-input
      v-if="item.inputType === 'number'"
      v-model="item.val"
      clearable
      v-bind="item.props"
      :placeholder="item.placeholder || `请输入${ item.label}`"
      :maxlength="item.maxlength"
    />
    <!--文本-->
    <el-input
      v-if="item.type === 'text'"
      v-model="item.val"
      clearable
      v-bind="item.props"
      :placeholder="item.placeholder || `请输入${item.label}`"
      :maxlength="item.maxlength"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'SearchFormItem',
  props: {
    /**
     * 查询字段定义
     */
    item: Object,
    /**
     * 马上触发查询操作的标志，执行查询
     */
    immediately: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * 值发生改变的时候出发
     */
    changeHandler() {
      // 如果是马上触发，则
      if (this.item.immediately && this.immediately) {
        this.$emit('valChange')
      }
    }
  }
}
</script>

<style scoped>

</style>
