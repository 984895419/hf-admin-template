<template>
  <el-table-column
    v-bind="$attrs"
    :prop="prop"
    :label="$t(namespace + '.' + prop)"
    v-on="$listeners"
  >
    <template slot-scope="scope">
      <div v-if="scope.row[prop]">
        <el-tag
          v-for="item in scope.row[prop].split(',')"
          :key="item"
          v-bind="$attrs"
          style="margin-bottom: 5px; margin-right: 5px"
        >
          {{ item }}
        </el-tag>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import CurdMixin from '@/components/CURD/curd.mixin'
export default {
    name: 'TagTableColumn',
    mixins: [CurdMixin],
    props: {
      namespace: {
        type: String
      },
      prop: {
        type: String
      }
    }
}
</script>

<style scoped>

</style>
