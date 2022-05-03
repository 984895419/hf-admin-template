<template>
  <div>
    <slot :data="data" />
  </div>
</template>

<script>
import * as conf from './api'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import CurdMixin from '@/components/CURD/curd.mixin'

export default {
  name: 'RunTableGetter',
  mixins: [CurdMixin],
  props: {
    value: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.loadTables()
  },
  methods: {
    loadTables() {
      if (this.value) {
        baseApiGetMethod(this.templateUrl(conf.urlMethods.queryUrl, this.value)).then(resp => {
          if (isSuccessResult(resp)) {
            this.data = getData(resp)
          } else {
            this.$message.error(getMessage(resp))
          }
        })
      } else {
        this.data = {}
      }
    }
  }
}
</script>

<style scoped>

</style>
