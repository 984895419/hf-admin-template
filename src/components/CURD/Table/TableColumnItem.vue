<template>
  <el-table-column
    :prop="item.value"
    :label="item.label "
    v-bind="item.tableColumnOption"
    v-on="item.listeners"
  >
    <template slot-scope="scope">
      <slot :name="item.value" :data="scope.row">
        <span v-if="item.type === 'select'">
          {{ labelOption(scope.row[item.value]) }}
        </span>
        <span v-else>
          {{ scope.row[item.value] }}
        </span>
        <!-- TODO 添加过滤器，根据时间过滤等 -->
      </slot>
    </template>
  </el-table-column>
</template>

<script>
/**
 * 表单字段选项
 */
export default {
  name: 'TableColumnItem',
  props: {
    item: Object
  },
  computed: {
    labelOption() {
      return function(val) {
        if (this.item.children) {
          for (const ind in this.item.children) {
            const tag = this.item.children[ind]
            if (tag.value === val) {
              return tag.label
            }
          }
        }
        return val
      }
    }
  }
}
</script>

<style scoped>

</style>
