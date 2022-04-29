<template>
  <el-select v-model="datasourceId" @change="changeHandler">
    <el-option v-for="item in data" :key="item.datasourceId" :value="item.datasourceId" :label="item.name" />
  </el-select>
</template>

<script>
import * as conf from './api'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'

export default {
  name: 'DatasourceSelectRefer',
  props: {
    value: Object
  },
  data() {
    return {
      datasourceId: undefined,
      data: [],
      config: conf
    }
  },
  created() {
    this.queryDatasource()
  },
  methods: {
    queryDatasource() {
      baseApiGetMethod(this.config.urlMethods.listUrl).then(resp => {
        if (isSuccessResult(resp)) {
          this.data = getData(resp)
        } else {
          this.$message.error(getMessage(resp))
        }
      })
    },
    changeHandler() {
      if (!this.datasourceId) {
        return
      }
      const obj = this.data.filter(t => {
        return t.datasourceId === this.datasourceId
      })[0]
      this.$emit('input', {
        datasourceId: obj.datasourceId,
        name: obj.name
      })
    }
  }
}
</script>

<style scoped>

</style>
