<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <default-table-column v-if="item.value === 'orderNo'" prop="orderNo" :width="item.width"
        :label="$t(conf.namespace + '.orderNo')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true' />
      <default-table-column v-if="item.value === 'ordertime'" prop="ordertime" :width="item.width"
        :label="$t(conf.namespace + '.ordertime')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true' />
      <default-table-column align="right" v-if="item.value === 'ordertotal'" prop="ordertotal" :width="item.width"
        :label="$t(conf.namespace + '.ordertotal')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>1211231233213{{ scope}}</span>
        </template>
      </default-table-column>
      <default-table-column v-if="item.value === 'consignee'" prop="consignee" :width="item.width"
        :label="$t(conf.namespace + '.consignee')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
      </default-table-column>
      <default-table-column align="center" v-if="item.value === 'orderstatus'" prop="orderstatus" :width="item.width"
        :label="$t(conf.namespace + '.orderstatus')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
      </default-table-column>
      <default-table-column align="center" v-if="item.value === 'paystatus'" prop="paystatus" :width="item.width"
        :label="$t(conf.namespace + '.paystatus')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
      </default-table-column>
      <default-table-column align="center" v-if="item.value === 'shipmentstatus'" prop="shipmentstatus"
        :width="item.width" :label="$t(conf.namespace + '.shipmentstatus')" :namespace="conf.namespace" :copyable="true"
        min-width="130" :show-overflow-tooltip='true'>
      </default-table-column>
      <default-table-column v-if="item.value === 'paymethod'" prop="paymethod" :width="item.width"
        :label="$t(conf.namespace + '.paymethod')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
      </default-table-column>
      <default-table-column v-if="item.value === 'customerphone'" prop="customerphone" :width="item.width"
        :label="$t(conf.namespace + '.customerphone')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
      </default-table-column>
      <default-table-column v-if="item.value === 'customeraddress'" prop="customeraddress" :width="item.width"
        :label="$t(conf.namespace + '.customeraddress')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
      </default-table-column>
      <default-table-column v-if="item.value === 'customermail'" prop="customermail" :width="item.width"
        :label="$t(conf.namespace + '.customermail')" :namespace="conf.namespace" :copyable="true" min-width="130"
        :show-overflow-tooltip='true'>
      </default-table-column>
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
import DefaultTableColumn from '@/components/CURD/Table/column/DefaultTableColumn'
export default {
  name: 'HfBaseRightRoleColumns',
  components: {
    EnableStateTableColumn,
    CreatorTableColumn, CreateTimeTableColumn,
    ModifierTableColumn, ModifyTimeTableColumn, DefaultTableColumn
  },
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
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.shenglue {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-table /deep/ .el-tooltip div {
  background: red;
}
</style>
