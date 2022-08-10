<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column
        v-if="item.value === 'menuId'"
        prop="menuId"
        :label="$t(conf.namespace + '.menuId')"
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
        v-if="item.value === 'menuName'"
        prop="menuName"
        :label="$t(conf.namespace + '.menuName')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'menuContentType'"
        prop="menuContentType"
        :label="$t(conf.namespace + '.menuContentType')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'menuContent'"
        prop="menuContent"
        :label="$t(conf.namespace + '.menuContent')"
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
        v-if="item.value === 'parentId'"
        prop="parentIdName"
        :label="$t(conf.namespace + '.parentIdName')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'levelInd'"
        prop="levelInd"
        :label="$t(conf.namespace + '.levelInd')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'levelStr'"
        prop="levelStr"
        :label="$t(conf.namespace + '.levelStr')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'sort'"
        prop="sort"
        :label="$t(conf.namespace + '.sort')"
        :width="item.width"
        min-width="130"
      />
      <el-table-column
        v-if="item.value === 'publishState'"
        prop="publishState"
        :label="$t(conf.namespace + '.publishState')"
        :width="item.width"
        min-width="130"
      >
        <template slot-scope="scopeRow">
          <span v-if="scopeRow.row.publishState === 0">
            待发布
          </span>
          <span v-else>
            已发布
          </span>
        </template>
      </el-table-column>
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
        name: 'WxMenuConfColumns',
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
