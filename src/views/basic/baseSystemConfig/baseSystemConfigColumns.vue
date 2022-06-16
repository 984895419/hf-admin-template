<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'configId'"
          prop="configId"
          :label="$t(conf.namespace + '.configId')"
          min-width="80"
        />
        <el-table-column
          v-if="item.value === 'configKey'"
          prop="configKey"
          :label="$t(conf.namespace + '.configKey')"
          width="130"
        />
        <el-table-column
          v-if="item.value === 'configValue'"
          prop="configValue"
          :label="$t(conf.namespace + '.configValue')"
          width="130"
        />
        <el-table-column
          v-if="item.value === 'configDescription'"
          prop="configDescription"
          :label="$t(conf.namespace + '.configDescription')"
          min-width="130"
        />
        <creator-table-column v-if="item.value === 'creator'" />
        <create-time-table-column v-if="item.value === 'createTime'" />
        <modifier-table-column v-if="item.value === 'modifier'" />
        <modify-time-table-column v-if="item.value === 'modifyTime'" />
        <enable-state-table-column
          v-if="item.value === 'enableState'"
          :operate="true"
          :enable-url="urlMethods.enableUrl"
          :disable-url="urlMethods.disableUrl"
          v-on="$listeners"
        />
        <el-table-column
          v-if="item.value === 'deleted'"
          prop="deleted"
          :label="$t(conf.namespace + '.deleted')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'initData'"
          prop="initDataName"
          :label="$t(conf.namespace + '.initData')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'tenantId'"
          prop="tenantId"
          :label="$t(conf.namespace + '.tenantId')"
          min-width="130"
        />
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
        name: 'BaseSystemConfigColumns',
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
