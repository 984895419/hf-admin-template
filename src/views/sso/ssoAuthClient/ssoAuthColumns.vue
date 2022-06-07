<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'clientId'"
        prop="clientId"
        :label="$t(conf.namespace + '.clientId')"
        width="130"
      />
      <el-table-column
        v-if="item.value === 'clientSecret'"
        prop="clientSecret"
        :label="$t(conf.namespace + '.clientSecret')"
        min-width="180"
      />
      <el-table-column
        v-if="item.value === 'redirectUri'"
        prop="redirectUri"
        :label="$t(conf.namespace + '.redirectUri')"
        min-width="180"
      />
      <enable-state-table-column
        v-if="item.value === 'enableState'"
        :operate="true"
        :enable-url="urlMethods.enableUrl"
        :disable-url="urlMethods.disableUrl"
        v-on="$listeners"
      />
      <tag-table-column
        v-if="item.value === 'clientMethodName'"
        prop="clientMethodName"
        :label="$t(conf.namespace + '.clientMethodName')"
        width="140"
      />
      <tag-table-column
        v-if="item.value === 'authorizationGrantTypesNames'"
        prop="authorizationGrantTypesNames"
        :label="$t(conf.namespace + '.authorizationGrantTypesNames')"
        width="180"
      />
      <el-table-column
        v-if="item.value === 'description'"
        prop="description"
        :label="$t(conf.namespace + '.description')"
        min-width="100"
      />
      <creator-table-column v-if="item.value === 'creator'" />
      <create-time-table-column v-if="item.value === 'createTime'" />
      <modifier-table-column v-if="item.value === 'modifier'" />
      <modify-time-table-column v-if="item.value === 'modifyTime'" />
    </div>
  </div>
</template>

<script>

    import * as conf from './api'
    import EnableStateTableColumn from '@/components/CURD/Table/column/EnableStateTableColumn'
    import TagTableColumn from '@/components/CURD/Table/column/base/TagTableColumn'
    import CreatorTableColumn from '@/components/CURD/Table/column/CreatorTableColumn'
    import CreateTimeTableColumn from '@/components/CURD/Table/column/CreateTimeTableColumn'
    import ModifierTableColumn from '@/components/CURD/Table/column/ModifierTableColumn'
    import ModifyTimeTableColumn from '@/components/CURD/Table/column/ModifyTimeTableColumn'

    export default {
        name: 'SsoAuthColumns',
        components: { EnableStateTableColumn, TagTableColumn,
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
