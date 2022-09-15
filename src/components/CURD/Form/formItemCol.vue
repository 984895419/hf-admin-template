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
        <hf-tooltip
          :namespace="namespace"
          :prop="prop"
        >
          <template v-slot="{ placeholder}">
            <el-input
              v-model="value[prop]"
              v-bind="$attrs"
              :placeholder="placeholder"
            />
          </template>
        </hf-tooltip>
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
import FormItemMixin from './formItem.mixin'
export default {
  name: 'FormItemCol',
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
