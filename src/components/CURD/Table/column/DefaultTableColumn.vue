<template>
  <div>
    <el-table-column :prop="prop" :label="$t(namespace + '.' + prop)" v-bind="$attrs" :align="align">
      <template slot-scope="scope">
        <slot>
          <span v-if="scope.row.editable">
            <el-input size="mini" v-model="scope.row[prop]"></el-input>
            <!-- <slot ></slot> -->
          </span>
          <copier-render v-else
            :copyable="copyable"
            :prop="prop"
            :row="scope.row"
            :max-words="maxWords"
          />
          <!-- <span v-else>{{ scope.row.GoodsCode }}</span> -->
        </slot>
       <slot name="one" />
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
    align: {
      type: String
    },
    prop: {
      type: String
    },
    maxWords: {
      type: Number,
      default: 27
    }
  }
}
</script>

<style scoped>
</style>
