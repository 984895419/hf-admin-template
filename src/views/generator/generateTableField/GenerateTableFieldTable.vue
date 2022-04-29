<template>
  <simple-table
    :table-fields="conf.default.fields"
    :table-data="tableData"
    :table-item-option="{showSelected: true}"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import SimpleTable from '@/components/CURD/Table/SimpleTable'
import * as conf from './api'

export default {
  name: 'GenerateTableFieldTable',
  components: { SimpleTable },
  props: {
    tableData: Array
  },
  data() {
    return {
      conf: conf
    }
  }
}
</script>

<style scoped>

</style>
