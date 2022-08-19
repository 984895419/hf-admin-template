<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <el-table-column v-if="item.value === 'orderNo'" prop="orderNo" :label="$t(conf.namespace + '.orderNo')"
        min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'ordertime'" prop="ordertime" :label="$t(conf.namespace + '.ordertime')"
        min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.ordertime }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'ordertotal'" prop="ordertotal" :label="$t(conf.namespace + '.ordertotal')"
        min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.ordertotal }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'consignee'" prop="consignee" :label="$t(conf.namespace + '.consignee')"
        min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.consignee }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'orderstatus'" prop="orderstatus"
        :label="$t(conf.namespace + '.orderstatus')" min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.orderstatus }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'paystatus'" prop="paystatus" :label="$t(conf.namespace + '.paystatus')"
        min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.paystatus }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'shipmentstatus'" prop="shipmentstatus"
        :label="$t(conf.namespace + '.shipmentstatus')" min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.shipmentstatus }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'paymethod'" prop="paymethod" :label="$t(conf.namespace + '.paymethod')"
        min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.paymethod }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'customerphone'" prop="customerphone" :show-overflow-tooltip='true'
        :label="$t(conf.namespace + '.customerphone')" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.customerphone }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'customeraddress'" prop="customeraddress"
        :label="$t(conf.namespace + '.customeraddress')" min-width="130" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <span>{{ scope.row.customeraddress }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="item.value === 'customermail'" prop="customermail" :show-overflow-tooltip='true'
        :label="$t(conf.namespace + '.customermail')" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.customermail }}</span>
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
  name: 'HfBaseRightRoleColumns',
  components: {
    EnableStateTableColumn,
    CreatorTableColumn, CreateTimeTableColumn,
    ModifierTableColumn, ModifyTimeTableColumn
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
  }
}
</script>

<style scoped lang="less">
</style>
