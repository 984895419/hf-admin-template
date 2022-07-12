<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'id'"
        prop="id"
        :label="$t(conf.namespace + '.id')"
        width="60"
      />
      <el-table-column
        v-if="item.value === 'appId'"
        prop="appName"
        :label="$t(conf.namespace + '.appId')"
        min-width="130"
      />
      <default-table-column
        min-width="200"
        :copyable="true"
        v-if="item.value === 'requestHeaders'"
        prop="requestHeaders"
        :max-words="50"
        :namespace="conf.namespace"/>
      <el-table-column
        v-if="item.value === 'loginIp'"
        prop="loginIp"
        :label="$t(conf.namespace + '.loginIp')"
        min-width="130"
      />
      <creator-table-column :width="item.width" v-if="item.value === 'creatorUserName'" />
      <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
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
    import DefaultTableColumn from "../../../components/CURD/Table/column/DefaultTableColumn";

    export default {
        name: 'SsoLoginAppLogColumns',
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
