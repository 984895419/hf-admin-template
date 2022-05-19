<template>
    <div class="app-container">
        <c-r-u-d
            :base-url="conf.baseUrl"
            :url-methods="conf.urlMethods"
            :table-config="conf.default"
        />
    </div>
</template>

<script>
import CRUD from '@/components/CURD'
import * as conf from './api'

export default {
    name: 'HfBaseDepartInfoIndexVue',
    components: { CRUD },
    data() {
        return {
            conf: conf
        }
    }
}
</script>

<style scoped>

</style>
