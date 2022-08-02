<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'bindId'"
          prop="bindId"
          :label="$t(conf.namespace + '.bindId')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'bindMobile'"
          prop="bindMobile"
          :label="$t(conf.namespace + '.bindMobile')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'bindCompany'"
          prop="bindCompany"
          :label="$t(conf.namespace + '.bindCompany')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'auditState'"
          prop="auditStateName"
          :label="$t(conf.namespace + '.auditState')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'bindNickName'"
          prop="bindNickName"
          :label="$t(conf.namespace + '.bindNickName')"
          :width="item.width"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'bindOpenId'"
          prop="bindOpenId"
          :label="$t(conf.namespace + '.bindOpenId')"
          :width="item.width"
          min-width="130"
        />
        <image-table-column
          v-if="item.value === 'bindHeadpic'"
          prop="bindHeadpic"
          :width="item.width||110"
          :label="$t(conf.namespace + '.bindHeadpic')"
          :namespace="conf.namespace"
        />
        <modifier-table-column :width="item.width" v-if="item.value === 'modifier'" />
        <modify-time-table-column :width="item.width" v-if="item.value === 'modifyTime'" />
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
          v-if="item.value === 'version'"
          prop="version"
          :label="$t(conf.namespace + '.version')"
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

    export default {
        name: 'WxBindConfColumns',
        components: {
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
