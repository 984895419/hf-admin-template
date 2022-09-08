<template>
  <div v-if="showFields">
    <!-- 有拖拽选择的时候 -->
    <div v-for="item in showFields" :key="item.value">
      <adaptor-table-column
        v-bind="dynamicFields(item)"
      />
    </div>
  </div>
</template>

<script>
/**
 * 动态版本
 */
import * as conf from './api'
import AdaptorTableColumn from '@/components/CURD/Table/AdaptorTableColumn.vue'
export default {
  name: 'HfBaseRightRoleColumnsDynamic',
  components: {
    AdaptorTableColumn
  },
  props: {
    showFields: Array
  },
  data() {
    return {
      conf: conf
    }
  },
  computed: {
    dynamicFields() {
      return (item) => {
        return {
          ...item,
          'tp-name': item.value === 'paystatus' ? 'tag' : 'default',
          prop: item.value,
          width: item.width,
          namespace: this.conf.namespace,
          copyable: 'true',
          'min-width': '130',
          'show-overflow-tooltip': 'true'
        }
      }
    }
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
