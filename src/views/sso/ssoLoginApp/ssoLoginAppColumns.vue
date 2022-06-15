<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
        <default-table-column
          v-if="item.value === 'id'"
          prop="id"
          :label="$t(conf.namespace + '.id')"
          :namespace="conf.namespace"
          min-width="130"
        />
        <default-table-column
          v-if="item.value === 'appId'"
          prop="appId"
          :namespace="conf.namespace"
          width="100"
        />
<!--        <el-table-column-->
<!--          v-if="item.value === 'appId'"-->
<!--          prop="appId"-->
<!--          :label="$t(conf.namespace + '.appId')"-->
<!--          width="100"-->
<!--        />-->
        <default-table-column
          v-if="item.value === 'appName'"
          prop="appName"
          :label="$t(conf.namespace + '.appName')"
          :namespace="conf.namespace"
          width="150"
        />
        <tag-table-column
          v-if="item.value === 'noLoginType'"
          prop="noLoginTypeName"
          :label="$t(conf.namespace + '.noLoginType')"
          width="100"
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
        <default-table-column
          v-if="item.value === 'deleted'"
          prop="deleted"
          :label="$t(conf.namespace + '.deleted')"
          :namespace="conf.namespace"
          min-width="130"
        />
        <default-table-column
          v-if="item.value === 'sort'"
          prop="sort"
          sortable
          :label="$t(conf.namespace + '.sort')"
          :namespace="conf.namespace"
          min-width="70"
        />
        <default-table-column
          v-if="item.value === 'homeUri'"
          prop="homeUri"
          :label="$t(conf.namespace + '.homeUri')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
        />
        <default-table-column
          v-if="item.value === 'tokenUri'"
          prop="tokenUri"
          :copyable="true"
          :label="$t(conf.namespace + '.tokenUri')"
          :namespace="conf.namespace"
          min-width="130"
        />
        <image-table-column
          v-if="item.value === 'icon'"
          prop="iconPath"
          :label="$t(conf.namespace + '.icon')"
          :namespace="conf.namespace"
          width="110"/>
        <default-table-column
          v-if="item.value === 'protectUri'"
          :copyable="true"
          prop="protectUri"
          :namespace="conf.namespace"
          :label="$t(conf.namespace + '.protectUri')"
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
    import ImageTableColumn from "../../../components/CURD/Table/column/ImageTableColumn";
    import TagTableColumn from "../../../components/CURD/Table/column/base/TagTableColumn";
    import DefaultTableColumn from "../../../components/CURD/Table/column/DefaultTableColumn";

    export default {
        name: 'SsoLoginAppColumns',
        components: {
            DefaultTableColumn,
            TagTableColumn,
            ImageTableColumn, EnableStateTableColumn,
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
