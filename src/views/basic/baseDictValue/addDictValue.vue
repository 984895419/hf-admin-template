<template>
  <div>
    <add-form
      :value="value"
      :add-fields="addFields"
      :url="addUrl"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import * as conf from './api'
import AddForm from '@/components/CURD/Add/AddForm'

export default {
  name: 'AddDictValue',
  components: { AddForm },
  props: {
    value: Object
  },
  data() {
    return {
      tableConfig: conf.default,
      addUrl: conf.baseUrl + '/save'
    }
  },
  computed: {
    /**
     * 可新增字段筛选
     * @returns {T[]|*[]}
     */
    addFields() {
      if (this.tableConfig &&
        this.tableConfig.fields &&
        this.tableConfig.fields.length > 0) {
        return this.tableConfig.fields.filter(s => {
          // 设置默认所有的字段都可以填写的，除非配置了addShowable为false
          return s.createConfig && s.createConfig.addShowable === true
        })
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>
