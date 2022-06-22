<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'jobTypeId'"
          prop="jobTypeId"
          :label="$t(conf.namespace + '.jobTypeId')"
          width="60"
        />
        <el-table-column
          v-if="item.value === 'javaExpression'"
          prop="javaExpression"
          :label="$t(conf.namespace + '.javaExpression')"
          min-width="200"
        />
        <el-table-column
          v-if="item.value === 'jobTypeName'"
          prop="jobTypeName"
          :label="$t(conf.namespace + '.jobTypeName')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'jobTypeKey'"
          prop="jobTypeKey"
          :label="$t(conf.namespace + '.jobTypeKey')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'jobComponentPath'"
          prop="jobComponentPath"
          :label="$t(conf.namespace + '.jobComponentPath')"
          min-width="180"
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
        name: 'BaseJobTypeColumns',
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
