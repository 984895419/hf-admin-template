<template>
  <div>
    <slot :fields="fields" />
  </div>
</template>

<script>
import * as conf from './api'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'

export default {
  name: 'RunColumnGetter',
  props: {
    tableId: {
      type: [Object, Number],
      require: true
    },
    value: [Object, Array]
  },
  data() {
    return {
      fields: []
    }
  },
  watch: {
    tableId() {
      this.loadTables()
    }
  },
  created() {
    this.loadTables()
  },
  methods: {
    loadTables() {
      if (this.tableId) {
        baseApiGetMethod(conf.urlMethods.listUrl, { tableId: this.tableId }).then(resp => {
          if (isSuccessResult(resp)) {
            this.fields = getData(resp)
            this.$emit('input', this.fields)
          } else {
            this.$message.error(getMessage(resp))
          }
        })
      } else {
        this.fields = []
      }
    }
  }

}
</script>

<style scoped>

</style>
