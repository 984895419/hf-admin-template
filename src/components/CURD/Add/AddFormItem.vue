<template>
  <el-form-item
    :label="item.label"
    :prop="item.value"
    v-bind="item.labelProps"
    :rules="defaultRules"
  >
    <form-item-render :item="item" :value="value" :operate="operate" />
  </el-form-item>
</template>

<script>
import FormItemRender from '@/components/CURD/Add/FormItemRender'

export default {
  name: 'AddFormItem',
  components: { FormItemRender },
  props: {
    /**
     * 查询字段定义
     */
    item: Object,
    value: Object,
    /**
     * 操作类型，更新
     */
    operate: {
      type: String,
      default: 'update'
    }
  },
  computed: {
    /**
     * 表单是否必要的？
     */
    defaultRules() {
      if (this.operate === 'update') {
        // 是更新的操作，执行更新信息
        const flag = (this.item.createConfig && this.item.createConfig.addable === true) ||
          (this.item.updateConfig && this.item.updateConfig.updatable === true)
        if (this.item.rules) {
          return this.item.rules
        }
        const required = this.item.required && flag
        const item = this.item
        return required ? [
          {
            required: true,
            message: `${item.label}字段必填`,
            trigger: 'change'
          }
        ] : []
      } else {
        // 是更新的操作，执行更新信息
        const flag = (this.item.updateConfig && this.item.updateConfig.updatable === true)
        if (this.item.rules) {
          return this.item.rules
        }
        const required = this.item.required && flag
        const item = this.item
        return required ? [
          {
            required: true,
            message: `${item.label}字段必填`,
            trigger: 'change'
          }
        ] : []
      }
    }
  }
}
</script>

<style scoped>

</style>
