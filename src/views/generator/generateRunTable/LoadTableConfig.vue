<template>
  <div>
    <div v-if="tableNames">
      <div v-if="configMap">
        <slot :configMap="configMap" />
      </div>
    </div>
    <div v-else>
      未指定要查询的模块名
    </div>
  </div>
</template>

<script>
import * as conf from './api'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiGetMethod } from '@/components/CURD/baseApi'

export default {
  name: 'LoadTableConfig',
  props: {
    tableNames: {
      type: [Array, String],
      require: true
    }
  },
  data() {
    return {
      configMap: null,
      conf: conf
    }
  },
  created() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      if (this.tableNames) {
        const tabelNameStr = Array.isArray(this.tableNames) ? this.tableNames.join(',') : this.tableNames
        baseApiGetMethod(this.conf.urlMethods.configUrl, {
          tableNames: tabelNameStr
        }).then(resp => {
          if (isSuccessResult(resp)) {
            this.configMap = getData(resp)
          } else {
            this.$message.error(getMessage(resp))
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
