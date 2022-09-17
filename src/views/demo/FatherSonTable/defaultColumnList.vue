<template>
    <div v-if="Rowlist">
        <default-table-column :prop="key" :namespace="conf.namespace" :show-overflow-tooltip="true" min-width="130"
            v-for="(item,key,index) in Rowlist[0]" :key=index />
    </div>
</template>
<script>
import * as conf from './api'
export default {
    
    name: "defaultColumnList",
    data() {
        return {
            conf: conf,
        }
    },
    props: {
        Rowlist: {
            type:Array
        }
    }
}
</script>
<style lang="less" scoped>

</style>