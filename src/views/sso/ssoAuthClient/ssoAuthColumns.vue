<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'clientId'"
        prop="clientId"
        :width="item.width||130"
        :label="$t(conf.namespace + '.clientId')"
      />
      <el-table-column
        v-if="item.value === 'clientSecret'"
        prop="clientSecret"
        :width="item.width"
        :label="$t(conf.namespace + '.clientSecret')"
        min-width="180"
      />
      <el-table-column
        v-if="item.value === 'redirectUri'"
        prop="redirectUri"
        :width="item.width"
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
        :width="item.width"
        :label="$t(conf.namespace + '.clientMethodName')"
        width="160"
      />
      <tag-table-column
        v-if="item.value === 'authorizationGrantTypesNames'"
        prop="authorizationGrantTypesNames"
        :width="item.width"
        :label="$t(conf.namespace + '.authorizationGrantTypesNames')"
        width="180"
      />
      <el-table-column
        v-if="item.value === 'description'"
        prop="description"
        :width="item.width"
        :label="$t(conf.namespace + '.description')"
        min-width="100"
      />
      <creator-table-column :width="item.width" v-if="item.value === 'creatorUserName'" />
      <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
      <modifier-table-column :width="item.width" v-if="item.value === 'modifierUserName'" />
      <modify-time-table-column :width="item.width" v-if="item.value === 'modifyTime'" />
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
