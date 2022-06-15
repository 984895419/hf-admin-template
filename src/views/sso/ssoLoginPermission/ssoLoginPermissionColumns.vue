<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'permissionId'"
          prop="permissionId"
          :label="$t(conf.namespace + '.permissionId')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'permissionName'"
          prop="permissionName"
          :label="$t(conf.namespace + '.permissionName')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'appCnt'"
          prop="appCnt"
          :label="$t(conf.namespace + '.appCnt')"
          min-width="140"
        />
        <el-table-column
          v-if="item.value === 'permissionType'"
          prop="permissionTypeName"
          :label="$t(conf.namespace + '.permissionType')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'permissionCnt'"
          prop="permissionCnt"
          :label="$t(conf.namespace + '.userType')"
          min-width="120"
        >
          <template slot-scope="scopeRow">
            <span v-if="scopeRow.row.permissionType === 'ONLY_THE_TYPE'">
              {{scopeRow.row.permissionCnt}}{{$t(conf.getI18nName('userTypeMessage'))}}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
      <el-table-column
        v-if="item.value === 'permissionCnt'"
        prop="permissionCnt"
        :label="$t(conf.namespace + '.userInfo')"
        min-width="100"
      >
        <template slot-scope="scopeRow">
            <span v-if="scopeRow.row.permissionType === 'ONLY_USER'">
              {{scopeRow.row.permissionCnt}}{{$t(conf.getI18nName('userMessage'))}}
            </span>
          <span v-else>
              -
            </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.value === 'permissionCnt'"
        prop="permissionCnt"
        :label="$t(conf.namespace + '.companyInfo')"
        min-width="100"
      >
        <template slot-scope="scopeRow">
            <span v-if="scopeRow.row.permissionType === 'ONLY_COMPANY'">
              {{scopeRow.row.permissionCnt}}{{$t(conf.getI18nName('companyMessage'))}}
            </span>
          <span v-else>
              -
            </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.value === 'permissionCnt'"
        prop="permissionCnt"
        :label="$t(conf.namespace + '.deptInfo')"
        min-width="100"
      >
        <template slot-scope="scopeRow">
            <span v-if="scopeRow.row.permissionType === 'ONLY_DEPT'">
              {{scopeRow.row.permissionCnt}}{{$t(conf.getI18nName('deptMessage'))}}
            </span>
          <span v-else>
              -
            </span>
        </template>
      </el-table-column>
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
        name: 'SsoLoginPermissionColumns',
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
