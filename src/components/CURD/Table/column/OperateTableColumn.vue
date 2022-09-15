<template>
  <el-table-column
    :fixed="($attrs && $attrs.fixed) || 'right'"
    v-bind="$attrs"
    :label="($attrs && $attrs.label) || $t('common.operate')"
    :width="($attrs && $attrs.width) ||150"
    v-on="$listeners"
  >
    <template slot-scope="scopeRow">
      <slot :row="scopeRow.row" :$index="scopeRow.$index" />
    </template>
  </el-table-column>
</template>
<script>
  export default {

  }
</script>
