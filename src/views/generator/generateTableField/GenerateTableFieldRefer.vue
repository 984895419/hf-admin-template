<template>
  <div>
    <api-slot :get-url="conf.urlMethods.listUrl" :query-data="{ tableId: tableId}">
      <template v-slot="{data}">
        <generate-table-field-table :table-data="data" />
      </template>
    </api-slot>
  </div>
</template>

<script>
import ApiSlot from '@/components/CURD/Api/ApiSlot'
import * as conf from './api'
import GenerateTableFieldTable from '@/views/generator/generateTableField/GenerateTableFieldTable'

export default {
  name: 'GenerateTableFieldRefer',
  components: { GenerateTableFieldTable, ApiSlot },
  props: {
    tableId: Object
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
