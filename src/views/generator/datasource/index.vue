<template>
  <div class="app-container">
    <c-r-u-d
      :base-url="conf.baseUrl"
      :url-methods="conf.urlMethods"
      :table-config="conf.default"
    >
      <template v-slot:curd-add-before="{data, formValidate}">
        <el-button :loading="testLoading" type="primary" @click="doTestConnection(data, formValidate)">试一试</el-button>
      </template>
      <template v-slot:curd-update-before="{data, formValidate}">
        <el-button :loading="testLoading" type="primary" @click="doTestConnection(data, formValidate)">试一试</el-button>
      </template>
    </c-r-u-d>
  </div>
</template>

<script>
import CRUD from '@/components/CURD'
import * as conf from './api'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiPostMethod } from '@/components/CURD/baseApi'

export default {
  name: 'GenerateDatasourceIndexVue',
  components: { CRUD },
  data() {
    return {
      conf: conf,
      testUrl: conf.baseUrl + '/test',
      testLoading: false
    }
  },
  methods: {
    doTestConnection(data, formValidate) {
      formValidate(() => {
        this.testLoading = true
        baseApiPostMethod(this.testUrl, {
          url: data.url,
          username: data.username,
          password: data.password,
          driverName: data.driverName
        }).then(resp => {
          this.testLoading = false
          if (isSuccessResult(resp)) {
            const res = getData(resp)
            if (res === true) {
              this.$message.success('测试成功')
            } else {
              this.$message.error('失败')
            }
          } else {
            this.$message.error(getMessage(resp))
          }
        }).catch(e => {
          this.testLoading = false
          this.$message.error('失败')
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
