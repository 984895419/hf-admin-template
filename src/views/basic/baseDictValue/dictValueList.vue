<template>
  <div>
    <c-r-u-d
      ref="dcontion"
      :base-url="conf.baseUrl"
      :url-methods="conf.urlMethods"
      :table-config="conf.default"
    />
  </div>
</template>

<script>
import CRUD from '@/components/CURD'
import * as conf from '@/views/basic/baseDictValue/api'

export default {
  name: 'DictValueList',
  components: { CRUD },
  props: {
    condition: Object
  },
  data() {
    return {
      conf: conf
    }
  },
  watch: {
    condition: {
      handler: function() {
        if (this.conf.default.fields) {
          for (const ind in this.conf.default.fields) {
            const field = this.conf.default.fields[ind]
            if (this.condition[field.value] !== undefined) {
              this.$set(field, 'val', this.condition[field.value])
            }
          }
          this.$nextTick(() => {
            this.$refs.dcontion.triggerSearch()
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
