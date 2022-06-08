<template>
    <div>
        <multiple-refer
            v-if="conf.default"
            v-model="deepValue"
            :base-url="conf.baseUrl"
            :url-methods="conf.urlMethods"
            :table-config="conf.default"
            :table-fields="conf.default.fields"
            v-on="$listeners"
        />
    </div>
</template>

<script>
import MultipleRefer from '@/components/CURD/multipleRefer'
import * as conf from './api'
import {deepClone} from "../../../utils";

export default {
    name: 'HfBaseUserInfoMultipleRefer',
    components: { MultipleRefer },
    props: {
        value: {
            type: Array,
            require: true
        }
    },
    watch: {
        value() {
            this.deepValue = deepClone(this.value)
        }
    },
    data() {
        return {
            conf: conf,
            deepValue: deepClone(this.value || [])
        }
    }
}
</script>

<style scoped>

</style>
