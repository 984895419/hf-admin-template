<template>
    <div v-if="showFields">
      <!-- 有拖拽选择的时候 -->
      <div v-for="item in showFields" :key="item.value">
        <default-table-column
          v-if="item.value === 'GoodsCode'"
          prop="GoodsCode"
          :width="item.width"
          :label="$t(conf.namespace + '.GoodsCode')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <default-table-column
          v-if="item.value === 'GoodsName'"
          prop="GoodsName"
          :width="item.width"
          :label="$t(conf.namespace + '.GoodsName')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <default-table-column
          v-if="item.value === 'Specifications'"
          align="right"
          prop="Specifications"
          :width="item.width"
          :label="$t(conf.namespace + '.Specifications')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <default-table-column
          v-if="item.value === 'GoodsUnit'"
          prop="GoodsUnit"
          :width="item.width"
          :label="$t(conf.namespace + '.GoodsUnit')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <default-table-column
          v-if="item.value === 'QuantityRequired'"
          align="center"
          prop="QuantityRequired"
          :width="item.width"
          :label="$t(conf.namespace + '.QuantityRequired')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <default-table-column
          v-if="item.value === 'UnitPrice'"
          align="center"
          prop="UnitPrice"
          :width="item.width"
          :label="$t(conf.namespace + '.UnitPrice')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <default-table-column
          v-if="item.value === 'money'"
          align="center"
          prop="money"
          :width="item.width"
          :label="$t(conf.namespace + '.money')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <default-table-column
          v-if="item.value === 'stock'"
          prop="stock"
          :width="item.width"
          :label="$t(conf.namespace + '.stock')"
          :namespace="conf.namespace"
          :copyable="true"
          min-width="130"
          :show-overflow-tooltip="true"
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
  import DefaultTableColumn from '@/components/CURD/Table/column/DefaultTableColumn'
  export default {
    name: 'hfBaseSonColumns',
    components: {
      EnableStateTableColumn,
      CreatorTableColumn,
      CreateTimeTableColumn,
      ModifierTableColumn,
      ModifyTimeTableColumn,
       DefaultTableColumn
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
  
    },
    mounted(){
        console.log(this.showFields,"showFields")
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
  