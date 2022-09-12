<template>
  <!-- 有拖拽选择的时候 -->
  <div v-if="showFields && showFields.length > 0">
    <group-table-column v-if="showFields" :show-fields="showFields" :group-fields="conf.groupFields" :namespace="conf.namespace">
      <template v-slot="{ fields}">
        <div v-for="item in fields" :key="item.value">
          <default-table-column
            v-if="item.value === 'resourceId'"
            :namespace="conf.namespace"
            prop="resourceId"
            :label="$t(conf.namespace + '.resourceId')"
            :width="item.width"
            min-width="130"
          />
          <default-table-column
            v-if="item.value === 'resourceKey'"
            :namespace="conf.namespace"
            prop="resourceKey"
            :label="$t(conf.namespace + '.resourceKey')"
            :width="item.width"
            min-width="130"
          />
          <default-table-column
            v-if="item.value === 'resourceName'"
            :namespace="conf.namespace"
            prop="resourceName"
            :label="$t(conf.namespace + '.resourceName')"
            :width="item.width"
            min-width="130"
          />
          <default-table-column
            v-if="item.value === 'micro'"
            :namespace="conf.namespace"
            prop="micro"
            :label="$t(conf.namespace + '.micro')"
            :width="item.width"
            min-width="130"
          />
          <default-table-column
            v-if="item.value === 'providerUrl'"
            :namespace="conf.namespace"
            prop="providerUrl"
            :label="$t(conf.namespace + '.providerUrl')"
            :width="item.width"
            min-width="130"
          />
          <default-table-column
            v-if="item.value === 'feignUrl'"
            :namespace="conf.namespace"
            prop="feignUrl"
            :label="$t(conf.namespace + '.feignUrl')"
            :width="item.width"
            min-width="130"
          />
          <creator-table-column v-if="item.value === 'creatorUserName'" :width="item.width" />
          <date-time-format-table-column
            v-if="item.value === 'createTime'"
            format-str="{y}-{m}-{d} {h}:{i}"
            prop="createTime"
            :label="$t(conf.namespace + '.createTime')"
            :width="item.width"
            min-width="130"
          />
          <modifier-table-column v-if="item.value === 'modifierUserName'" :width="item.width" />
          <date-time-format-table-column
            v-if="item.value === 'modifyTime'"
            format-str="{y}-{m}-{d} {h}:{i}"
            prop="modifyTime"
            :label="$t(conf.namespace + '.modifyTime')"
            :width="item.width"
            min-width="130"
          />
          <enable-state-table-column
            v-if="item.value === 'enableState'"
            :operate="true"
            :width="item.width"
            :enable-url="urlMethods.enableUrl"
            :disable-url="urlMethods.disableUrl"
            v-on="$listeners"
          />
          <default-table-column
            v-if="item.value === 'deleted'"
            :namespace="conf.namespace"
            prop="deleted"
            :label="$t(conf.namespace + '.deleted')"
            :width="item.width"
            min-width="130"
          />
          <default-table-column
            v-if="item.value === 'microIdName'"
            :namespace="conf.namespace"
            prop="microIdName"
            :label="$t(conf.namespace + '.microIdName')"
            :width="item.width"
            min-width="130"
          />
        </div>
      </template>
    </group-table-column>
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
    import DateTimeFormatTableColumn from '@/components/CURD/Table/column/base/DateTimeFormatTableColumn'
    import GroupTableColumn from '@/components/CURD/Table/column/GroupTableColumn.vue'

    export default {
        name: 'BaseResourceColumns',
        components: { DefaultTableColumn, EnableStateTableColumn, DateTimeFormatTableColumn,
            CreatorTableColumn, CreateTimeTableColumn,
            ModifierTableColumn, ModifyTimeTableColumn,
                GroupTableColumn },
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
