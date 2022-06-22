<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
              <el-table-column
          v-if="item.value === 'businessId'"
          prop="businessId"
          :label="$t(conf.namespace + '.businessId')"
          width="60"
        />
        <default-table-column
          v-if="item.value === 'businessKey'"
          prop="businessKey"
          :label="$t(conf.namespace + '.businessKey')"
          min-width="180"
          :namespace="conf.namespace"
          :copyable="true"
        />
        <el-table-column
          v-if="item.value === 'businessName'"
          prop="businessName"
          :label="$t(conf.namespace + '.businessName')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'businessDescription'"
          prop="businessDescription"
          :label="$t(conf.namespace + '.businessDescription')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'prefix'"
          prop="prefix"
          :label="$t(conf.namespace + '.prefix')"
          width="80"
        />
        <el-table-column
          v-if="item.value === 'suffix'"
          prop="suffix"
          :label="$t(conf.namespace + '.suffix')"
          width="80"
        />
        <el-table-column
          v-if="item.value === 'useDate'"
          prop="useDate"
          :label="$t(conf.namespace + '.useDate')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'dateFormat'"
          prop="dateFormat"
          :label="$t(conf.namespace + '.dateFormat')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqStart'"
          prop="seqStart"
          :label="$t(conf.namespace + '.seqStart')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqStep'"
          prop="seqStep"
          :label="$t(conf.namespace + '.seqStep')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqLength'"
          prop="seqLength"
          :label="$t(conf.namespace + '.seqLength')"
          min-width="130"
        />
        <el-table-column
          v-if="item.value === 'seqCurrent'"
          prop="seqCurrent"
          :label="$t(conf.namespace + '.seqCurrent')"
          min-width="130"
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
          v-if="item.value === 'tenantId'"
          prop="tenantId"
          :label="$t(conf.namespace + '.tenantId')"
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
        name: 'BaseBusinessCodeColumns',
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
