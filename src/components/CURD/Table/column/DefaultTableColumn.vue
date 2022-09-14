<template>
  <div>
    <el-table-column :prop="prop" :label="$t(namespace + '.' + prop)" v-bind="$attrs" :align="align">
      <template slot-scope="scope">
        <slot>
          <slot v-if="scope.row.editable" name="othertype">
            <el-form-item :error="errorMessage ? errorMessage('compositions[' +scope.$index+'].' + prop) : undefined" v-bind="$attrs" :prop="prop">
              <el-input v-model="scope.row[prop]" size="mini" />
            </el-form-item>
          </slot>
          <copier-render v-else :copyable="copyable" :prop="prop" :row="scope.row" :max-words="maxWords" />
        </slot>
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
    },
    formRules: {
    },
    errorMessage: {
      type: Function
    }
  }
}
</script>

<style scoped lang="less">
 /deep/ .el-form-item__content{
  margin-left: 0!important;
}
</style>
