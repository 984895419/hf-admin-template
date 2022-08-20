<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'reqId'"
        prop="reqId"
        :label="$t(conf.namespace + '.reqId')"
        :width="item.width"
      />
      <el-table-column
        v-if="item.value === 'requestUrl'"
        prop="requestUrl"
        :label="$t(conf.namespace + '.requestUrl')"
        :width="item.width"
        min-width="180"
      />
      <el-table-column
        v-if="item.value === 'requestMethod'"
        prop="requestMethod"
        :label="$t(conf.namespace + '.requestMethod')"
        :width="item.width"
        min-width="80"
      />
      <el-table-column
        v-if="item.value === 'requestIp'"
        prop="requestIp"
        :label="$t(conf.namespace + '.requestIp')"
        :width="item.width"
        min-width="130"
      />
      <default-table-column
        v-if="item.value === 'responseHeaders'"
        min-width="200"
        :copyable="true"
        :width="item.width"
        prop="responseHeaders"
        :namespace="conf.namespace"
      />
      <default-table-column
        v-if="item.value === 'requestHeaders'"
        min-width="200"
        :copyable="true"
        prop="requestHeaders"
        :width="item.width"
        :namespace="conf.namespace"
      />
      <default-table-column
        v-if="item.value === 'requestParams'"
        min-width="200"
        :copyable="true"
        prop="requestParams"
        :width="item.width"
        :namespace="conf.namespace"
      />
      <default-table-column
        v-if="item.value === 'requestBody'"
        min-width="200"
        :copyable="true"
        :width="item.width"
        prop="requestBody"
        :namespace="conf.namespace"
      />
      <default-table-column
        v-if="item.value === 'responseBody'"
        min-width="200"
        :width="item.width"
        :copyable="true"
        prop="responseBody"
        :namespace="conf.namespace"
      />
      <el-table-column
        v-if="item.value === 'responseStatus'"
        prop="responseStatus"
        :width="item.width"
        :label="$t(conf.namespace + '.responseStatus')"
        min-width="130"
      />
      <creator-table-column v-if="item.value === 'creatorUserName'" :width="item.width" />
      <create-time-table-column v-if="item.value === 'createTime'" :width="item.width" />
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
    import DefaultTableColumn from '@/components/CURD/Table/column/DefaultTableColumn'

    export default {
        name: 'BaseLogColumns',
        components: {
            DefaultTableColumn, EnableStateTableColumn,
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
