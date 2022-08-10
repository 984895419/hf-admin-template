<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'notifyId'"
        prop="notifyId"
        :label="$t(conf.namespace + '.notifyId')"
        :width="item.width"
        min-width="130"
      />
      <default-table-column
        v-if="item.value === 'notifyKey'"
        :namespace="conf.namespace"
        :copyable="true"
        prop="notifyKey"
        :label="$t(conf.namespace + '.notifyKey')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'wxId'"
        prop="wxIdName"
        :label="$t(conf.namespace + '.wxIdName')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'templateId'"
        prop="templateId"
        :label="$t(conf.namespace + '.templateId')"
        :width="item.width"
        min-width="130"
      />
      <default-table-column
        v-if="item.value === 'exampleData'"
        :namespace="conf.namespace"
        prop="exampleData"
        :label="$t(conf.namespace + '.exampleData')"
        :width="item.width"
        min-width="130"
      />
      <default-table-column
        v-if="item.value === 'templateContent'"
        :namespace="conf.namespace"
        prop="templateContent"
        :label="$t(conf.namespace + '.templateContent')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'templateTitle'"
        prop="templateTitle"
        :label="$t(conf.namespace + '.templateTitle')"
        :width="item.width"
        min-width="130"
      />
      <default-table-column
        v-if="item.value === 'mapping'"
        :namespace="conf.namespace"
        prop="mapping"
        :label="$t(conf.namespace + '.mapping')"
        :width="item.width"
        min-width="130"
      />
      <creator-table-column v-if="item.value === 'creator'" :width="item.width" />
      <create-time-table-column v-if="item.value === 'createTime'" :width="item.width" />
      <modifier-table-column v-if="item.value === 'modifier'" :width="item.width" />
      <modify-time-table-column v-if="item.value === 'modifyTime'" :width="item.width" />
      <enable-state-table-column
        v-if="item.value === 'enableState'"
        :operate="true"
        :width="item.width"
        :enable-url="urlMethods.enableUrl"
        :disable-url="urlMethods.disableUrl"
        v-on="$listeners"
      />
      <el-table-column
        v-if="item.value === 'deleted'"
        prop="deleted"
        :label="$t(conf.namespace + '.deleted')"
        :width="item.width"
        min-width="130"
      />

      <el-table-column
        v-if="item.value === 'templateDetailTypeName'"
        prop="templateDetailTypeName"
        :label="$t(conf.namespace + '.templateDetailTypeName')"
        :width="item.width"
        min-width="130"
      />

      <el-table-column
        v-if="item.value === 'notifyTypeName'"
        prop="notifyTypeName"
        :label="$t(conf.namespace + '.notifyTypeName')"
        :width="item.width"
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
    import DefaultTableColumn from '../../../components/CURD/Table/column/DefaultTableColumn'

    export default {
        name: 'WxNotifyTemplateMappingColumns',
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
