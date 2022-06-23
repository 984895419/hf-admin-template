<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'reqId'"
          prop="reqId"
          :label="$t(conf.namespace + '.reqId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'requestUrl'"
          prop="requestUrl"
          :label="$t(conf.namespace + '.requestUrl')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'requestMethod'"
          prop="requestMethod"
          :label="$t(conf.namespace + '.requestMethod')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'requestIp'"
          prop="requestIp"
          :label="$t(conf.namespace + '.requestIp')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'requestParams'"
          prop="requestParams"
          :label="$t(conf.namespace + '.requestParams')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'requestBody'"
          prop="requestBody"
          :label="$t(conf.namespace + '.requestBody')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'responseBody'"
          prop="responseBody"
          :label="$t(conf.namespace + '.responseBody')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'responseStatus'"
          prop="responseStatus"
          :label="$t(conf.namespace + '.responseStatus')"
          min-width="130"
        />
        <creator-table-column v-if="item.value === 'creator'" />
        <create-time-table-column v-if="item.value === 'createTime'" />
    </div>
  </div>
</template>

<script>

    import * as conf from './api'
    import EnableStateTableColumn from '@/components/CURD/Table/column/EnableStateTableColumn'
    import CreatorTableColumn from '@/components/CURD/Table/column/CreatorTableColumn'
    import CreateTimeTableColumn from '@/components/CURD/Table/column/CreateTimeTableColumn'
    import ModifierTableColumn from '@/components/CURD/Table/column/ModifierTableColumn'
    import ModifyTimeTableColumn from '@/components/CURD/Table/column/ModifyTimeTableColumn'

    export default {
        name: 'BaseLogColumns',
        components: { EnableStateTableColumn,
            CreatorTableColumn, CreateTimeTableColumn,
            ModifierTableColumn, ModifyTimeTableColumn },
        props: {
            urlMethods: {
                type: Object
            },
            showFields: Array
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
