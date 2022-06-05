<template>
  <el-table
    ref="mainTable"
    :size="$store.size"
    :data="tableData"
    border
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-table>
</template>

<script>
export default {
    name: 'HfTable',
    props: {
        tableData: Array
    }
}
</script>

<style scoped>

</style>
