<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'msgId'"
          prop="msgId"
          :label="$t(conf.namespace + '.msgId')"
          :width="item.width || 130"
          min-width="130"
        />
        <el-table-column
            v-if="item.value === 'notifyId'"
            prop="notifyIdName"
            :label="$t(conf.namespace + '.notifyIdName')"
            :width="item.width || 130"
            min-width="130"
        />
        <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'data'"
          prop="data"
          :label="$t(conf.namespace + '.data')"
          :width="item.width|| 130"
          min-width="130"
        />
        <default-table-column
          :namespace="conf.namespace"
          v-if="item.value === 'mapping'"
          prop="mapping"
          :label="$t(conf.namespace + '.mapping')"
          :width="item.width|| 130"
          min-width="130"
        />
        <create-time-table-column :width="item.width" v-if="item.value === 'createTime'" />
        <el-table-column
                v-if="item.value === 'wxId'"
                prop="wxIdName"
                :label="$t(conf.namespace + '.wxIdName')"
                :width="item.width|| 130"
                min-width="130"
        />
        <el-table-column
                v-if="item.value === 'bindId'"
                prop="bindIdName"
                :label="$t(conf.namespace + '.bindIdName')"
                :width="item.width|| 130"
                min-width="130"
        />
        <el-table-column
          v-if="item.value === 'sendState'"
          prop="sendState"
          :label="$t(conf.namespace + '.sendState')"
          :width="item.width|| 130"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'reason'"
          prop="reason"
          :label="$t(conf.namespace + '.reason')"
          :width="item.width|| 130"
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
    import DefaultTableColumn from "../../../components/CURD/Table/column/DefaultTableColumn";

    export default {
        name: 'WxNotifyMessageColumns',
        components: {
            DefaultTableColumn, EnableStateTableColumn,
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
