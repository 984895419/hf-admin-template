<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'compositionId'"
          prop="compositionId"
          :label="$t(conf.namespace + '.compositionId')"
          :width="item.width"
          min-width="130"
        />
        <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'productIdName'"
          prop="productIdName"
          :label="$t(conf.namespace + '.productIdName')"
          :width="item.width"
          min-width="130"
        />
        <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'compositionName'"
          prop="compositionName"
          :label="$t(conf.namespace + '.compositionName')"
          :width="item.width"
          min-width="130"
        />
        <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'compositionRate'"
          prop="compositionRate"
          :label="$t(conf.namespace + '.compositionRate')"
          :width="item.width"
          min-width="130"
        />
        <creator-table-column :width="item.width" v-if="item.value === 'creatorUserName'" />
        <date-time-format-table-column
          format-str="{y}-{m}-{d} {h}:{i}"
          v-if="item.value === 'createTime'"
          prop="createTime"
          :label="$t(conf.namespace + '.createTime')"
          :width="item.width"
          min-width="130"/>
        <modifier-table-column :width="item.width" v-if="item.value === 'modifierUserName'" />
        <date-time-format-table-column
          format-str="{y}-{m}-{d} {h}:{i}"
          v-if="item.value === 'modifyTime'"
          prop="modifyTime"
          :label="$t(conf.namespace + '.modifyTime')"
          :width="item.width"
          min-width="130"/>
        <enable-state-table-column
          v-if="item.value === 'enableState'"
          :operate="true"
          :width="item.width"
          :enable-url="urlMethods.enableUrl"
          :disable-url="urlMethods.disableUrl"
          v-on="$listeners"
        />
        <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'deleted'"
          prop="deleted"
          :label="$t(conf.namespace + '.deleted')"
          :width="item.width"
          min-width="130"
        />
        <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'tenantId'"
          prop="tenantId"
          :label="$t(conf.namespace + '.tenantId')"
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
    import DefaultTableColumn from "@/components/CURD/Table/column/DefaultTableColumn"
    import DateTimeFormatTableColumn from '@/components/CURD/Table/column/base/DateTimeFormatTableColumn'

    export default {
        name: 'DemoCompositionInfoColumns',
        components: { DefaultTableColumn, EnableStateTableColumn, DateTimeFormatTableColumn,
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
