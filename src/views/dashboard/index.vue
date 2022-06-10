<template>
  <div class="app-container">
<!--    <CRUD v-if="tableConfig" :base-url="'/api/consumer'" :table-config="tableConfig" />-->
  </div>
</template>

<script>

import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { fetchMyColumnInfos } from '@/api/columnInfo'
// import CRUD from '@/components/CURD/index.vue'

export default {
  // components: { CRUD },
  data() {
    return {
      currentPage4: 4,
      total: 0,
      currentPageSize: 100,
      tableConfig: null,
      searchFields: []
    }
  },
  created() {
    // this.loadFields()
  },
  methods: {
    loadFields() {
      fetchMyColumnInfos().then(resp => {
        if (isSuccessResult(resp)) {
          this.tableConfig = resp.data
        } else {
          this.$message.error(getMessage(resp))
          return
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
