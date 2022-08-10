<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'wxId'"
        prop="wxId"
        :label="$t(conf.namespace + '.wxId')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'name'"
        prop="name"
        :label="$t(conf.namespace + '.name')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'appId'"
        prop="appId"
        :label="$t(conf.namespace + '.appId')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'secret'"
        prop="secret"
        :label="$t(conf.namespace + '.secret')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'token'"
        prop="token"
        :label="$t(conf.namespace + '.token')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'aesKey'"
        prop="aesKey"
        :label="$t(conf.namespace + '.aesKey')"
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
        name: 'WxServerConfColumns',
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
