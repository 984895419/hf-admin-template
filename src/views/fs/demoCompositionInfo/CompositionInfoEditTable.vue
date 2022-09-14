<template>
  <edit-table
    :table-data="data"
    border
    :conf="conf"
    :row-data="rowData"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <section-table-column />

    <default-table-column
      :prop="'compositionName'"
      :namespace="conf.namespace"
      :show-overflow-tooltip="true"
      min-width="130"
    />

    <default-table-column
      :prop="'compositionRate'"
      :namespace="conf.namespace"
      :show-overflow-tooltip="true"
      min-width="130"
    />
  </edit-table>
</template>
<script>
  import * as conf from './api'
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        conf: conf,
        rowData: {
          compositionName: undefined,
          compositionRate: undefined,
          enableState: 1
        }
      }
    }
  }
</script>
