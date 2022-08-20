<template>
  <div>
    <el-table-column :prop="prop" :label="$t(namespace + '.' + prop)" v-bind="$attrs" :formatter="matter">
      <template slot-scope="scope">
        <copier-render :copyable="copyable" :prop="prop" :row="scope.row" :max-words="maxWords" />
      </template>
    </el-table-column>
  </div>
</template>

<script>
import CopierRender from './other/CopierRender'
export default {
  name: 'DefaultTableColumn',
  components: { CopierRender },
  props: {
    copyable: {
      type: Boolean,
      default: false
    },
    namespace: {
      type: String
    },
    prop: {
      type: String
    },
    maxWords: {
      type: Number,
      default: 27
    }
  },
  methods: {
    matter(row, column, cellValue) {
      debugger
      cellValue += ''
      if (!cellValue.includes('.')) cellValue += '.'
      return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ','
      }).replace(/\.$/, '')
    }
  }
}
</script>

<style scoped>
</style>
