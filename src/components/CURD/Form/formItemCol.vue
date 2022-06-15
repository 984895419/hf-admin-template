<template>
  <el-col :span="span">
    <el-form-item
      :size="$store.size"
      :label="computeLabel"
      :prop="prop"
      :label-width="labelWidth"
      :required="required"
      :rules="rules"
      :error="error"
    >
      <slot>
        <!--        <el-input v-if="$attrs.type === 'number'"  v-model.number="value[prop]" v-bind="$attrs" :placeholer="computedPlaceholder"></el-input>-->
        <el-input v-model="value[prop]" v-bind="$attrs" :placeholer="computedPlaceholder" />
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  name: 'FormItemCol',
  props: {
    span: {
          type: Number,
          default: undefined
        },
    value: {
          type: Object,
          default: undefined
        },
    prop: {
          type: String,
          default: undefined
        },
    rules: {
          type: Object,
          default: undefined
        },
    error: {
          type: String,
          default: undefined
        },
    label: {
          type: String,
          default: undefined
        },
    required: {
          type: Boolean,
          default: undefined
        },
    labelWidth: {
          type: String,
          default: undefined
        },
    namespace: {
          type: String,
          default: undefined
        }
  },
    computed: {
      computeLabel() {
          return this.label ? this.label : (this.namespace ? this.$t(this.namespace + '.' + this.prop) : '')
      },
      computedPlaceholder() {
          return this.$attrs['placeholder'] ? this.$attrs['placeholder'] : this.$t('common.pleaseInput') + this.computeLabel
      }
    }
}
</script>
