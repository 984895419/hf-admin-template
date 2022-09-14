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
        <hf-select
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
import HfSelect from '../Single/hfSelect'
export default {
  name: 'FormItemColSelect',
  components: { HfSelect },
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
  },
  data() {
      return {
          multipleSelect: (this.$attrs['multiple'] === undefined || this.$attrs['multiple'] === false)
              ? [] : (this.value[this.prop] ? this.value[this.prop].split(',') : [])
      }
  },
  computed: {
      selectOptionValue() {
          return (val) => {
              if (this.value[this.prop]) {
                  if (typeof this.value[this.prop] === 'number') {
                      return parseInt(val)
                  }
                  if (typeof this.value[this.prop] === 'string') {
                      return val + ''
                  }
              }
              return val
          }
      }
  },
  methods: {
    multipleChange() {
      this.value[this.prop] = this.multipleSelect.join(',')
    }
  }
}
</script>
