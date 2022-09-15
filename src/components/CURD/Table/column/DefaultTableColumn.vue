<template>
  <div>
    <el-table-column :prop="prop" :label="$t(namespace + '.' + prop)" v-bind="$attrs" :align="align">
      <template slot-scope="scope">
        <slot v-if="scope.row.editable !== undefined">
          
          <el-form-item :rules="$attrs.rules || required && [{required: true, message: $t(namespace + '.' + prop) + '不能为空', trigger: 'blur'}]||[]"
            :prop="pathName && pathName + '.' + scope.$index + '.' + prop" :required="required">
            <slot v-if="scope.row.editable" name="othertype">
              <el-input v-model="scope.row[prop]" size="mini" />
            </slot>
            <copier-render v-else :copyable="copyable" :prop="prop" :row="scope.row" :max-words="maxWords" />
          </el-form-item>
        </slot>
        <slot v-else>
          <copier-render :copyable="copyable" :prop="prop" :row="scope.row" :max-words="maxWords" />
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
    required: {
      type: Boolean,
      default: false
    },
    pathName: {
      type: String,
      default: undefined
    },
    rules: {
      type: Array,
      default: () => [],
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
</style>
