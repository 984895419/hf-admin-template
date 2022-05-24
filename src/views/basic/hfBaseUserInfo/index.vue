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
    name: 'HfBaseUserInfoIndexVue',
    components: { CRUD },
    data() {
        return {
            conf: conf
        }
    },
    mounted(){
        console.log(this.conf.default,'this.conf')
    }
}
</script>

<style scoped>

</style>
