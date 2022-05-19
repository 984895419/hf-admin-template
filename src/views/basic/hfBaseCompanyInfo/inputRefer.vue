<template>
    <div>
        <refer-input
            v-model="value"
            :value-refer-id="valueReferId"
            :value-refer-name="valueReferName"
            :value-expend-refers="valueExpendRefers"
            :base-url="conf.baseUrl"
            :url-methods="conf.urlMethods"
            :table-config="conf.default"
            :show-btn-area="true"
            v-bind="$attrs"
        />
    </div>
</template>

<script>
import ReferInput from '@/components/CURD/referInput'
import * as conf from './api'

export default {
    name: 'HfBaseCompanyInfoInputRefer',
    components: { ReferInput },
    props: {
        value: {
            type: Object,
            require: true
        },
        /**
         * 参照对应的字段ID
         */
        valueReferId: {
            type: [String, Number],
            require: true
        },
        /**
         * 参照对应的字段名
         */
        valueReferName: {
            type: [String, Number],
            require: true
        },
        /**
         * 扩展的参照集合
         */
        valueExpendRefers: {
            type: Object
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
