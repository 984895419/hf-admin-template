<template>
    <div>
        <api-slot
                v-if="notifyIds"
                :get-url="templateUrl(conf.urlMethods.batchQueryUrl, {notifyId: notifyIds})"
                :query-change-trigger="true">
            <template v-slot="{data}">
                <slot :data="data"/>
            </template>
        </api-slot>
        <slot v-else :data="[]"/>
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
    name: 'WxNotifyTemplateMappingNofifyIdSlot',
    components: { ApiSlot },
    props: {
        notifyIds: {
            type: [Array, String]
        }
    },
    mixins: [CurdMixin],
    data() {
        return {
            conf: conf
        }
    }
}
</script>

<style scoped>

</style>
