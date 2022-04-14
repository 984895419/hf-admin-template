<template>
  <el-row :gutter="10">
    <el-col
      v-for="item in addFields"
      :key="item.value"
      :span="item.span || defaultSpan"
      :class=" (item.span || defaultSpan) !== 24 ? '' : 'col-24-bottom'"
    >
      <slot :name="item.value" :data="item">
        <add-form-item v-model="value" :item="item" />
      </slot>
    </el-col>
  </el-row>
</template>

<script>
import AddFormItem from '@/components/CURD/Add/AddFormItem'

export default {
  name: 'AddFormItems',
  components: { AddFormItem },
  /**
   * 属性名
   */
  props: {
    /**
     * 新增的表单选项
     */
    addFields: Array,
    /**
     * 值对象
     */
    value: Object,
    /**
     * 默认的span
     */
    defaultSpan: {
      type: Number,
      default: 6
    }
  }
}
</script>

<style scoped>

</style>
