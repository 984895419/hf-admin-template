<template>
  <div>
    <api-slot
      v-if="bindIds"
      :get-url="templateUrl(conf.urlMethods.batchQueryUrl, {bindId: bindIds})"
      :query-change-trigger="true"
    >
      <template v-slot="{data}">
        <slot :data="data" />
      </template>
    </api-slot>
    <slot v-else :data="[]" />
  </div>
</template>

<script>
import ApiSlot from '@/components/CURD/Api/ApiSlot'
import * as conf from './api'
import CurdMixin from '@/components/CURD/curd.mixin'

/**
 * 根据主键查询信息
 */
export default {
    name: 'WxBindConfBindIdSlot',
    components: { ApiSlot },
    mixins: [CurdMixin],
    props: {
        bindIds: {
            type: [Array, String]
        }
    },
    data() {
        return {
            conf: conf
        }
    }
}
</script>

<style scoped>

</style>
