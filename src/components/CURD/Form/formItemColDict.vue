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
        <hf-dict
          :namespace="namespace"
          v-bind="$attrs"
          :value="value"
          :prop="prop"
          v-on="$listeners"
        />
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>/**
 * 数据字典的方式; 数据字典的url
 */
import FormItemMixin from './formItem.mixin'
import HfDict from '../Single/hfDict'
export default {
  name: 'FormItemColDict',
  components: { HfDict },
  mixins: [FormItemMixin],
  props: {
    span: {
          type: Number,
          default: undefined
        },
    value: {
          type: Object,
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
    }
  }
}
</script>
