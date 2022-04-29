<template>
    <div>
        <multiple-refer
            v-if="conf.default"
            v-model="value"
            :base-url="conf.baseUrl"
            :url-methods="conf.urlMethods"
            :table-config="conf.default"
            :table-fields="conf.default.fields"
        />
    </div>
</template>

<script>
import MultipleRefer from '@/components/CURD/multipleRefer'
import * as conf from './api'

export default {
    name: 'GenerateTableInfoMultipleRefer',
    components: { MultipleRefer },
    props: {
        value: {
            type: Object,
            require: true
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
