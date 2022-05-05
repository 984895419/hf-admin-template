<template>
  <div class="app-container">
    <load-table-config :table-names="[conf.namespace]">
      <template v-slot="{ configMap }">
        <c-r-u-d
          :base-url="conf.baseUrl"
          :url-methods="conf.urlMethods"
          :table-config="configMap[conf.namespace]"
        />
      </template>
    </load-table-config>
  </div>
</template>

<script>
import CRUD from '@/components/CURD'
import * as conf from './api'
import LoadTableConfig from '@/views/generator/generateRunTable/LoadTableConfig'

export default {
  name: 'BaseSystemConfigIndexVue',
  components: { LoadTableConfig, CRUD },
  data() {
    return {
      conf: conf
    }
  }
}
</script>

<style scoped>

</style>
