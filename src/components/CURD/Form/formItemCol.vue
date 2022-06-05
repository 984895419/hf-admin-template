<template>
  <el-col :span="span">
    <el-form-item
      :size="$store.size"
      :label="label"
      :prop="prop"
      :label-width="labelWidth"
      :required="required"
      :rules="rules"
      :error="error"
    >
      <slot>
        <el-input v-model="value[prop]" v-bind="$attrs" />
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  name: 'FormItemCol',
  props: {
    span: Number,
    value: Object,
    prop: String,
    rules: Object,
    error: String,
    label: String,
    required: Boolean,
    labelWidth: String
  }
}
</script>
