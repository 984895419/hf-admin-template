<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'id'"
          prop="id"
          :label="$t(conf.namespace + '.id')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'appId'"
          prop="appId"
          :label="$t(conf.namespace + '.appId')"
          width="100"
        />
        <el-table-column
          v-if="item.value === 'appName'"
          prop="appName"
          :label="$t(conf.namespace + '.appName')"
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
        <el-table-column
          v-if="item.value === 'deleted'"
          prop="deleted"
          :label="$t(conf.namespace + '.deleted')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'sort'"
          prop="sort"
          sortable
          :label="$t(conf.namespace + '.sort')"
          min-width="70"
        />
        <el-table-column
          v-if="item.value === 'homeUri'"
          prop="homeUri"
          :label="$t(conf.namespace + '.homeUri')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'tokenUri'"
          prop="tokenUri"
          :label="$t(conf.namespace + '.tokenUri')"
          min-width="130"
        />
        <image-table-column
          v-if="item.value === 'icon'"
          prop="iconPath"
          :label="$t(conf.namespace + '.icon')"
          width="110"/>
        <el-table-column
          v-if="item.value === 'protectUri'"
          prop="protectUri"
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

    export default {
        name: 'SsoLoginAppColumns',
        components: {
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
